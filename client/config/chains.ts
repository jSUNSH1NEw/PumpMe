import { contractAddresses } from "./contracts";

export const chains: Chain[] = [
    {
        chainId: 1,
        name: "Polygon",
        allowed: true,
        dispatchERC20Contract: "",
        tokens: [
            {
                symbol: "USDT",
                name: "Tether USD",
                address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                decimals: 6,
                logoURI:
                    "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
                InoCurrency: true,
            },
        ],
    },
    {
        chainId: 80001,
        name: "Mumbai",
        allowed: true,
        dispatchERC20Contract: "",
        tokens: [
            {
                symbol: "PUMP-ME USD",
                name: "PUMP- USD",
                decimals: 6,
                address: contractAddresses.find((data) => data.chainId === 5)
                    ?.stable as string,
                logoURI:
                    "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
                InoCurrency: true,
            },
        ],
    },
];