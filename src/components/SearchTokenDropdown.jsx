import {useState, useEffect} from "react";
import {
    Input,
    InputGroup,
    InputLeftElement,
    Box,
    VStack,
    HStack,
    Text,
    Image,
    Spinner,
    Tooltip,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import {InfoOutlineIcon, SearchIcon} from "@chakra-ui/icons";
import {FaArrowTrendUp} from "react-icons/fa6";

const topTokens = [
    {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: "$2,677.01",
        change: "1.36%",
        icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        price: "$1.00",
        change: "0.00%",
        icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
    {
        id: "usdt",
        name: "Tether USD",
        symbol: "USDT",
        price: "$1.00",
        change: "0.00%",
        icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    },
];

const SearchTokenDropdown = () => {
    const [searchValue, setSearchValue] = useState("");
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, lg: false });

    useEffect(() => {
        if (!searchValue) {
            setTokens(topTokens);
            return;
        }

        setLoading(true);
        fetch(`https://api.coingecko.com/api/v3/search?query=${searchValue}`)
            .then((res) => res.json())
            .then((data) => {
                setTokens(
                    data.coins.map((coin) => ({
                        id: coin.id,
                        name: coin.name,
                        symbol: coin.symbol.toUpperCase(),
                        icon: coin.thumb,
                        price: "N/A",
                        change: "N/A",
                    }))
                );
            })
            .finally(() => setLoading(false));
    }, [searchValue]);

    const TokenList = () => (
        <VStack align="stretch" spacing="2" p="2" maxH={{base: 'auto', lg: '600px'}} overflow="auto">
            {!searchValue ? (
                <Box display="flex" alignItems="center" gap={2} pl={'10px'}>
                    <FaArrowTrendUp color={'black'}/>
                    <Text fontSize={'14px'} fontWeight={'600'} color={'black'}>
                        Popular tokens
                    </Text>
                    <Tooltip
                        label="Popular tokens are identified based on their trading volume on Uniswap over the past 24 hours."
                        placement="right"
                        hasArrow
                        bg="white"
                        fontSize={'12px'}
                        color="black"
                        boxShadow="lg"
                        borderRadius="8px"
                        p={3}
                    >
                        <InfoOutlineIcon fontSize={'12px'} color="rgb(191, 191, 191)" cursor="pointer" mb={'3px'}/>
                    </Tooltip>
                </Box>
            ) : (
                <Text fontSize={'14px'} pl={'10px'} fontWeight={'600'} color={'black'}>
                    Tokens
                </Text>
            )}
            {tokens.map((token) => (
                <HStack key={token.id} p="2" _hover={{bg: "rgba(34, 34, 34, 0.07)"}} borderRadius="md">
                    <Image src={token.icon} boxSize="24px"/>
                    <Box flex="1">
                        <Text fontWeight="bold">{token.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                            {token.symbol}
                        </Text>
                    </Box>
                    <Box textAlign="right">
                        <Text fontWeight="bold">{token.price}</Text>
                        <Text fontSize="sm" color="green.500">
                            {token.change}
                        </Text>
                    </Box>
                </HStack>
            ))}
        </VStack>
    );

    if (isMobile) {
        return (
            <>
                <IconButton
                    aria-label="Search tokens"
                    icon={<SearchIcon />}
                    onClick={onOpen}
                    variant="ghost"
                    borderRadius="full"
                />

                <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">
                            <InputGroup w={'90%'}>
                                <InputLeftElement pointerEvents="none" left={'8px'}>
                                    <SearchIcon color="rgb(125, 125, 125)" fontSize={'18px'}/>
                                </InputLeftElement>
                                <Input
                                    placeholder="Search tokens"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    borderRadius="20px"
                                    pl={'12'}
                                    border={'1px solid rgba(34, 34, 34, 0.07)'}
                                    bg="rgb(255, 255, 255)"
                                    _placeholder={{color: "#7D7D7D"}}
                                    _hover={{boxShadow: "none", borderColor: "rgba(34, 34, 34, 0.07)"}}
                                    _focus={{
                                        boxShadow: "none",
                                        borderColor: "rgba(34, 34, 34, 0.07)",
                                    }}
                                    _focusVisible={{
                                        boxShadow: "none",
                                        borderColor: "rgba(34, 34, 34, 0.07)",
                                    }}
                                    autoFocus
                                />
                            </InputGroup>
                        </DrawerHeader>
                        <DrawerBody>
                            {loading ? (
                                <Box textAlign="center" py="4">
                                    <Spinner size="sm"/>
                                </Box>
                            ) : (
                                <TokenList />
                            )}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }

    return (
        <Box position="relative" w="full" maxW="450px">
            <InputGroup>
                <InputLeftElement pointerEvents="none" left={'8px'}>
                    <SearchIcon color="rgb(125, 125, 125)" fontSize={'18px'}/>
                </InputLeftElement>
                <Input
                    placeholder="Search tokens"
                    borderRadius="20px"
                    pl={'12'}
                    border={'1px solid rgba(34, 34, 34, 0.07)'}
                    bg="rgb(255, 255, 255)"
                    _placeholder={{color: "#7D7D7D"}}
                    _hover={{boxShadow: "none", borderColor: "rgba(34, 34, 34, 0.07)"}}
                    _focus={{
                        boxShadow: "none",
                        borderColor: "rgba(34, 34, 34, 0.07)",
                        borderBottomRadius: '0',
                        borderBottom: '0'
                    }}
                    _focusVisible={{
                        boxShadow: "none",
                        borderColor: "rgba(34, 34, 34, 0.07)",
                    }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                />
            </InputGroup>

            {showDropdown && (
                <Box
                    position="absolute"
                    w="full"
                    bg="white"
                    borderBottomRadius="25px"
                    border={'1px solid #22222212'}
                    borderTop={0}
                    zIndex="10"
                >
                    {loading ? (
                        <Box textAlign="center" py="4">
                            <Spinner size="sm"/>
                        </Box>
                    ) : (
                        <TokenList />
                    )}
                </Box>
            )}
        </Box>
    );
};

export default SearchTokenDropdown;