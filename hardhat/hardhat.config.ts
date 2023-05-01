import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"
import "@typechain/hardhat"




import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import "solidity-coverage";
dotenvConfig({ path: resolve(__dirname, "./.env") });

const MNEMONIC = process.env.MNEMONIC || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
   paths: {
        artifacts: "./artifacts",
    },
    solidity: {
        compilers: [
            {
                version: "0.8.9",
            },
        ],
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    goerli: {
      url: process.env.GOERLI_RPC,
      accounts: [MNEMONIC],
      chainId: 5
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
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
