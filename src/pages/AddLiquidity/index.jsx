import { useState } from 'react';
import { ethers } from 'ethers';
import { Token } from '@uniswap/sdk-core';
import { useUniswap } from "~/hook/useUniswap.js";
import { erc20Abi } from "viem";

const AddLiquidity = () => {
    const { addLiquidity, getContracts, loading, error } = useUniswap();

    const [formData, setFormData] = useState({
        token0Address: '',
        token1Address: '',
        token0Symbol: '',
        token1Symbol: '',
        amount0: '',
        amount1: '',
        fee: '3000', // Set default fee
        tickLower: '-887272',
        tickUpper: '887272'
    });

    const [tokenInfo, setTokenInfo] = useState({
        token0: null,
        token1: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate inputs
            if (!formData.token0Address || !formData.token1Address) {
                throw new Error('Token addresses are required');
            }

            if (!formData.amount0 || !formData.amount1) {
                throw new Error('Amounts are required');
            }

            // Validate both tokens and get their info
            const [token0, token1] = await Promise.all([
                validateAndGetToken(formData.token0Address, 0),
                validateAndGetToken(formData.token1Address, 1)
            ]);

            if (!token0 || !token1) {
                throw new Error('Invalid token');
            }

            // Convert amounts using the returned token info
            const amount0 = ethers.parseUnits(formData.amount0, token0.decimals);
            const amount1 = ethers.parseUnits(formData.amount1, token1.decimals);

            // Get fee
            const fee = parseInt(formData.fee);
            if (![500, 3000, 10000].includes(fee)) {
                throw new Error('Invalid fee tier');
            }

            // Add liquidity using the returned token info
            const result = await addLiquidity({
                token0,
                token1,
                fee,
                amount0Desired: amount0,
                amount1Desired: amount1
            });

            console.log('Success:', result);
            alert('Liquidity added successfully!');
        } catch (err) {
            console.error('Error:', err);
            alert(`Error: ${err.message}`);
        }
    };

    const validateAndGetToken = async (address, index) => {
        try {
            if (!ethers.isAddress(address)) {
                throw new Error('Invalid address format');
            }

            const provider = new ethers.BrowserProvider(window.ethereum, {
                chainId: 2605,
                name: 'PHO Testnet'
            });

            const tokenContract = new ethers.Contract(
                address,
                erc20Abi,
                provider
            );

            const [symbolResult, decimalsResult] = await Promise.all([
                tokenContract.symbol(),
                tokenContract.decimals()
            ]);

            const decimals = Number(decimalsResult);
            const symbol = String(symbolResult);

            if (typeof decimals !== 'number' || isNaN(decimals)) {
                throw new Error('Invalid decimals value');
            }

            if (typeof symbol !== 'string' || !symbol) {
                throw new Error('Invalid symbol value');
            }

            const token = new Token(
                2605,
                address,
                decimals,
                symbol
            );

            // Update state
            setTokenInfo(prev => ({
                ...prev,
                [`token${index}`]: token
            }));

            setFormData(prev => ({
                ...prev,
                [`token${index}Symbol`]: symbol
            }));

            return token;
        } catch (err) {
            console.error(`Error validating token ${index}:`, err);
            alert(`Invalid token ${index} address: ${err.message}`);
            return null;
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Add Liquidity</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Token 0 Address</label>
                    <input
                        type="text"
                        name="token0Address"
                        value={formData.token0Address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="0x..."
                        required
                    />
                    {formData.token0Symbol && (
                        <div className="mt-1 text-sm text-gray-600">
                            Token Symbol: {formData.token0Symbol}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-2">Token 1 Address</label>
                    <input
                        type="text"
                        name="token1Address"
                        value={formData.token1Address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="0x..."
                        required
                    />
                    {formData.token1Symbol && (
                        <div className="mt-1 text-sm text-gray-600">
                            Token Symbol: {formData.token1Symbol}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-2">Amount Token 0</label>
                    <input
                        type="number"
                        name="amount0"
                        value={formData.amount0}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="0.0"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Amount Token 1</label>
                    <input
                        type="number"
                        name="amount1"
                        value={formData.amount1}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="0.0"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Fee Tier</label>
                    <select
                        name="fee"
                        value={formData.fee}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="500">0.05%</option>
                        <option value="3000">0.3%</option>
                        <option value="10000">1%</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Adding Liquidity...' : 'Add Liquidity'}
                </button>

                {error && (
                    <div className="text-red-500 mt-2">
                        Error: {error}
                    </div>
                )}
            </form>
        </div>
    );
}

export default AddLiquidity;