export const NFT_POSITION_MANAGER_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "_factory", "type": "address"}, {
            "internalType": "address",
            "name": "_WETH9",
            "type": "address"
        }, {"internalType": "address", "name": "_tokenDescriptor_", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        }, {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {"indexed": false, "internalType": "bool", "name": "approved", "type": "bool"}],
        "name": "ApprovalForAll",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {"indexed": false, "internalType": "address", "name": "recipient", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256"}],
        "name": "Collect",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint128", "name": "liquidity", "type": "uint128"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256"}],
        "name": "DecreaseLiquidity",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint128", "name": "liquidity", "type": "uint128"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256"}],
        "name": "IncreaseLiquidity",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "WETH9",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "baseURI",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "pure",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "burn",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }, {"internalType": "address", "name": "recipient", "type": "address"}, {
                "internalType": "uint128",
                "name": "amount0Max",
                "type": "uint128"
            }, {"internalType": "uint128", "name": "amount1Max", "type": "uint128"}],
            "internalType": "struct INonfungiblePositionManager.CollectParams",
            "name": "params",
            "type": "tuple"
        }],
        "name": "collect",
        "outputs": [{"internalType": "uint256", "name": "amount0", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token0", "type": "address"}, {
            "internalType": "address",
            "name": "token1",
            "type": "address"
        }, {"internalType": "uint24", "name": "fee", "type": "uint24"}, {
            "internalType": "uint160",
            "name": "sqrtPriceX96",
            "type": "uint160"
        }],
        "name": "createAndInitializePoolIfNecessary",
        "outputs": [{"internalType": "address", "name": "pool", "type": "address"}],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }, {"internalType": "uint128", "name": "liquidity", "type": "uint128"}, {
                "internalType": "uint256",
                "name": "amount0Min",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amount1Min", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }],
            "internalType": "struct INonfungiblePositionManager.DecreaseLiquidityParams",
            "name": "params",
            "type": "tuple"
        }],
        "name": "decreaseLiquidity",
        "outputs": [{"internalType": "uint256", "name": "amount0", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "factory",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "getApproved",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amount0Desired", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amount1Desired",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amount0Min", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amount1Min",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "deadline", "type": "uint256"}],
            "internalType": "struct INonfungiblePositionManager.IncreaseLiquidityParams",
            "name": "params",
            "type": "tuple"
        }],
        "name": "increaseLiquidity",
        "outputs": [{"internalType": "uint128", "name": "liquidity", "type": "uint128"}, {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "amount1", "type": "uint256"}],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }],
        "name": "isApprovedForAll",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "token0",
                "type": "address"
            }, {"internalType": "address", "name": "token1", "type": "address"}, {
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            }, {"internalType": "int24", "name": "tickLower", "type": "int24"}, {
                "internalType": "int24",
                "name": "tickUpper",
                "type": "int24"
            }, {"internalType": "uint256", "name": "amount0Desired", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amount1Desired",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amount0Min", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amount1Min",
                "type": "uint256"
            }, {"internalType": "address", "name": "recipient", "type": "address"}, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }], "internalType": "struct INonfungiblePositionManager.MintParams", "name": "params", "type": "tuple"
        }],
        "name": "mint",
        "outputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}, {
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
        }, {"internalType": "uint256", "name": "amount0", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "bytes[]", "name": "data", "type": "bytes[]"}],
        "name": "multicall",
        "outputs": [{"internalType": "bytes[]", "name": "results", "type": "bytes[]"}],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "ownerOf",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "deadline", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "permit", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "positions",
        "outputs": [{"internalType": "uint96", "name": "nonce", "type": "uint96"}, {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {"internalType": "address", "name": "token0", "type": "address"}, {
            "internalType": "address",
            "name": "token1",
            "type": "address"
        }, {"internalType": "uint24", "name": "fee", "type": "uint24"}, {
            "internalType": "int24",
            "name": "tickLower",
            "type": "int24"
        }, {"internalType": "int24", "name": "tickUpper", "type": "int24"}, {
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
        }, {
            "internalType": "uint256",
            "name": "feeGrowthInside0LastX128",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "feeGrowthInside1LastX128",
            "type": "uint256"
        }, {"internalType": "uint128", "name": "tokensOwed0", "type": "uint128"}, {
            "internalType": "uint128",
            "name": "tokensOwed1",
            "type": "uint128"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "refundETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}, {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
        }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "deadline", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "selfPermit", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "expiry", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "selfPermitAllowed", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "expiry", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "selfPermitAllowedIfNecessary", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "deadline", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "selfPermitIfNecessary", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "operator", "type": "address"}, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{"internalType": "bytes4", "name": "interfaceId", "type": "bytes4"}],
        "name": "supportsInterface",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "amountMinimum",
            "type": "uint256"
        }, {"internalType": "address", "name": "recipient", "type": "address"}],
        "name": "sweepToken",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
        "name": "tokenByIndex",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
        }],
        "name": "tokenOfOwnerByIndex",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "tokenURI",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "amount0Owed", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "amount1Owed",
            "type": "uint256"
        }, {"internalType": "bytes", "name": "data", "type": "bytes"}],
        "name": "uniswapV3MintCallback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "amountMinimum", "type": "uint256"}, {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }], "name": "unwrapWETH9", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {"stateMutability": "payable", "type": "receive"}
]

