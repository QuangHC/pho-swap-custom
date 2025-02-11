    import {useState, useCallback} from 'react';
    import {ethers} from 'ethers';
    import {UNISWAP_ADDRESSES} from '../config/addresses.js';
    import {erc20Abi} from "viem";
    import {FACTORY_ABI, NFT_POSITION_MANAGER_ABI, SWAP_ROUTER_ABI, POOL_ABI, QUOTER_ABI} from "~/constants/PHO_ABI.js";

    export const useUniswap = () => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const getContracts = useCallback(async () => {
            if (!window.ethereum) {
                throw new Error("Please install MetaMask!");
            }

            console.log('UNISWAP_ADDRESSES:', UNISWAP_ADDRESSES); // Kiểm tra địa chỉ

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const factory = new ethers.Contract(
                FACTORY_ABI,
                signer
            );

            const router = new ethers.Contract(
                UNISWAP_ADDRESSES.SWAP_ROUTER,
                SWAP_ROUTER_ABI,
                signer
            );

            const positionManager = new ethers.Contract(
                UNISWAP_ADDRESSES.NFT_POSITION_MANAGER,
                NFT_POSITION_MANAGER_ABI,
                signer
            );

            const quoter = new ethers.Contract(
                UNISWAP_ADDRESSES.QUOTER,
                QUOTER_ABI,
                signer
            )

            return {factory, router, positionManager, provider, signer, quoter};
        }, []);

        const createPool = useCallback(async (tokenA, tokenB, fee = 3000) => {
            try {
                setLoading(true);
                setError(null);

                console.log('123')
                const {factory} = await getContracts();


                console.log('FACTORY', factory);
                const [token0, token1] = tokenA.toLowerCase() < tokenB.toLowerCase()
                    ? [tokenA, tokenB]
                    : [tokenB, tokenA];

                console.log(tokenA, tokenB, fee)
                // Sử dụng createPool từ Factory ABI
                const tx = await factory.createPool(token0, token1, fee);
                console.log('tx', tx)
                const receipt = await tx.wait();

                console.log('DEF')
                // Tìm event PoolCreated trong receipt
                const event = receipt.logs.find(log => {
                    try {
                        const parsed = factory.interface.parseLog(log);
                        return parsed.name === 'PoolCreated';
                    } catch (e) {
                        console.log(e)
                        return false;
                    }
                });

                if (!event) {
                    throw new Error('Pool creation event not found');
                }

                const parsedLog = factory.interface.parseLog(event);
                return parsedLog.args.pool;
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        }, []);

        const initializePool = useCallback(async (poolAddress, initialPrice = 1) => {
            const calculateSqrtPriceX96 = (price) => {
                const sqrtPrice = Math.sqrt(price); // Tính căn bậc 2 của `price`
                const sqrtPriceX96Temp = BigInt(Math.floor(sqrtPrice * 2 ** 96)); // Nhân với 2^96 và làm tròn
                return sqrtPriceX96Temp;
            };

            try {
                const {signer} = await getContracts();
                const pool = new ethers.Contract(poolAddress, POOL_ABI, signer);
                const sqrtPriceX96 = calculateSqrtPriceX96(initialPrice);
                const tx = await pool.initialize(sqrtPriceX96, {
                    gasLimit: 1000000
                });
                await tx.wait();
                return true;
            } catch (err) {
                console.error('Error initializing pool:', err);
                throw err;
            }
        }, []);

        const checkPoolStatus = async (token0Address, token1Address, fee = 3000) => {
            const {factory, signer} = await getContracts();

            // Get pool address
            console.log("Check token address:", token0Address, token1Address, fee);
            const poolAddress = await factory.getPool(token0Address, token1Address, fee);
            console.log('Pool address:', poolAddress);

            if (poolAddress === ethers.ZeroAddress) {
                return {exists: false, initialized: false};
            }

            // Check if pool is initialized
            const pool = new ethers.Contract(poolAddress, POOL_ABI, signer);
            try {
                const slot0 = await pool.slot0();
                console.log('Pool slot0:', slot0);
                console.log('Pool current state:', {
                    sqrtPriceX96: slot0.sqrtPriceX96.toString(),
                    tick: slot0.tick.toString(),
                });
                return {
                    exists: true,
                    initialized: true,
                    sqrtPriceX96: slot0.sqrtPriceX96,
                    tick: slot0.tick
                };
            } catch (error) {
                console.error('Error initializing pool:', error);
                return {exists: true, initialized: false};
            }
        };

        const calculateValidTicks = (fee, currentPrice = 1) => {
            const tickSpacing = fee === 500 ? 10 : fee === 3000 ? 60 : 200;

            // Nếu currentPrice là 0 hoặc không hợp lệ, sử dụng giá mặc định
            if (!currentPrice || currentPrice <= 0) {
                currentPrice = 1;
            }

            try {
                // Calculate base ticks for ±30% range
                const baseTickLower = Math.floor(Math.log(0.7) / Math.log(1.0001));
                const baseTickUpper = Math.ceil(Math.log(1.3) / Math.log(1.0001));

                // Round to valid tick spacing
                const tickLower = Math.floor(baseTickLower / tickSpacing) * tickSpacing;
                const tickUpper = Math.ceil(baseTickUpper / tickSpacing) * tickSpacing;

                // Ensure ticks are within bounds
                const finalTickLower = Math.max(tickLower, -887272);
                const finalTickUpper = Math.min(tickUpper, 887272);

                // Validate final ticks
                if (finalTickLower >= finalTickUpper) {
                    // Fallback to default range if calculation fails
                    return {
                        tickLower: -tickSpacing * 100,
                        tickUpper: tickSpacing * 100
                    };
                }

                console.log('Calculated ticks:', {
                    tickLower: finalTickLower,
                    tickUpper: finalTickUpper,
                    tickSpacing
                });

                return {
                    tickLower: finalTickLower,
                    tickUpper: finalTickUpper
                };
            } catch (error) {
                console.error('Error calculating ticks:', error);
                // Fallback to safe default values
                return {
                    tickLower: -tickSpacing * 100,
                    tickUpper: tickSpacing * 100
                };
            }
        };

        const approveToken = async (tokenAddress, amount, isForSwapRouter = false) => {
            try {
                const {signer} = await getContracts();

                // Determine the address to approve based on the context
                const spenderAddress = isForSwapRouter
                    ? UNISWAP_ADDRESSES.SWAP_ROUTER
                    : UNISWAP_ADDRESSES.NFT_POSITION_MANAGER;

                console.log(`Approving ${tokenAddress} for ${amount} to ${spenderAddress}`);

                // Create token contract instance
                const tokenContract = new ethers.Contract(
                    tokenAddress,
                    erc20Abi,
                    signer
                );

                const signerAddress = await signer.getAddress();
                console.log('Signer address:', signerAddress);

                // Check current allowance
                const currentAllowance = await tokenContract.allowance(
                    signerAddress,
                    spenderAddress
                );
                console.log('Current allowance:', currentAllowance.toString());

                // Only approve if needed
                if (currentAllowance < amount) {
                    console.log('Sending approve transaction...');
                    const tx = await tokenContract.approve(
                        spenderAddress,
                        ethers.MaxUint256 // Approve maximum amount
                    );
                    console.log('Approve transaction hash:', tx.hash);
                    await tx.wait();
                    console.log('Approve transaction confirmed');

                    // Verify new allowance
                    const newAllowance = await tokenContract.allowance(
                        signerAddress,
                        spenderAddress
                    );
                    console.log('New allowance:', newAllowance.toString());
                } else {
                    console.log('Sufficient allowance already exists');
                }

                return true;
            } catch (error) {
                console.error('Error in approveToken:', error);
                console.log('Token address:', tokenAddress);
                console.log('Amount:', amount.toString());
                throw error;
            }
        };

        const addLiquidity = useCallback(async ({token0, token1, fee = 3000, amount0Desired, amount1Desired}) => {
            try {
                setLoading(true);
                setError(null);

                const {positionManager, signer} = await getContracts();
                if (!positionManager) {
                    throw new Error('Position manager not initialized');
                }

                const address = await signer.getAddress();
                console.log('Signer address:', address);

                // 1. Sort tokens
                let [sortedToken0, sortedToken1, sortedAmount0, sortedAmount1] =
                    token0.address.toLowerCase() < token1.address.toLowerCase()
                        ? [token0, token1, amount0Desired, amount1Desired]
                        : [token1, token0, amount1Desired, amount0Desired];

                console.log('Sorted tokens:', {
                    token0: sortedToken0.address,
                    token1: sortedToken1.address,
                    amount0: sortedAmount0.toString(),
                    amount1: sortedAmount1.toString()
                });

                // 2. Check and create pool if needed
                const poolStatus = await checkPoolStatus(token0.address, token1.address, fee);
                console.log('Pool status:', poolStatus);
                if (!poolStatus.exists || !poolStatus.initialized) {
                    console.log('Trying create and initialized pool:', poolStatus);
                    const poolAddress = await createPool(token0.address, token1.address, fee);

                    if (sortedAmount0 === 0 || sortedAmount1 === 0) {
                        throw new Error('Invalid token amounts for initializing pool');
                    }

                    const initialPrice = Number(sortedAmount1) / Number(sortedAmount0);
                    console.log('Setting initial price for pool:', initialPrice);
                    // Initialize pool
                    await initializePool(poolAddress, initialPrice);
                }

                // 3. Calculate valid ticks
                const validTicks = calculateValidTicks(fee);
                console.log('Valid ticks:', validTicks);

                // 4. Approve tokens
                console.log('Approving tokens...');
                await Promise.all([
                    approveToken(sortedToken0.address, sortedAmount0),
                    approveToken(sortedToken1.address, sortedAmount1)
                ]);

                // 5. Checking balance
                console.log('Checking balance...');
                console.log(sortedToken0.address, sortedToken1.address);
                const token0Contract = new ethers.Contract(sortedToken0.address, erc20Abi, signer);
                const token1Contract = new ethers.Contract(sortedToken1.address, erc20Abi, signer);

                const balance0 = await token0Contract.balanceOf(address);
                const balance1 = await token1Contract.balanceOf(address);

                if (balance0 < sortedAmount0 || balance1 < sortedAmount1) {
                    throw new Error('Insufficient balance');
                }

                console.log('Checking allowance...');
                const allowance0 = await token0Contract.allowance(address, UNISWAP_ADDRESSES.NFT_POSITION_MANAGER);
                console.log('allowance0:', allowance0);
                const allowance1 = await token1Contract.allowance(address, UNISWAP_ADDRESSES.NFT_POSITION_MANAGER);

                if (allowance0 < sortedAmount0 || allowance1 < sortedAmount1) {
                    throw new Error('Insufficient allowance');
                }

                // 6. Prepare mint parameters
                const mintParams = {
                    token0: sortedToken0.address,
                    token1: sortedToken1.address,
                    fee: fee,
                    tickLower: validTicks.tickLower,
                    tickUpper: validTicks.tickUpper,
                    amount0Desired: sortedAmount0,
                    amount1Desired: sortedAmount1,
                    amount0Min: 0,
                    amount1Min: 0,
                    recipient: address,
                    deadline: Math.floor(Date.now() / 1000) + 1800
                };
                console.log('Mint parameters:', mintParams);

                // 6. Execute mint with suitable gas limit
                const tx = await positionManager.mint(mintParams, {
                    gasLimit: 5000000
                });

                console.log('Transaction sent:', tx.hash);
                const receipt = await tx.wait();
                console.log('Transaction receipt:', receipt);
                return receipt;
            } catch (error) {
                console.error('Mint error:', {
                    message: error.message,
                    code: error.code,
                    data: error.data,
                    transaction: error.transaction,
                    receipt: error.receipt
                });

                // Nếu có receipt, kiểm tra logs
                if (error.receipt && error.receipt.logs) {
                    console.log('Transaction logs:', error.receipt.logs);
                }

                throw error;
            } finally {
                setLoading(false);
            }
        }, []);

        const getAmountOut = useCallback(async ({tokenIn, tokenOut, amountIn, fee = 3000}) => {
            try {
                setLoading(true);
                setError(null);

                const { quoter } = await getContracts();

                const params = {
                    tokenIn,
                    tokenOut,
                    amountIn,
                    fee,
                    sqrtPriceLimitX96: 0
                };
                console.log('Params:', params);

                // Gọi với params object
                const quotedAmountOut = await quoter.quoteExactInputSingle(params);

                console.log('Quote result:', {
                    amountReceived: quotedAmountOut.amountReceived.toString(),
                    sqrtPriceX96After: quotedAmountOut.sqrtPriceX96After.toString(),
                    initializedTicksCrossed: quotedAmountOut.initializedTicksCrossed,
                    gasEstimate: quotedAmountOut.gasEstimate.toString()
                });

                // Trả về số lượng token nhận được
                return quotedAmountOut.amountReceived;
            } catch (err) {
                console.error('Quote error details:', {
                    message: err.message,
                    code: err.code,
                    data: err.data
                });
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        }, []);

        const swap = useCallback(async ({tokenIn, tokenOut, amountIn, slippage = 0, fee = 3000}) => {
            try {
                setLoading(true);
                setError(null);

                const {factory, router, signer} = await getContracts();
                // 1. Check and create pool if needed
                console.log(tokenIn, tokenOut, amountIn, slippage);
                const poolStatus = await checkPoolStatus(tokenIn, tokenOut);
                console.log('Pool status:', poolStatus);

                const poolAddress = await factory.getPool(tokenIn, tokenOut, fee);
                console.log('Pool Address:', poolAddress);

                if (!poolStatus.exists || !poolStatus.initialized) {
                    throw new Error('Insufficient pool status');
                }

                const address = await signer.getAddress();

                // 2. Approve token
                console.log('Approve Token...')
                await approveToken(tokenIn, amountIn, true);

                // 3. Calculate amountOutMinimum depend on Quoter Contract:
                console.log('Get amount...');
                const quotedAmountOut = await getAmountOut({tokenIn, tokenOut, amountIn, fee});
                console.log("Quoted amountOut:", quotedAmountOut.toString());
                const amountOutMinimum = (BigInt(quotedAmountOut) * (100n - BigInt(Math.floor(slippage * 100)))) / 100n;
                console.log('AmountOutMinimum:', amountOutMinimum);

                // 4. Params
                const params = {
                    tokenIn,
                    tokenOut,
                    fee: 3000,
                    recipient: address,
                    deadline: Math.floor(Date.now() / 1000) + 1800,
                    amountIn,
                    amountOutMinimum: amountOutMinimum,
                    sqrtPriceLimitX96: 0
                };

                console.log('Params:', params);
                console.log('Exact Input Single...');
                const tx = await router.exactInputSingle(params, {
                    gasLimit: 5000000
                });

                console.log('Swap transaction:', tx.hash);
                const receipt = await tx.wait();
                console.log('Swap receipt:', receipt);
                return receipt;
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        }, []);

        return {
            getAmountOut,
            getContracts,
            createPool,
            addLiquidity,
            swap,
            loading,
            error
        };
    };