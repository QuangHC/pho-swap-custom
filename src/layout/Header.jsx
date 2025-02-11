import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'
import {MdOutlineBarChart, MdOutlineSwapCalls} from "react-icons/md";
import {FaCreditCard, FaPaperPlane} from "react-icons/fa";
import SearchTokenDropdown from "~/components/SearchTokenDropdown.jsx";
import ButtonConnectCustom from "~/components/ButtonConnectCustom.jsx";


export default function Header() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1, md: '1' }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        Logo
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Flex flex={0} justify={'center'} minW={{base : '50px', xl: '400px'}}>
                    <SearchTokenDropdown />
                </Flex>
                <Stack
                    ml={{ base: 0, md: '10px', xl: 0}}
                    flex={{ base: 1, md: 0, xl: 1 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <ButtonConnectCustom size={'sm'} />
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('#7D7D7D', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'18px'}
                                fontWeight={600}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={1}
                                rounded={'xl'}
                                maxW={'200px'}
                            >
                                <Stack gap={2}>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

// eslint-disable-next-line react/prop-types
const DesktopSubNav = ({ label, href, icon }) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            px={3}
            bg={'rgb(249, 249, 249)'}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Flex gap={2} align={'center'}>
                    {icon}
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={600}
                        color={'#7D7D7D'}
                    >
                        {label}
                    </Text>
                </Flex>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    )
}

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

// eslint-disable-next-line react/prop-types
const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={0} onClick={children && onToggle}>
            <Flex
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    pl={1}
                    align={'start'}
                    color={'#7D7D7D'}
                    borderRadius={'10px'}
                    px={2}
                >
                    {children &&
                        children.map((child) => (
                            <Box w={'full'} as="a" bg={'rgb(249, 249, 249)'} key={child.label} py={2} href={child.href} _hover={{ bg: 'pink.50', color: 'pink.400'}}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

const NAV_ITEMS = [
    {
        label: 'Trade',
        children: [
            {
                label: 'Swap',
                icon: <Box transform="rotate(90deg)" _groupHover={{ color: 'pink.400' }} >
                    <MdOutlineSwapCalls fontSize={'18px'}/>
                </Box>,
                href: '#',
            },
            {
                label: 'Limit',
                icon: <Box _groupHover={{ color: 'pink.400' }} >
                    <MdOutlineBarChart fontSize={'18px'}/>
                </Box>,
                href: '#',
            },
            {
                label: 'Send',
                icon: <Box _groupHover={{ color: 'pink.400' }} >
                    <FaPaperPlane fontSize={'18px'} />
                </Box>,
                href: '#',
            },
            {
                label: 'Buy',
                icon: <Box _groupHover={{ color: 'pink.400' }} >
                    <FaCreditCard fontSize={'18px'} />
                </Box>,
                href: '#',
            },
        ],
    },
    {
        label: 'Explore',
        children: [
            {
                label: 'Tokens',
                href: '#',
            },
            {
                label: 'Pools',
                href: '#',
            },
            {
                label: 'Transactions',
                href: '#',
            },
        ],
    },
    {
        label: 'Pool',
        children: [
            {
                label: 'View positions',
                href: '#',
            },
            {
                label: 'Create positions',
                href: '#',
            },
        ],
    },
]