export const SWAP_ROUTER_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "_factory", "type": "address"}, {
            "internalType": "address",
            "name": "_WETH9",
            "type": "address"
        }], "stateMutability": "nonpayable", "type": "constructor"
    }, {
        "inputs": [],
        "name": "WETH9",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "bytes",
                "name": "path",
                "type": "bytes"
            }, {"internalType": "address", "name": "recipient", "type": "address"}, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amountIn", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amountOutMinimum",
                "type": "uint256"
            }], "internalType": "struct ISwapRouter.ExactInputParams", "name": "params", "type": "tuple"
        }],
        "name": "exactInput",
        "outputs": [{"internalType": "uint256", "name": "amountOut", "type": "uint256"}],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            }, {"internalType": "address", "name": "tokenOut", "type": "address"}, {
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            }, {"internalType": "address", "name": "recipient", "type": "address"}, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amountIn", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amountOutMinimum",
                "type": "uint256"
            }, {"internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160"}],
            "internalType": "struct ISwapRouter.ExactInputSingleParams",
            "name": "params",
            "type": "tuple"
        }],
        "name": "exactInputSingle",
        "outputs": [{"internalType": "uint256", "name": "amountOut", "type": "uint256"}],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "bytes",
                "name": "path",
                "type": "bytes"
            }, {"internalType": "address", "name": "recipient", "type": "address"}, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amountOut", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amountInMaximum",
                "type": "uint256"
            }], "internalType": "struct ISwapRouter.ExactOutputParams", "name": "params", "type": "tuple"
        }],
        "name": "exactOutput",
        "outputs": [{"internalType": "uint256", "name": "amountIn", "type": "uint256"}],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            }, {"internalType": "address", "name": "tokenOut", "type": "address"}, {
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            }, {"internalType": "address", "name": "recipient", "type": "address"}, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amountOut", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amountInMaximum",
                "type": "uint256"
            }, {"internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160"}],
            "internalType": "struct ISwapRouter.ExactOutputSingleParams",
            "name": "params",
            "type": "tuple"
        }],
        "name": "exactOutputSingle",
        "outputs": [{"internalType": "uint256", "name": "amountIn", "type": "uint256"}],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "factory",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "bytes[]", "name": "data", "type": "bytes[]"}],
        "name": "multicall",
        "outputs": [{"internalType": "bytes[]", "name": "results", "type": "bytes[]"}],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "refundETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "deadline", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "selfPermit", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "expiry", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "selfPermitAllowed", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "expiry", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "selfPermitAllowedIfNecessary", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "deadline", "type": "uint256"}, {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }], "name": "selfPermitIfNecessary", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "amountMinimum",
            "type": "uint256"
        }, {"internalType": "address", "name": "recipient", "type": "address"}],
        "name": "sweepToken",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "token", "type": "address"}, {
            "internalType": "uint256",
            "name": "amountMinimum",
            "type": "uint256"
        }, {"internalType": "address", "name": "recipient", "type": "address"}, {
            "internalType": "uint256",
            "name": "feeBips",
            "type": "uint256"
        }, {"internalType": "address", "name": "feeRecipient", "type": "address"}],
        "name": "sweepTokenWithFee",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "int256", "name": "amount0Delta", "type": "int256"}, {
            "internalType": "int256",
            "name": "amount1Delta",
            "type": "int256"
        }, {"internalType": "bytes", "name": "_data", "type": "bytes"}],
        "name": "uniswapV3SwapCallback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "amountMinimum", "type": "uint256"}, {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }], "name": "unwrapWETH9", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "amountMinimum", "type": "uint256"}, {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }, {"internalType": "uint256", "name": "feeBips", "type": "uint256"}, {
            "internalType": "address",
            "name": "feeRecipient",
            "type": "address"
        }], "name": "unwrapWETH9WithFee", "outputs": [], "stateMutability": "payable", "type": "function"
    }, {"stateMutability": "payable", "type": "receive"}
]

