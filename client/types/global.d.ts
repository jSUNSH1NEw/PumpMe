declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NFTSTORAGE: string;
        ENV: "test" | "dev" | "prod";
      }
    }
  }
  
  interface Window {
    BlockpassKYCConnect: unknow;
    ethereum: unknow;
  }
  
  type PUMPMEContractList = {
    chainId: number;
    pool: string;
    Contract1: string;
    Contract2: string;
    stable?: string;
  };

  type NFT = {
    id: number;
    name: string;
    description: string;
    price: number;
};
  
  type Chain = {
    chainId: number;
    dispatchERC20Contract: string;
    name: string;
    allowed: boolean;
    tokens: Token[];
    defaultProvider?: string;
  };
  
  type Token = {
    symbol: string;
    name: string;
    decimals: number;
    address?: string;
    logoURI?: string;
    InoCurrency?: boolean;
    wrappedAddress?: string;
  };


type PropsRef = {
    address: string | any,
    code: string | string[]
    nftNum: string | string[] | [""]
    date: string | number | number[] | [""]
};

interface IRefData {
    id: string
    address: string | any,
    code: string | string[] | [""] | any,
    nftNum: string | string[] | [""],
    date: number | number[] | [""]
  };