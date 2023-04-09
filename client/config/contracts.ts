 import goerliAddresses from "./deployedContract/Goerli.json";
 import etherAddresses from "./deployedContract/Ethereum.json";

export const contractAddresses: PUMPMEContractList[] = [
    {
        chainId: 1,
        pool: goerliAddresses["contractName"],
        Contract1: goerliAddresses["contractName"],
        Contract2: goerliAddresses["contractName"]
    },
    {
        chainId: 5,
        pool: etherAddresses["contractName"],
        Contract1: goerliAddresses["contractName"],
        Contract2: goerliAddresses["contractName"],
        stable: etherAddresses["contractName"],
    }
]