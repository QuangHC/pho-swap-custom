import {Box, Button, Flex, Input, Text, useDisclosure} from "@chakra-ui/react";
import {useState} from "react";
import LimitPriceSection from "~/pages/Action/Limit/LimitPriceSection.jsx";
import {ChevronDownIcon} from "@chakra-ui/icons";
import TokenModal from "~/pages/Action/components/TokenModal.jsx";
import {GoAlertFill} from "react-icons/go";
import ButtonConnectCustom from "~/components/ButtonConnectCustom.jsx";

const LimitForm = () => {
    const initialWorthValue = 10;

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [tokenSell, setTokenSell] = useState({
        symbol: "TKA",
        name: "Token A",
        address: "0xd059C192841cF5dFa40b11c831Aa2A33A18990f8"
    });
    const [tokenBuy, setTokenBuy] = useState(null);
    const [worthValue, setWorthValue] = useState(initialWorthValue);
    // State to track which section (Sell/Buy) triggered the TokenModal
    const [activeSection, setActiveSection] = useState("");
    const [expiry, setExpiry] = useState(1);

    const expiries = [
        {name: '1 day', value: 1},
        {name: '1 week', value: 7},
        {name: '1 month', value: 30},
        {name: '1 year', value: 365},
    ]

    const handleSwapState = () => {
        setTokenBuy(tokenSell);
        setTokenSell(tokenBuy);
    }

    // Callback function to handle token selection
    const handleTokenSelect = (selectedToken) => {
        if (activeSection === "Sell") {
            if (tokenBuy && selectedToken.address === tokenBuy.address) {
                handleSwapState();
            } else {
                setTokenSell(selectedToken);
            }
        } else if (activeSection === "Buy") {
            if (tokenSell && selectedToken.address === tokenSell.address) {
                handleSwapState();
            } else {
                setTokenBuy(selectedToken);
            }
        }
        onClose(); // Close the modal after selecting a token
    };

    return (
        <Flex flexDir={"column"} gap={0}>
            <LimitPriceSection isOpen={isOpen} onOpen={onOpen} onClose={onClose}
                               initialWorthValue={initialWorthValue}
                               worthValue={worthValue} handleWorthValue={setWorthValue}
                               tokenSell={tokenSell} tokenBuy={tokenBuy} activeSction={activeSection}
                               setActiveSection={setActiveSection} handleSwapState={handleSwapState}
                               handleTokenSelect={handleTokenSelect}/>

            {/* Sell Section */}
            <Flex
                flexDir={"column"}
                align={"flex-start"}
                p={4}
                pb={6}
                borderRadius="15px"
                mb={2}
                bg={'#F9F9F9'}
                gap={1}
                border={'1px solid transparent'}
                _hover={{borderColor: 'rgb(242, 242, 242)'}}
                _focusWithin={{borderColor: 'rgb(184 192 220 / 24%)'}}
            >
                <Text fontWeight="600" color="#7D7D7D" fontSize={'15px'}>
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
                                rightIcon={<ChevronDownIcon/>}
                                _hover={{bg: "rgb(252, 114, 255)"}}
                                _active={{bg: "rgb(252, 114, 255)"}}
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
            </Flex>

            {/* Divider with Icon */}
            <Flex justifyContent="center" alignItems="center" position={"relative"}>
                <Box bg="white" p={"5px"} borderRadius="15px" position={"absolute"} onClick={handleSwapState}
                     cursor={"pointer"}>
                    <Box bg={"#F9F9F9"} p={"10px"} borderRadius="15px">
                        <ChevronDownIcon fontSize={"24px"}/>
                    </Box>
                </Box>
            </Flex>

            {/* Buy Section */}
            <Flex
                flexDir={"column"}
                align={"flex-start"}
                p={4}
                pb={6}
                borderRadius="15px"
                mb={2}
                bg={'#F9F9F9'}
                gap={1}
                border={'1px solid transparent'}
                _hover={{borderColor: 'rgb(242, 242, 242)'}}
                _focusWithin={{borderColor: 'rgb(184 192 220 / 24%)'}}
            >
                <Text fontWeight="600" color="#7D7D7D" fontSize={'15px'}>
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
                                rightIcon={<ChevronDownIcon/>}
                                _hover={{bg: "rgb(252, 114, 255)"}}
                                _active={{bg: "rgb(252, 114, 255)"}}
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
            </Flex>

            {tokenBuy && tokenSell && (
                <Flex justify={'space-between'} align={'center'} borderRadius="10px" bg={'transparent'} p={'4'}>
                    <Text fontWeight="600" fontSize={'13px'} color="#7D7D7D">
                        Expiry
                    </Text>
                    <Flex gap={1}>
                        {
                            expiries.map((exp, index) => (
                                <Button
                                    key={index}
                                    size={'xs'}
                                    color={exp.value === expiry ? 'rgb(34, 34, 34)' : '#7D7D7D'}
                                    bg={exp.value === expiry ? 'rgb(34 34 34 / 7%)' : 'transparent'}
                                    borderRadius={'full'}
                                    py={'14px'}
                                    _hover={{border: '1px solid rgba(34, 34, 34, 0.07)', color: '#6B6B6B'}}
                                    _active={{border: '1px solid rgba(34, 34, 34, 0.07)', color: '#6B6B6B'}}
                                    border={exp.value === expiry ? '1px solid rgba(34, 34, 34, 0.07)' : '1px solid rgb(242, 242, 242)'}
                                    onClick={() => setExpiry(exp.value)}
                                    isDisabled={!tokenSell || !tokenBuy}
                                >
                                    {exp.name}
                                </Button>
                            ))
                        }
                    </Flex>
                </Flex>
            )}

            <ButtonConnectCustom />

            <Flex gap={4} p={4} borderRadius="15px" bg={'rgb(249, 249, 249)'}>
                <GoAlertFill fontSize={'20px'} color={'#7D7D7D'}/>
                <Text textAlign={'left'} fontSize={'13px'} color={'#222222'} fontWeight={'600'}>
                    Limits may not execute exactly when tokens reach the specified price.
                </Text>
            </Flex>
            {/* Token Modal */}
            <TokenModal isOpen={isOpen} onClose={onClose} onSelectToken={handleTokenSelect}/>
        </Flex>
    )
}

export default LimitForm;