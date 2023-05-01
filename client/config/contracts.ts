 import goerliAddresses from "./deployedContract/goerli.json";
//  import etherAddresses from "./deployedContract/Ethereum.json";

export const contractAddresses: PUMPMEContractList[] = [
    {
        chainId: 5,
        lottery: goerliAddresses["lottery"],
        lotteryFactory: goerliAddresses["lotteryFactory"],
    },
    // {
    //     chainId: 1,
    //     pool: etherAddresses["contractName"],
    //     Contract1: ether["contractName"],
    //     Contract2: etherAddresses["contractName"],
    //     owner: etherAddresses["contractName"],
    // }
]