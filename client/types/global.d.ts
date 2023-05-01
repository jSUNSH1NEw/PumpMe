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
    lottery: string;
    lotteryFactory: string;
    stable?: string;
    owner?:"string"
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

