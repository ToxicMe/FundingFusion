import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const CELOSCAN_API_KEY = process.env.CELOSCAN_API_KEY as string;

if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set");
}

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [PRIVATE_KEY],
    },
    "Cel2-Dango-Testnet": {
      url: "https://forno.dango.celo-testnet.org/",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      alfajores: CELOSCAN_API_KEY,
      celo: CELOSCAN_API_KEY,
      "Cel2-Dango-Testnet":CELOSCAN_API_KEY,
    },
    customChains: [
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },

      {
        network: "Cel2-Dango-Testnet",
        chainId: 44787,
        urls: {
          apiURL: "https://celo-dango.blockscout.com/api",
          browserURL: "https://celo-dango.blockscout.com",
        },
      },
    ],
  },
};

export default config;
