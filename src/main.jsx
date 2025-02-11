import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider} from "@chakra-ui/react";
import '@rainbow-me/rainbowkit/styles.css';
import {
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {WagmiProvider} from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import {rainBowConfig} from "./config/rainbow.js";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <WagmiProvider config={rainBowConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <ChakraProvider>
                        <App/>
                    </ChakraProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </StrictMode>,
)
