import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import { defineChain } from "viem";

export const PHO = defineChain({
    id: 3106, // Changed from chainId to id
    name: 'Pho Testnet', // Changed from chainName to name
    nativeCurrency: {
        name: 'PHO Token',
        symbol: 'PHO',
        decimals: 18
    },
    rpcUrls: {
        default: { // Proper RPC URL format
            http: ['https://testnet.phochain.org/']
        },
        public: {
            http: ['https://testnet.phochain.org/']
        }
    },
    blockExplorers: { // Changed from blockExplorerUrls
        default: {
            name: 'Pho Scanner',
            url: 'https://testnet.phoscan.org/'
        }
    },
    testnet: true // Add this if it's a testnet
});

export const rainBowConfig = getDefaultConfig({
    appName: 'UniswapV3',
    projectId: '86ce3926493b2c4c9ab2117a5d3f5558',
    chains: [PHO, mainnet],
    ssr: true,
});