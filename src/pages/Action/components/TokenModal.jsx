import React, {useState} from "react";
import {
    Box,
    Button,
    Flex,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    Avatar,
    Tag,
    Divider, InputLeftElement, InputGroup,
} from "@chakra-ui/react";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import {AiOutlineGlobal} from "react-icons/ai";
import ChainNetworkDropDown from "~/pages/Action/components/ChainNetworkDropDown.jsx";
import {FaStar} from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const TokenModal = ({isOpen, onClose, onSelectToken}) => {
    const [search, setSearch] = useState("");

    const topTokens = [
        {symbol: "ETH", name: "Ethereum"},
        {symbol: "USDC", name: "USD Coin"},
        {symbol: "USDT", name: "Tether"},
        {symbol: "WBTC", name: "Wrapped Bitcoin"},
        {symbol: "WETH", name: "Wrapped Ether"},
    ];

    const tokenList = [
        {symbol: "TKA", name: "Token A", address: "0xd059C192841cF5dFa40b11c831Aa2A33A18990f8"},
        {symbol: "TKB", name: "Token B", address: "0xd059C192841cF5dFa40b11c831Aa2A33A1899123"},
    ];

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
                <ModalOverlay/>
                <ModalContent borderRadius="15px">
                    <ModalHeader>
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text>Select a token</Text>
                            <ModalCloseButton/>
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        {/* Search Token and Dropdown */}
                        <Flex mb={4} justify={"space-between"} alignItems="center" bg={'#F9F9F9'} borderRadius={'full'} py={2} px={6}>
                            <Flex align={'center'} gap={2}>
                                <SearchIcon color="gray.600"/>
                                <Input
                                    fontSize={'16px'}
                                    placeholder="Search tokens"
                                    variant="unstyled"
                                    bg={'transparent'}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Flex>

                            <ChainNetworkDropDown />
                        </Flex>

                        {/* Top Tokens */}
                        {/*<Text fontSize="sm" fontWeight="bold" mb={2}>*/}
                        {/*    Top Tokens*/}
                        {/*</Text>*/}
                        {/*<Flex mb={4} wrap="wrap" gap={2}>*/}
                        {/*    {topTokens.map((token) => (*/}
                        {/*        <Tag*/}
                        {/*            size="lg"*/}
                        {/*            key={token.symbol}*/}
                        {/*            variant="outline"*/}
                        {/*            px={3}*/}
                        {/*            py={2}*/}
                        {/*        >*/}
                        {/*            <Flex alignItems="center">*/}
                        {/*                <Avatar*/}
                        {/*                    name={token.symbol}*/}
                        {/*                    src={`https://cryptologos.cc/logos/${token.symbol.toLowerCase()}-logo.png`}*/}
                        {/*                    size="xs"*/}
                        {/*                    mr={2}*/}
                        {/*                />*/}
                        {/*                {token.symbol}*/}
                        {/*            </Flex>*/}
                        {/*        </Tag>*/}
                        {/*    ))}*/}
                        {/*</Flex>*/}

                        {/*<Divider mb={4}/>*/}

                        {/* Token List */}
                        <Flex gap={2} color={'gray'} align={'center'} mb={'5'}>
                            <FaStar fontSize="13px" />
                            <Text fontSize="sm" fontWeight="bold">
                                Tokens
                            </Text>
                        </Flex>

                        <VStack align="start" spacing={4} mb={5}>
                            {tokenList.map((token) => (
                                <Flex
                                    key={token.symbol}
                                    align="center"
                                    w="full"
                                    justify="space-between"
                                    onClick={() => onSelectToken(token)}
                                >
                                    <Flex alignItems="center">
                                        <Avatar
                                            name={token.name}
                                            src={`https://cryptologos.cc/logos/${token.symbol.toLowerCase()}-logo.png`}
                                            size="sm"
                                            mr={3}
                                        />
                                        <Box>
                                            <Text fontWeight="500" color={'#222222'}>{token.name}</Text>
                                            <Flex gap={2}>
                                                <Text fontSize="14px" fontWeight={500} color="#7D7D7D">
                                                    {token.symbol}
                                                </Text>
                                                <Text fontSize="14px" fontWeight={500} color="#BFBFBF">
                                                    {token.address.slice(0, 4)}...{token.address.slice(-4)}
                                                </Text>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Flex>
                            ))}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TokenModal;