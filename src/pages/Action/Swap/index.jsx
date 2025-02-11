import {
    Box,
    Button,
    Flex,
    Input,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import TokenModal from "~/pages/Action/components/TokenModal.jsx";
import SwapSetting from "~/pages/Action/components/SwapSetting.jsx";
import SwapComponent from "~/pages/Action/components/SwapComponent.jsx";

const Swap = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tokenSell, setTokenSell] = useState({symbol: "TKA", name: "Token A", address: "0xd059C192841cF5dFa40b11c831Aa2A33A18990f8"});
    const [tokenBuy, setTokenBuy] = useState(null);

    // State to track which section (Sell/Buy) triggered the TokenModal
    const [activeSection, setActiveSection] = useState("");

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
        <Flex flexDir={"column"} bg="white" gap={0}>
            <Flex align={'center'} position={'absolute'} right={0} top={'-0px'}>
                <SwapSetting />
            </Flex>

            {/* Swap Section */}
            <SwapComponent  isOpen={isOpen} onOpen={onOpen} onClose={onClose}
                            tokenSell={tokenSell} tokenBuy={tokenBuy} activeSction={activeSection}
                            setActiveSection={setActiveSection} handleSwapState={handleSwapState}
                            handleTokenSelect={handleTokenSelect}
            />
        </Flex>
    );
};

export default Swap;