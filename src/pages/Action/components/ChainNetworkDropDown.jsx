import {useState} from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Flex,
    Avatar,
    Text,
    Box,
} from "@chakra-ui/react";
import {ChevronDownIcon, CheckIcon} from "@chakra-ui/icons";
import {images} from "~/assets/index.js";

const chainNetworks = [
    {name: "All networks", logo: images.CHAIN.all_chain},
    {name: "Pho Chain", logo: images.CHAIN.network_icon_dark},
];

const ChainNetworkDropdown = () => {
    const [selectedChain, setSelectedChain] = useState("Pho Chain");

    return (
        <Menu> {/* Correct positioning */}
            {/* Menu Button */}
            <MenuButton
                as={Button}
                p={0}
                bg="transparent"
                borderRadius="md"
                _hover={{bg: "transparent", border: "none"}}
                _active={{bg: "transparent", border: "none"}}
                h="60%"
            >
                {/* Selected Network */}
                <Flex alignItems="center" justifyContent="space-between">
                    <Box bg="#f9f9f9" p={1} borderRadius="5px">
                        <Avatar
                            src={
                                chainNetworks.find((chain) => chain.name === selectedChain)?.logo ||
                                ""
                            }
                            w="15px"
                            h="15px"
                            mt="2px"
                        />
                    </Box>
                    <ChevronDownIcon fontSize="22px" bg="transparent" />
                </Flex>
            </MenuButton>

            {/* Menu List */}
            <MenuList
                maxH="300px"
                overflowY="auto"
                borderColor="gray.200"
                borderRadius="15px"
                boxShadow="lg"
            >
                {chainNetworks.map((chain) => (
                    <MenuItem
                        key={chain.name}
                        onClick={() => setSelectedChain(chain.name)}
                        py={2}
                        _hover={{ bg: "transparent"}}
                        _active={{ bg: "transparent"}}
                        _focus={{ bg: "transparent"}}
                    >
                        <Flex alignItems="center" justifyContent="space-between" w="full">
                            {/* Chain Name and Icon */}
                            <Flex alignItems="center">
                                <Avatar src={chain.logo} w="16px" h="16px" mr={3} />
                                <Text fontSize="15px" fontWeight="600" mt="5px">
                                    {chain.name}
                                </Text>
                            </Flex>

                            {/* Check Icon for Selected Network */}
                            {selectedChain === chain.name && (
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="black"
                                    borderRadius="full"
                                    p="3px"
                                >
                                    <CheckIcon fontSize="10px" color="white" />
                                </Flex>
                            )}
                        </Flex>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default ChainNetworkDropdown;