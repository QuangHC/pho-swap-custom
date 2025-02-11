import React, {useState} from "react";
import {
    Box,
    Button,
    Flex,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Tooltip,
    useOutsideClick,
} from "@chakra-ui/react";
import {SettingsIcon, InfoOutlineIcon} from "@chakra-ui/icons";

const SwapSetting = () => {
    const [maxSlippage, setMaxSlippage] = useState("5.50");
    const [deadline, setDeadline] = useState(30);
    const [isAuto, setIsAuto] = useState(true);

    const handleSlippageChange = (e) => {
        const value = e.target.value;
        if (value === "" || (isFinite(value) && value <= 100)) {
            setMaxSlippage(value);
            setIsAuto(false);
        }
    };

    const handleDeadlineChange = (e) => {
        const value = e.target.value;
        if (value === "" || (isFinite(value) && value <= 4320)) {
            setDeadline(value);
        }
    };


    return (
        <Menu closeOnSelect={false}>
            {/* Menu Trigger Button */}
            <MenuButton
                as={IconButton}
                icon={<SettingsIcon/>}
                aria-label="Settings"
                fontSize={'20px'}
                color="#7D7D7D"
                variant="ghost"
                bg="white"
                _hover={{bg: "transparent"}}
                _active={{bg: "transparent"}}
            />

            {/* The Main Dropdown */}
            <MenuList
                borderRadius="25px"
                boxShadow="lg"
                p={4}
                py={7}
                minW="320px"
                border="1px solid rgb(242, 242, 242)"
            >
                <Flex justify={'space-between'} direction={'column'} gap={5}>
                    {/* Max Slippage */}
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Text fontSize="14px" fontWeight="600" mr={1}>
                                Max slippage
                            </Text>
                            <Tooltip label="The maximum slippage you’re willing to accept during a swap."
                                     fontSize="12px">
                                <InfoOutlineIcon color="gray.500"/>
                            </Tooltip>
                        </Flex>
                        <Flex>

                        </Flex>
                        <Flex border="1px solid #E2E8F0" borderRadius="full"
                              py={'3px'}
                              pl={'2px'}
                              pr={'10px'}
                              align={'center'}
                              minW={'100px'}
                        >

                            <Button
                                variant="unstyled"
                                size={'xs'}
                                _hover={{bg: "gray.200"}}
                                _active={{bg: "gray.300"}}
                                onClick={() => setMaxSlippage("Auto")}
                                borderRadius="full"
                                color={!isAuto ? 'black' : '#FC72FF'}
                                bg={!isAuto ? 'rgb(34 34 34 / 5%)' : '#FEF4FF'}
                                fontSize={'14px'}
                                px={'10px'}
                                py={'2px'}
                            >
                                Auto
                            </Button>

                            <Input
                                variant="unstyled"
                                placeholder="0.5"
                                textAlign="right"
                                w="50px"
                                value={maxSlippage}
                                onChange={handleSlippageChange}
                            />
                            <Text fontWeight="600bun " ml={1}>
                                %
                            </Text>
                        </Flex>
                    </Flex>

                    {/* Transaction Deadline */}
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Text fontSize="14px" fontWeight="600" mr={1}>
                                Tx. deadline
                            </Text>
                            <Tooltip label="The transaction deadline in minutes (max: 4320)." fontSize="12px">
                                <InfoOutlineIcon color="gray.500"/>
                            </Tooltip>
                        </Flex>
                        <Flex align="center"
                              minW={'135px'}
                              border="1px solid #E2E8F0"
                              borderRadius="full"
                              py={'3px'}
                              pl={'2px'}
                              pr={'10px'}
                              justify={'space-between'}
                        >
                            <Input
                                variant="unstyled"
                                placeholder="30"
                                textAlign="right"
                                w="50px"
                                color={'black'}
                                value={deadline}
                                onChange={handleDeadlineChange}
                            />
                            <Text fontSize="14px" fontWeight="600" color="#7D7D7D">
                                minutes
                            </Text>
                        </Flex>
                    </Flex>

                    {/* Trade Options (Placeholder) */}
                    <Flex justify="space-between" align="center">
                        <Text fontSize="14px" fontWeight="600">
                            Trade options
                        </Text>
                        <Text fontSize="14px" fontWeight="600" color="#7D7D7D" pr={'10px'}>
                            Default
                        </Text>
                    </Flex>
                </Flex>
            </MenuList>
        </Menu>
    );
};

export default SwapSetting;