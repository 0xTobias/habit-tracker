const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("BetContract", () => {

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("ALL", () => {
      it("withdraws", async () => {
        const [owner] = await ethers.getSigners();

        const BetContract = await ethers.getContractFactory("BetContract");
        betContract = await BetContract.deploy();

        await betContract.depositViaCall({value: ethers.utils.parseEther("1")});
        const balanceAfterDeposit = await ethers.provider.getBalance(betContract.address);
        const accountbalanceAfterDeposit = await ethers.provider.getBalance(owner.address);
        const balanceOF1 = await betContract.balanceOf(owner.address);


        await betContract.withdrawETH(ethers.utils.parseEther("1"));
        const balanceOF = await betContract.balanceOf(owner.address);
        const balanceAfterWithdraw = await ethers.provider.getBalance(betContract.address);
        const accountbalanceAfterWithdraw = await ethers.provider.getBalance(owner.address);

        console.log(balanceOF1.toString());
        console.log(balanceOF.toString());

        console.log(balanceAfterDeposit.toString())
        console.log(balanceAfterWithdraw.toString())


        console.log(accountbalanceAfterDeposit.toString())
        console.log(accountbalanceAfterWithdraw.toString())



      })
  })

});