export const FACTORY_ABI = [
    {"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "uint24", "name": "fee", "type": "uint24"}, {
            "indexed": true,
            "internalType": "int24",
            "name": "tickSpacing",
            "type": "int24"
        }],
        "name": "FeeAmountEnabled",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "oldOwner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }],
        "name": "OwnerChanged",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "token0", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "token1",
            "type": "address"
        }, {"indexed": true, "internalType": "uint24", "name": "fee", "type": "uint24"}, {
            "indexed": false,
            "internalType": "int24",
            "name": "tickSpacing",
            "type": "int24"
        }, {"indexed": false, "internalType": "address", "name": "pool", "type": "address"}],
        "name": "PoolCreated",
        "type": "event"
    }, {
        "inputs": [{"internalType": "address", "name": "tokenA", "type": "address"}, {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
        }, {"internalType": "uint24", "name": "fee", "type": "uint24"}],
        "name": "createPool",
        "outputs": [{"internalType": "address", "name": "pool", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint24", "name": "fee", "type": "uint24"}, {
            "internalType": "int24",
            "name": "tickSpacing",
            "type": "int24"
        }], "name": "enableFeeAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{"internalType": "uint24", "name": "", "type": "uint24"}],
        "name": "feeAmountTickSpacing",
        "outputs": [{"internalType": "int24", "name": "", "type": "int24"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {"internalType": "uint24", "name": "", "type": "uint24"}],
        "name": "getPool",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "parameters",
        "outputs": [{"internalType": "address", "name": "factory", "type": "address"}, {
            "internalType": "address",
            "name": "token0",
            "type": "address"
        }, {"internalType": "address", "name": "token1", "type": "address"}, {
            "internalType": "uint24",
            "name": "fee",
            "type": "uint24"
        }, {"internalType": "int24", "name": "tickSpacing", "type": "int24"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}],
        "name": "setOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const POOL_DEPLOYER_ABI = [
    {
        "inputs": [],
        "name": "parameters",
        "outputs": [{"internalType": "address", "name": "factory", "type": "address"}, {
            "internalType": "address",
            "name": "token0",
            "type": "address"
        }, {"internalType": "address", "name": "token1", "type": "address"}, {
            "internalType": "uint24",
            "name": "fee",
            "type": "uint24"
        }, {"internalType": "int24", "name": "tickSpacing", "type": "int24"}],
        "stateMutability": "view",
        "type": "function"
    }
]

export const POOL_ABI = [
    'function initialize(uint160 sqrtPriceX96) external',
    'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)'
];

export const QUOTER_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "_factory", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "inputs": [],
        "name": "factory",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "bytes", "name": "path", "type": "bytes"}, {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        }],
        "name": "quoteExactInput",
        "outputs": [{"internalType": "uint256", "name": "amountOut", "type": "uint256"}, {
            "internalType": "uint160[]",
            "name": "sqrtPriceX96AfterList",
            "type": "uint160[]"
        }, {
            "internalType": "uint32[]",
            "name": "initializedTicksCrossedList",
            "type": "uint32[]"
        }, {"internalType": "uint256", "name": "gasEstimate", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            }, {"internalType": "address", "name": "tokenOut", "type": "address"}, {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }, {"internalType": "uint24", "name": "fee", "type": "uint24"}, {
                "internalType": "uint160",
                "name": "sqrtPriceLimitX96",
                "type": "uint160"
            }], "internalType": "struct IQuoter.QuoteExactInputSingleParams", "name": "params", "type": "tuple"
        }],
        "name": "quoteExactInputSingle",
        "outputs": [{
            "internalType": "uint256",
            "name": "amountReceived",
            "type": "uint256"
        }, {"internalType": "uint160", "name": "sqrtPriceX96After", "type": "uint160"}, {
            "internalType": "uint32",
            "name": "initializedTicksCrossed",
            "type": "uint32"
        }, {"internalType": "uint256", "name": "gasEstimate", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            }, {"internalType": "address", "name": "tokenOut", "type": "address"}, {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }, {"internalType": "address", "name": "pool", "type": "address"}, {
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            }, {"internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160"}],
            "internalType": "struct IQuoter.QuoteExactInputSingleWithPoolParams",
            "name": "params",
            "type": "tuple"
        }],
        "name": "quoteExactInputSingleWithPool",
        "outputs": [{
            "internalType": "uint256",
            "name": "amountReceived",
            "type": "uint256"
        }, {"internalType": "uint160", "name": "sqrtPriceX96After", "type": "uint160"}, {
            "internalType": "uint32",
            "name": "initializedTicksCrossed",
            "type": "uint32"
        }, {"internalType": "uint256", "name": "gasEstimate", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "bytes", "name": "path", "type": "bytes"}, {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        }],
        "name": "quoteExactOutput",
        "outputs": [{"internalType": "uint256", "name": "amountIn", "type": "uint256"}, {
            "internalType": "uint160[]",
            "name": "sqrtPriceX96AfterList",
            "type": "uint160[]"
        }, {
            "internalType": "uint32[]",
            "name": "initializedTicksCrossedList",
            "type": "uint32[]"
        }, {"internalType": "uint256", "name": "gasEstimate", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            }, {"internalType": "address", "name": "tokenOut", "type": "address"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }, {"internalType": "uint24", "name": "fee", "type": "uint24"}, {
                "internalType": "uint160",
                "name": "sqrtPriceLimitX96",
                "type": "uint160"
            }], "internalType": "struct IQuoter.QuoteExactOutputSingleParams", "name": "params", "type": "tuple"
        }],
        "name": "quoteExactOutputSingle",
        "outputs": [{"internalType": "uint256", "name": "amountIn", "type": "uint256"}, {
            "internalType": "uint160",
            "name": "sqrtPriceX96After",
            "type": "uint160"
        }, {"internalType": "uint32", "name": "initializedTicksCrossed", "type": "uint32"}, {
            "internalType": "uint256",
            "name": "gasEstimate",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            }, {"internalType": "address", "name": "tokenOut", "type": "address"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }, {"internalType": "uint24", "name": "fee", "type": "uint24"}, {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            }, {"internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160"}],
            "internalType": "struct IQuoter.QuoteExactOutputSingleWithPoolParams",
            "name": "params",
            "type": "tuple"
        }],
        "name": "quoteExactOutputSingleWithPool",
        "outputs": [{"internalType": "uint256", "name": "amountIn", "type": "uint256"}, {
            "internalType": "uint160",
            "name": "sqrtPriceX96After",
            "type": "uint160"
        }, {"internalType": "uint32", "name": "initializedTicksCrossed", "type": "uint32"}, {
            "internalType": "uint256",
            "name": "gasEstimate",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }
]

