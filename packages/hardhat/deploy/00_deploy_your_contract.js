const { ethers } = require("hardhat");

const localChainId = "31337";

const delay = ms => new Promise(res => setTimeout(res, ms));


module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("NFTSVG", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 5,
  });

  const NFTSVG = await ethers.getContract("NFTSVG", deployer);

  await deploy("HabitNFT", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 5,
    libraries: {
      NFTSVG: NFTSVG.address,
    },
  });

  const HabitNFT = await ethers.getContract("HabitNFT", deployer);

  await deploy("Habit", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 5,
    libraries: {
      HabitNFT: HabitNFT.address,
    },
  });

  const HabitContract = await ethers.getContract("Habit", deployer);

  await deploy("HabitManager", {
    from: deployer,
    args: [HabitContract.address],
    log: true,
    waitConfirmations: 5,
    libraries: {
      HabitNFT: HabitNFT.address,
    },
  });

  const HabitManagerContract = await ethers.getContract("HabitManager", deployer);

  await HabitContract.transferOwnership(HabitManagerContract.address);

  await delay(50000);

  try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: HabitContract.address,
        contract: "contracts/Habit.sol:Habit",
        constructorArguments: [],
      });

      await run("verify:verify", {
        address: HabitManagerContract.address,
        contract: "contracts/HabitManager.sol:HabitManager",
        constructorArguments: [HabitContract.address],
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.tags = ["Habit"];
