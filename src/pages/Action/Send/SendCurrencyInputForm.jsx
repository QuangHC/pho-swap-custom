import {Box, Button, Flex, Input, Text, useDisclosure} from "@chakra-ui/react";
import {useState} from "react";
import LimitPriceSection from "~/pages/Action/Limit/LimitPriceSection.jsx";
import {ChevronDownIcon} from "@chakra-ui/icons";
import TokenModal from "~/pages/Action/components/TokenModal.jsx";
import {GoAlertFill} from "react-icons/go";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import ButtonConnectCustom from "~/components/ButtonConnectCustom.jsx";

const SendCurrencyInputForm = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [valueTransfer, setValueTransfer] = useState("");
    const [tokenSending, setTokenSending] = useState({
        symbol: "TKA",
        name: "Token A",
        address: "0xd059C192841cF5dFa40b11c831Aa2A33A18990f8"
    });
    const [isUsd, setIsUsd] = useState(true);
    const { openConnectModal } = useConnectModal();

    const getActualAmount = () => {
        if (isUsd) {
            if (valueTransfer.toString().startsWith("$")) {
                return Number(valueTransfer.slice(1));
            }
        }
        return Number(valueTransfer);
    }

    const getValueTransfer = () => {
        if (isUsd) {
            if (tokenSending.address === "0xd059C192841cF5dFa40b11c831Aa2A33A18990f8") {
                return 0.001 * getActualAmount();
            } else if (tokenSending.address === "0xd059C192841cF5dFa40b11c831Aa2A33A1899123") {
                return 0.02 * getActualAmount();
            }
        } else {
            if (tokenSending.address === "0xd059C192841cF5dFa40b11c831Aa2A33A18990f8") {
                return 1000 * getActualAmount();
            } else if (tokenSending.address === "0xd059C192841cF5dFa40b11c831Aa2A33A1899123") {
                return 200 * getActualAmount();
            }
        }

    }

    const handleValueTransferChange = (value) => {
        if (isUsd) {
            if (value === "$") {
                setValueTransfer("");
            } else if (value.length > 1) {
                setValueTransfer(`$${Number(value.slice(1))}`);
            } else {
                setValueTransfer(`$${Number(value)}`);
            }
        } else {
            setValueTransfer(value);
        }
    }

    const handleSwap = () => {
        if (valueTransfer !== "") {
            if (isUsd) {
                if (valueTransfer === "$") {
                    setValueTransfer("");
                } else {
                    setValueTransfer(getValueTransfer().toString());
                }
            } else {
                setValueTransfer(`$${getValueTransfer().toString()}`);
            }
        }
        setIsUsd(!isUsd);
    }

    // Callback function to handle token selection
    const handleTokenSelect = (selectedToken) => {
        setTokenSending(selectedToken);
        setValueTransfer("");
        onClose(); // Close the modal after selecting a token
    };

    return (
        <Flex flexDir={"column"} gap={'3px'}>
            {/* Send Section */}
            <Flex
                flexDir={"column"}
                align={"flex-start"}
                pb={6}
                bg={'#F9F9F9'}
                borderTopRadius="15px"
                p={4}
                gap={1}
            >
                <Text fontWeight="600" fontSize={'13px'} color="#7D7D7D">You&#39;re sending</Text>

                <Flex flexDir={"column"} py={12}
                      bg={'#F9F9F9'}
                >
                    <Flex>
                        <Input
                            variant="unstyled"
                            placeholder={isUsd ? "$0" : "0"}
                            fontSize="70px"
                            value={valueTransfer}
                            textAlign={'center'}
                            onChange={(e) => handleValueTransferChange(e.target.value)}
                            type="text"
                        />
                    </Flex>
                    <Flex onClick={handleSwap} justifyContent={'center'} w={'full'}>
                        <Text fontWeight={'600'} color={'#CECECE'} textAlign={'center'}>
                            {isUsd ?
                                `${getValueTransfer()} ${tokenSending.symbol}`
                                :
                                `$${getValueTransfer()} USD`
                            }
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex justifyContent="space-between" py={12}
                  p={4}
                  borderBottomRadius="15px"
                  bg={'#F9F9F9'}
                  w={'full'}
                  alignItems="center"
                  onClick={() => {
                      onOpen();
                  }}
            >
                <Text color={'black'}>
                    {tokenSending.symbol}
                </Text>
                <Box bg={"#F9F9F9"} p={"10px"} borderRadius="15px">
                    <ChevronDownIcon fontSize={"24px"} color={'#CECECE'}/>
                </Box>
            </Flex>

            <Flex
                mt={1}
                flexDir={"column"}
                align={"flex-start"}
                p={4}
                borderRadius="15px"
                bg={'#F9F9F9'}
                gap={1}
                border={'1px solid transparent'}
            >
                <Text fontWeight="600" color="#7D7D7D" fontSize={'15px'}>
                    To
                </Text>
                <Flex justifyContent="space-between">
                    <Input
                        variant="unstyled"
                        fontSize="15px"
                        placeholder="Wallet address or DNS name"
                        type="text"
                    />
                </Flex>
            </Flex>

            <ButtonConnectCustom />

            {/* Token Modal */}
            <TokenModal isOpen={isOpen} onClose={onClose} onSelectToken={handleTokenSelect}/>
        </Flex>
    )
}

export default SendCurrencyInputForm;