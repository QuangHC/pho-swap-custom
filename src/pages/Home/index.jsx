import {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {useDebounce} from "~/hook/useDebounce.js";
import {useUniswap} from "~/hook/useUniswap.js";
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Wrapper from "~/components/Wrapper.jsx";
import Swap from "~/pages/Action/Swap/index.jsx";
import LimitForm from "~/pages/Action/Limit/LimitForm.jsx";
import SendCurrencyInputForm from "~/pages/Action/Send/SendCurrencyInputForm.jsx";

const Home = () => {
    const [tokenIn, setTokenIn] = useState('');
    const [tokenOut, setTokenOut] = useState('');
    const [amountIn, setAmountIn] = useState('');
    const [amountOut, setAmountOut] = useState('');
    const [slippage, setSlippage] = useState(0.5); // 0.5%

    const {swap, getAmountOut, loading, error} = useUniswap();

    const debouncedAmountIn = useDebounce(amountIn, 500);

    useEffect(() => {
        const updateAmountOut = async () => {
            try {
                if (!tokenIn || !tokenOut || !debouncedAmountIn || debouncedAmountIn <= 0) {
                    setAmountOut('');
                    return;
                }

                const quotedAmountOut = await getAmountOut({
                    tokenIn,
                    tokenOut,
                    amountIn: debouncedAmountIn
                });

                setAmountOut(quotedAmountOut.toString());
            } catch (err) {
                console.error('Error getting quote:', err);
                setAmountOut('');
            }
        };

        updateAmountOut();
    }, [tokenIn, tokenOut, debouncedAmountIn]);

    const handleSwap = async () => {
        try {
            console.log('START...')
            if (!tokenIn || !tokenOut || !amountIn) {
                alert('Please fill in all fields');
                return;
            }

            // Convert to Wei
            const amountInWei = ethers.parseUnits(amountIn.toString(), 18);

            console.log('Start swap...')
            // Thực hiện swap
            const result = await swap({
                tokenIn,
                tokenOut,
                amountIn: amountInWei,
                slippage
            });

            // Đợi transaction hoàn thành
            alert(`Swap successful at ${result}`);

            // Reset form
            setAmountIn('');
            setAmountOut('');
        } catch (err) {
            console.error('Swap failed:', err);
            alert(`Swap failed: ${err.message}`);
        }
    };

    return (
        <Wrapper centerContent maxW={'500px'} mt={'20'} >
            {/* Tabs */}
            <Flex justifyContent="column" alignItems="center" mb={4} minW={'full'}>
                <Tabs variant='soft-rounded' flex="1">
                    <TabList justifyContent="space-between">
                        <Flex color="#7D7D7D" fontWeight="500" py={1} gap={5}>
                            <Tab
                                px={'4'}
                                py={1}
                                fontSize="14px"
                                color="#7D7D7D"
                                _hover={{color: 'black'}}
                                _selected={{color: "black", fontWeight: "bold", bg: 'rgb(34 34 34 / 5%)'}}
                            >
                                Swap
                            </Tab>
                            <Tab px={'4'}
                                 py={1} fontSize="14px"
                                 color="#7D7D7D"
                                 _hover={{color: 'black'}}
                                 _selected={{color: "black", fontWeight: "bold", bg: 'rgb(34 34 34 / 5%)'}}
                            >
                                Limit
                            </Tab>
                            <Tab px={'4'}
                                 py={1} fontSize="14px"
                                 color="#7D7D7D"
                                 _hover={{color: 'black'}}
                                 _selected={{color: "black", fontWeight: "bold", bg: 'rgb(34 34 34 / 5%)'}}
                            >
                                Send
                            </Tab>
                            <Tab px={'4'}
                                 py={1} fontSize="14px"
                                 color="#7D7D7D"
                                 _hover={{color: 'black'}}
                                 _selected={{color: "black", fontWeight: "bold", bg: 'rgb(34 34 34 / 5%)'}}
                            >
                                Buy
                            </Tab>
                        </Flex>
                    </TabList>
                    <TabPanels mt={2}>
                        <TabPanel p={0}>
                            <Swap  />
                        </TabPanel>
                        <TabPanel p={0}>
                            <LimitForm />
                        </TabPanel>
                        <TabPanel p={0}>
                            <SendCurrencyInputForm />
                        </TabPanel>
                        <TabPanel p={0}>
                            <LimitForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
            {/*<div className="max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg">*/}
            {/*    <h2 className="text-2xl font-bold mb-6">Swap Tokens</h2>*/}

            {/*    <div className="space-y-4">*/}
            {/*        <div>*/}
            {/*            <label className="block mb-2">Token In Address</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                value={tokenIn}*/}
            {/*                onChange={(e) => setTokenIn(e.target.value)}*/}
            {/*                className="w-full p-2 border rounded"*/}
            {/*                placeholder="0x..."*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*            <label className="block mb-2">Token Out Address</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                value={tokenOut}*/}
            {/*                onChange={(e) => setTokenOut(e.target.value)}*/}
            {/*                className="w-full p-2 border rounded"*/}
            {/*                placeholder="0x..."*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*            <label className="block mb-2">Amount In</label>*/}
            {/*            <input*/}
            {/*                type="number"*/}
            {/*                value={amountIn}*/}
            {/*                onChange={(e) => setAmountIn(e.target.value)}*/}
            {/*                className="w-full p-2 border rounded"*/}
            {/*                placeholder="0.0"*/}
            {/*                min="0"*/}
            {/*                step="any"*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*            <label className="block mb-2">Expected Amount Out</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                value={amountOut}*/}
            {/*                readOnly*/}
            {/*                className="w-full p-2 border rounded bg-gray-100"*/}
            {/*                placeholder="0.0"*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*            <label className="block mb-2">Slippage Tolerance (%)</label>*/}
            {/*            <input*/}
            {/*                type="number"*/}
            {/*                value={slippage}*/}
            {/*                onChange={(e) => setSlippage(Number(e.target.value))}*/}
            {/*                className="w-full p-2 border rounded"*/}
            {/*                placeholder="0.5"*/}
            {/*                min="0.1"*/}
            {/*                max="100"*/}
            {/*                step="0.1"*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <button*/}
            {/*            onClick={handleSwap}*/}
            {/*            disabled={loading || !amountOut}*/}
            {/*            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-gray-400"*/}
            {/*        >*/}
            {/*            {loading ? 'Processing...' : 'Swap'}*/}
            {/*        </button>*/}

            {/*        {error && (*/}
            {/*            <div className="text-red-500 mt-2">*/}
            {/*                Error: {error}*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Wrapper>
    );
}

export default Home;