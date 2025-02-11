import {Button, Flex, IconButton, Input, Text} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {IoSwapVertical} from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const LimitPriceSection = ({  onOpen, initialWorthValue, worthValue = 0, handleWorthValue, tokenSell, tokenBuy, setActiveSection, handleSwapState }) => {
    // Tạo danh sách giá trị dựa trên giá trị gốc ban đầu
    const listWorthValue = [
        { name: 'Market', value: initialWorthValue },
        { name: '+1%', value: initialWorthValue * 1.01 },
        { name: '+5%', value: initialWorthValue * 1.05 },
        { name: '+10%', value: initialWorthValue * 1.1 },
    ];

    const handleWorthValueChange = (value) => {
        console.log(value);
        handleWorthValue(value);
    };

    return (
        <Flex
            flexDir={"column"}
            align={"flex-start"}
            p={4}
            pb={6}
            borderRadius="15px"
            mb={2}
            bg={'#F9F9F9'}
            gap={1}
        >
            <Flex align={'center'} justify={"space-between"} w={'full'}>
                {tokenSell && tokenBuy ?
                    (
                        <Flex gap={2} fontWeight="600" fontSize={'13px'} color="#7D7D7D">
                            When 1 <Text  fontSize={'14px'} color={'black'}>{tokenSell.symbol}</Text> is worth
                        </Flex>
                    ) : (
                        <Text fontWeight="600" fontSize={'13px'} color="#7D7D7D">Limit price</Text>
                    )
                }
                <Flex>
                    <IconButton
                        size={'xs'}
                        aria-label='Swap'
                        bg={'transparent'}
                        color={'#7D7D7D'}
                        isDisabled={!tokenSell || !tokenBuy}
                        icon={<IoSwapVertical fontSize={'17px'}/>}
                        onClick={handleSwapState}
                        _hover={{ bg: 'transparent' }}
                    />
                </Flex>
            </Flex>



            <Flex justifyContent="space-between">
                <Input
                    variant="unstyled"
                    placeholder="0"
                    fontSize="36px"
                    color={worthValue === 0 ? '#7D7D7D' : 'black'}
                    isReadOnly
                    type="number"
                    value={tokenSell && tokenBuy ? worthValue : 0}
                    onChange={(e) => handleWorthValue(e.target.value)}
                />
                <Flex
                    alignItems="center"
                    onClick={() => {
                        setActiveSection("Buy");
                        onOpen();
                    }}
                >
                    {tokenBuy &&
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
                    }
                </Flex>
            </Flex>

           <Flex gap={2} w={'full'}>
               {
                   listWorthValue.map((worth, index) => (
                       <Button
                           key={index}
                           size={'sm'}
                           color={worth.value === worthValue ? 'rgb(34, 34, 34)' : '#7D7D7D'}
                           bg={worth.value === worthValue ? 'rgb(34 34 34 / 7%)' : 'transparent'}
                           borderRadius={'full'}
                           py={'0'}
                           _hover={{ border: '1px solid rgba(34, 34, 34, 0.07)', color: '#6B6B6B' }}
                           _active={{ border: '1px solid rgba(34, 34, 34, 0.07)', color: '#6B6B6B' }}
                           border={worth.value === worthValue ? '1px solid rgba(34, 34, 34, 0.07)' :'1px solid rgb(242, 242, 242)'}
                           onClick={() => handleWorthValueChange(worth.value)}
                           isDisabled={!tokenSell || !tokenBuy}
                       >
                           {worth.name}
                       </Button>
                   ))
               }
           </Flex>
        </Flex>
    )
}
export default LimitPriceSection