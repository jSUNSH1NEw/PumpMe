import { ethers, network } from "hardhat";
import { verify } from "../utils/verify";

async function main() {
  const PumpMeBase = await ethers.getContractFactory("PumpMeBase");
  const pumpMeBase = await PumpMeBase.deploy();
  await pumpMeBase.deployed();
  console.log("Deployed PumpMeBase at address", pumpMeBase.address);

  const Lottery = await ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(pumpMeBase.address);
  await lottery.deployed();
  console.log("Deployed Lottery at address", lottery.address);

  const LotteryFactory = await ethers.getContractFactory("LotteryFactory");
  const factory = await LotteryFactory.deploy(pumpMeBase.address, lottery.address);
  await factory.deployed();
  console.log("Deployed LotteryFactory at address", factory.address);

  if (network.name === "goerli") {
    console.log("Verifying PumpMeBase...");
    await pumpMeBase.deployTransaction.wait(6); // Attendre 6 block après le déploiment
    await verify(pumpMeBase.address, []);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
