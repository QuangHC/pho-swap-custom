import {
    Box,
    Button,
    Flex,
    Input,
    Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import TokenModal from "~/pages/Action/components/TokenModal.jsx";
import SwapSetting from "~/pages/Action/components/SwapSetting.jsx";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import ButtonConnectCustom from "~/components/ButtonConnectCustom.jsx";
import {useAccount} from "wagmi";

// eslint-disable-next-line react/prop-types
const SwapComponent = ({ isOpen, onOpen, onClose, tokenSell, tokenBuy, setActiveSection, handleSwapState, handleTokenSelect, isLimit  }) => {
    const { isConnected, address } = useAccount();

    return (
        <Flex flexDir={"column"} bg="white" gap={0}>
            { !isLimit &&
                <Flex align={'center'} position={'absolute'} right={0} top={'-0px'}>
                    <SwapSetting />
                </Flex>
            }

            {/* Sell Section */}
            <Flex
                flexDir={"column"}
                align={"flex-start"}
                p={4}
                borderRadius="15px"
                border={'1px solid rgb(34 34 34 / 5%)'}
                mb={2}
                gap={1}
            >
                <Text fontWeight="600" color="#7D7D7D">
                    Sell
                </Text>
                <Flex justifyContent="space-between">
                    <Input
                        variant="unstyled"
                        placeholder="0"
                        fontSize="36px"
                        type="number"
                    />
                    <Flex
                        alignItems="center"
                        onClick={() => {
                            setActiveSection("Sell");
                            onOpen();
                        }}
                    >
                        {!tokenSell ? (
                            <Button
                                fontWeight="600"
                                color="white"
                                bg="rgb(252, 114, 255)"
                                size="sm"
                                fontSize={"16px"}
                                px={3}
                                borderRadius={"full"}
                                rightIcon={<ChevronDownIcon />}
                                _hover={{ bg: "rgb(252, 114, 255)" }}
                                _active={{ bg: "rgb(252, 114, 255)" }}
                            >
                                Select Token
                            </Button>
                        ) : (
                            <Flex
                                borderRadius={"15px"}
                                border={"1px solid rgb(242, 242, 242)"}
                                align={"center"}
                                gap={2}
                                px={4}
                                justifyContent={"space-between"}
                            >
                                <Text fontWeight="bold" fontSize="16px" py={1}>
                                    {tokenSell.symbol}
                                </Text>
                                <ChevronDownIcon fontSize={'25px'} mb={'3px'}/>
                            </Flex>
                        )}
                    </Flex>
                </Flex>

                {tokenSell && !isLimit && (
                    <Text fontSize="14px" fontWeight={"bold"} color="#7D7D7D">
                        $0
                    </Text>
                )}
            </Flex>

            {/* Divider with Icon */}
            <Flex justifyContent="center" alignItems="center" position={"relative"}>
                <Box bg="white" p={"5px"} borderRadius="15px" position={"absolute"} onClick={handleSwapState} cursor={"pointer"}>
                    <Box bg={"#F9F9F9"} p={"10px"} borderRadius="15px">
                        <ChevronDownIcon fontSize={"24px"} />
                    </Box>
                </Box>
            </Flex>

            {/* Buy Section */}
            <Flex
                flexDir={"column"}
                align={"flex-start"}
                p={4}
                borderRadius="15px"
                mb={2}
                bg={'#F9F9F9'}
                boxShadow="md"
                gap={1}
            >
                <Text fontWeight="600" color="#7D7D7D">
                    Buy
                </Text>
                <Flex justifyContent="space-between">
                    <Input
                        variant="unstyled"
                        placeholder="0"
                        fontSize="36px"
                        type="number"
                    />
                    <Flex
                        alignItems="center"
                        onClick={() => {
                            setActiveSection("Buy");
                            onOpen();
                        }}
                    >
                        {!tokenBuy ? (
                            <Button
                                fontWeight="600"
                                color="white"
                                bg="rgb(252, 114, 255)"
                                size="sm"
                                fontSize={"16px"}
                                px={3}
                                borderRadius={"full"}
                                rightIcon={<ChevronDownIcon />}
                                _hover={{ bg: "rgb(252, 114, 255)" }}
                                _active={{ bg: "rgb(252, 114, 255)" }}
                            >
                                Select Token
                            </Button>
                        ) : (
                            <Flex
                                borderRadius={"15px"}
                                border={"1px solid rgb(242, 242, 242)"}
                                align={"center"}
                                gap={2}
                                px={4}
                                justifyContent={"space-between"}
                            >
                                <Text fontWeight="bold" fontSize="16px" py={1}>
                                    {tokenBuy.symbol}
                                </Text>
                                <ChevronDownIcon fontSize={'25px'} mb={'3px'}/>
                            </Flex>
                        )}
                    </Flex>
                </Flex>

                {tokenBuy && !isLimit && (
                    <Text fontSize="14px" fontWeight={"bold"} color="#7D7D7D">
                        $0
                    </Text>
                )}
            </Flex>

            { !isConnected ? (
                <ButtonConnectCustom />
            ) : (
                <Button  bg={'#F9F9F9'} borderRadius={'25px'} py={7}>
                    Swap Token
                </Button>
            )}

            {/* Token Modal */}
            <TokenModal isOpen={isOpen} onClose={onClose} onSelectToken={handleTokenSelect} />
        </Flex>
    );
};

export default SwapComponent;