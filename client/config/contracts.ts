 import goerliAddresses from "./deployedContract/goerli.json";
//  import etherAddresses from "./deployedContract/Ethereum.json";

export const contractAddresses: PUMPMEContractList[] = [
    {
        chainId: 5,
        pool: goerliAddresses["contractFakeUSDT"],
        Contract1: goerliAddresses["contract721Address"],
    },
    // {
    //     chainId: 1,
    //     pool: etherAddresses["contractName"],
    //     Contract1: ether["contractName"],
    //     Contract2: etherAddresses["contractName"],
    //     owner: etherAddresses["contractName"],
    // }
]