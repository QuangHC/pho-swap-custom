import { ConnectButton } from "@rainbow-me/rainbowkit";
import {Button, Box, Image, Flex} from "@chakra-ui/react";
import AccountIcon from "~/components/AccountIcon.jsx";

// eslint-disable-next-line react/prop-types
const ButtonConnectCustom = ({ size = "lg", borderRadius = "15px", w = "full" }) => {

    return (
        <ConnectButton.Custom>
            {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;
                console.log(account)
                return (
                    <Box {...(!ready && { opacity: 0, pointerEvents: "none", userSelect: "none" })}>
                        {!connected ? (
                            <Button
                                size={size}
                                bg="#FEEBFC"
                                color="rgb(252, 114, 255)"
                                borderRadius={borderRadius}
                                w={w}
                                _hover={{ bg: "#fc72ff33" }}
                                onClick={openConnectModal}
                            >
                                Connect Wallet
                            </Button>
                        ) : chain.unsupported ? (
                            <Button
                                size={size}
                                bg="red.500"
                                color="white"
                                borderRadius={borderRadius}
                                w={w}
                                _hover={{ bg: "red.400" }}
                                onClick={openChainModal}
                            >
                                Wrong network
                            </Button>
                        ) : (
                            <Flex borderRadius={borderRadius}
                                  align={'center'}
                                  border={'1px solid rgb(249, 249, 249)'}
                                  _hover={{bg: "rgb(249, 249, 249)"}}>
                                <AccountIcon />
                                <Button
                                    size={size}
                                    bg="transparent"
                                    color="black"
                                    onClick={openAccountModal}
                                    _hover={{ bg: 'transparent'}}
                                >
                                    {account.displayName}
                                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                                </Button>
                            </Flex>
                        )}
                    </Box>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default ButtonConnectCustom;