export const MULTICAL_ABI = [
    {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "target",
                "type": "address"
            }, {"internalType": "bytes", "name": "callData", "type": "bytes"}],
            "internalType": "struct Multicall2.Call[]",
            "name": "calls",
            "type": "tuple[]"
        }],
        "name": "aggregate",
        "outputs": [{"internalType": "uint256", "name": "blockNumber", "type": "uint256"}, {
            "internalType": "bytes[]",
            "name": "returnData",
            "type": "bytes[]"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "components": [{
                "internalType": "address",
                "name": "target",
                "type": "address"
            }, {"internalType": "bytes", "name": "callData", "type": "bytes"}],
            "internalType": "struct Multicall2.Call[]",
            "name": "calls",
            "type": "tuple[]"
        }],
        "name": "blockAndAggregate",
        "outputs": [{"internalType": "uint256", "name": "blockNumber", "type": "uint256"}, {
            "internalType": "bytes32",
            "name": "blockHash",
            "type": "bytes32"
        }, {
            "components": [{"internalType": "bool", "name": "success", "type": "bool"}, {
                "internalType": "bytes",
                "name": "returnData",
                "type": "bytes"
            }], "internalType": "struct Multicall2.Result[]", "name": "returnData", "type": "tuple[]"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "blockNumber", "type": "uint256"}],
        "name": "getBlockHash",
        "outputs": [{"internalType": "bytes32", "name": "blockHash", "type": "bytes32"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getBlockNumber",
        "outputs": [{"internalType": "uint256", "name": "blockNumber", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getCurrentBlockCoinbase",
        "outputs": [{"internalType": "address", "name": "coinbase", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getCurrentBlockDifficulty",
        "outputs": [{"internalType": "uint256", "name": "difficulty", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getCurrentBlockGasLimit",
        "outputs": [{"internalType": "uint256", "name": "gaslimit", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getCurrentBlockTimestamp",
        "outputs": [{"internalType": "uint256", "name": "timestamp", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "addr", "type": "address"}],
        "name": "getEthBalance",
        "outputs": [{"internalType": "uint256", "name": "balance", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getLastBlockHash",
        "outputs": [{"internalType": "bytes32", "name": "blockHash", "type": "bytes32"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "bool",
            "name": "requireSuccess",
            "type": "bool"
        }, {
            "components": [{"internalType": "address", "name": "target", "type": "address"}, {
                "internalType": "bytes",
                "name": "callData",
                "type": "bytes"
            }], "internalType": "struct Multicall2.Call[]", "name": "calls", "type": "tuple[]"
        }],
        "name": "tryAggregate",
        "outputs": [{
            "components": [{
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }, {"internalType": "bytes", "name": "returnData", "type": "bytes"}],
            "internalType": "struct Multicall2.Result[]",
            "name": "returnData",
            "type": "tuple[]"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "bool",
            "name": "requireSuccess",
            "type": "bool"
        }, {
            "components": [{"internalType": "address", "name": "target", "type": "address"}, {
                "internalType": "bytes",
                "name": "callData",
                "type": "bytes"
            }], "internalType": "struct Multicall2.Call[]", "name": "calls", "type": "tuple[]"
        }],
        "name": "tryBlockAndAggregate",
        "outputs": [{"internalType": "uint256", "name": "blockNumber", "type": "uint256"}, {
            "internalType": "bytes32",
            "name": "blockHash",
            "type": "bytes32"
        }, {
            "components": [{"internalType": "bool", "name": "success", "type": "bool"}, {
                "internalType": "bytes",
                "name": "returnData",
                "type": "bytes"
            }], "internalType": "struct Multicall2.Result[]", "name": "returnData", "type": "tuple[]"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const WETH9 = [
    {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "src", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "guy",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "dst", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Deposit",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "src", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "dst",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "src", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Withdrawal",
        "type": "event"
    }, {"stateMutability": "payable", "type": "fallback"}, {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {"internalType": "address", "name": "", "type": "address"}],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "guy", "type": "address"}, {
            "internalType": "uint256",
            "name": "wad",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }, {"inputs": [], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function"}, {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "dst", "type": "address"}, {
            "internalType": "uint256",
            "name": "wad",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "src", "type": "address"}, {
            "internalType": "address",
            "name": "dst",
            "type": "address"
        }, {"internalType": "uint256", "name": "wad", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "wad", "type": "uint256"}],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {"stateMutability": "payable", "type": "receive"}
]

export const NFT_DESCRIPTION_ABI = [
    {
        "inputs": [{
            "components": [{
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }, {"internalType": "address", "name": "quoteTokenAddress", "type": "address"}, {
                "internalType": "address",
                "name": "baseTokenAddress",
                "type": "address"
            }, {"internalType": "string", "name": "quoteTokenSymbol", "type": "string"}, {
                "internalType": "string",
                "name": "baseTokenSymbol",
                "type": "string"
            }, {"internalType": "uint8", "name": "quoteTokenDecimals", "type": "uint8"}, {
                "internalType": "uint8",
                "name": "baseTokenDecimals",
                "type": "uint8"
            }, {"internalType": "bool", "name": "flipRatio", "type": "bool"}, {
                "internalType": "int24",
                "name": "tickLower",
                "type": "int24"
            }, {"internalType": "int24", "name": "tickUpper", "type": "int24"}, {
                "internalType": "int24",
                "name": "tickCurrent",
                "type": "int24"
            }, {"internalType": "int24", "name": "tickSpacing", "type": "int24"}, {
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            }, {"internalType": "address", "name": "poolAddress", "type": "address"}],
            "internalType": "struct NFTDescriptor.ConstructTokenURIParams",
            "name": "params",
            "type": "tuple"
        }],
        "name": "constructTokenURI",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "pure",
        "type": "function"
    }
]