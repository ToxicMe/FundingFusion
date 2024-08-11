import { ethers } from "hardhat";

async function main() {
  const fundFusion = await ethers.deployContract("FundFusion");

  await fundFusion.waitForDeployment();

  console.log("FundFusion deployed at address  " + (await fundFusion.getAddress()));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
