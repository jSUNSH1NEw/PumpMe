import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"
import "@typechain/hardhat"

const ALCHEMY_MAINNET = process.env.ALCHEMY_MAINNET || "";
const GOERLI_RPC_URL = process.env.INFURA_GOERLI || "";
const PRIVATE_KEY_TEST = process.env.PRIVATE_KEY_TEST || "";
const ETHERSCAN = process.env.ETHERSCAN || "";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_MAINNET,
        blockNumber: 16868300
      }
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY_TEST],
      chainId: 5
    }
  },
  etherscan: {
    apiKey: ETHERSCAN
  },
  gasReporter: {
    enabled: true, 
    currency: "USD"
  },
  mocha: {
    timeout: 10000000000
  },
};

export default config;
