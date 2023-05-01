import { expect } from "chai";
import { ethers } from "hardhat";
import {
  PumpMeBase,
  Lottery,
  LotteryFactory,
} from "../typechain-types/contracts";
import { IERC20 } from "../typechain-types/@openzeppelin/contracts/token/ERC20";
import {
  reset,
  mine,
  setBalance,
} from "@nomicfoundation/hardhat-network-helpers";
import "dotenv/config";
import { BigNumber, Wallet } from "ethers";

const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDT_WHALE = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503";
const url = process.env.ALCHEMY_MAINNET;
const blockNumber = 16868300;

function addDays(days: number) {
  return days * 24 * 60 * 60;
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

describe("PumpMeBase", function () {
  let pumpMeBase: PumpMeBase;
  let lottery: Lottery;
  let lotteryFactory: LotteryFactory;
  let usdt: IERC20;

  beforeEach(async function () {
    await reset(url, blockNumber); // Reset the mainnet fork
    [this.owner, this.user1, this.user2, this.user3, this.user4, this.user5] =
      await ethers.getSigners();
    this.whale = await ethers.getImpersonatedSigner(USDT_WHALE);
    const PumpMeBase = await ethers.getContractFactory("PumpMeBase");
    pumpMeBase = await PumpMeBase.deploy();
    const Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy(pumpMeBase.address);
    const LotteryFactory = await ethers.getContractFactory("LotteryFactory");
    lotteryFactory = await LotteryFactory.deploy(
      pumpMeBase.address,
      lottery.address
    );
    usdt = await ethers.getContractAt("IERC20", USDT);
    await pumpMeBase.setLotteryFactory(lotteryFactory.address);
  });

  // describe("Storage", function () {
  //   it("CRUD Storage", async function () {
  //     // Create
  //     const { timestamp } = await ethers.provider.getBlock("latest");
  //     const startingAt = timestamp;
  //     const endingAt = parseInt(
  //       ethers.BigNumber.from(timestamp).add(addDays(7)).toString()
  //     );
  //     const deposit = 10;
  //     const participantLimit = 5;
  //     await pumpMeBase.newLottery(
  //       startingAt,
  //       endingAt,
  //       deposit,
  //       participantLimit
  //     );

  //     // Read
  //     const currentLottery = await pumpMeBase.currentLottery();
  //     const addressLottery = await pumpMeBase.getAddressLottery(currentLottery);

  //     const Lottery = await ethers.getContractFactory("Lottery");
  //     const newLottery = await Lottery.deploy(pumpMeBase.address);

  //     // Update
  //     await pumpMeBase.setAddressLottery(currentLottery, newLottery.address);

  //     const addressLotteryAfterSetting = await pumpMeBase.getAddressLottery(
  //       currentLottery
  //     );
  //     expect(addressLotteryAfterSetting)
  //       .to.equal(newLottery.address)
  //       .not.to.equal(addressLottery);

  //     // Delete
  //     await pumpMeBase.deleteAddressLottery(currentLottery);
  //     const addressLotteryAfterDeleting = await pumpMeBase.getAddressLottery(
  //       currentLottery
  //     );
  //     expect(addressLotteryAfterDeleting).to.equal(
  //       "0x0000000000000000000000000000000000000000"
  //     );
  //   });
  // });

  // describe("USDT", function () {
  //   it("Transfers from whale to participants", async function () {
  //     const amountUSDT = ethers.utils.parseUnits("100", 6); // 100 USDT
  //     let balanceOwnerUSDT = await usdt.balanceOf(this.owner.address);
  //     let balanceUser1USDT = await usdt.balanceOf(this.user1.address);
  //     let balanceUser2USDT = await usdt.balanceOf(this.user2.address);
  //     let balanceUser3USDT = await usdt.balanceOf(this.user3.address);
  //     let balanceUser4USDT = await usdt.balanceOf(this.user4.address);
  //     let balanceUser5USDT = await usdt.balanceOf(this.user5.address);
  //     expect(balanceOwnerUSDT)
  //       .to.equal(balanceUser1USDT)
  //       .to.equal(balanceUser2USDT)
  //       .to.equal(balanceUser3USDT)
  //       .to.equal(balanceUser4USDT)
  //       .to.equal(balanceUser5USDT)
  //       .to.equal(0);
  //     await usdt.connect(this.whale).transfer(this.owner.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user1.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user2.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user3.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user4.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user5.address, amountUSDT);
  //     balanceOwnerUSDT = await usdt.balanceOf(this.owner.address);
  //     balanceUser1USDT = await usdt.balanceOf(this.user1.address);
  //     balanceUser2USDT = await usdt.balanceOf(this.user2.address);
  //     balanceUser3USDT = await usdt.balanceOf(this.user3.address);
  //     balanceUser4USDT = await usdt.balanceOf(this.user4.address);
  //     balanceUser5USDT = await usdt.balanceOf(this.user5.address);
  //     expect(balanceOwnerUSDT)
  //       .to.equal(balanceUser1USDT)
  //       .to.equal(balanceUser2USDT)
  //       .to.equal(balanceUser3USDT)
  //       .to.equal(balanceUser4USDT)
  //       .to.equal(balanceUser5USDT)
  //       .to.equal(amountUSDT);
  //   });
  // });

  // describe("Creations", function () {
  //   let startingAt: number;
  //   let endingAt: number;
  //   let deposit: number;
  //   let participantLimit: number;
  //   let participantLimitPoolUser1: number;
  //   let lotteryData: any;
  //   let currentLottery: BigNumber;
  //   let lotteryCreated: Lottery;
  //   const amountUSDT = ethers.utils.parseUnits("100", 6);

  //   beforeEach(async function () {
  //     // On transfert 100 USDT à chaque participants
  //     await usdt.connect(this.whale).transfer(this.user1.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user2.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user3.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user4.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user5.address, amountUSDT);

  //     // Création d'une lotterie
  //     const { timestamp } = await ethers.provider.getBlock("latest");
  //     startingAt = timestamp;
  //     endingAt = parseInt(
  //       ethers.BigNumber.from(timestamp).add(addDays(7)).toString()
  //     );
  //     deposit = 10;
  //     participantLimit = 5;

  //     await pumpMeBase.newLottery(
  //       startingAt,
  //       endingAt,
  //       deposit,
  //       participantLimit
  //     );
  //     currentLottery = await pumpMeBase.currentLottery();
  //     const addressLottery = await pumpMeBase.getAddressLottery(currentLottery);
  //     lotteryCreated = lottery.attach(addressLottery);
  //     lotteryData = await lotteryCreated.lotteryData();

  //     // Création d'une pool
  //     await pumpMeBase.setState(lotteryCreated.address, 1);
  //     participantLimitPoolUser1 = 1000;
  //     await pumpMeBase
  //       .connect(this.user1)
  //       .createPool(currentLottery, participantLimitPoolUser1);
  //   });

  //   it("Creation Lottery", async function () {
  //     expect(lotteryData.createdAt).to.equal(startingAt);
  //     expect(lotteryData.endingAt).to.equal(endingAt);
  //     expect(lotteryData.deposit).to.equal(deposit);
  //     expect(lotteryData.totalDeposit).to.equal(0);
  //     expect(lotteryData.participantCount).to.equal(0);
  //     expect(lotteryData.participantLimit).to.equal(participantLimit);
  //   });

  //   it("Creation Pool", async function () {
  //     let lastPoolCreated = await lotteryCreated.lastPoolCreated();
  //     let poolData = await lotteryCreated.pools(lastPoolCreated);
  //     expect(poolData.participantCount).to.equal(0);
  //     expect(poolData.participantLimit).to.equal(participantLimitPoolUser1);

  //     // setPossiblePoolLength avec création d'une pool derrière
  //     const participantLimitPoolUser2 = 5000;
  //     await pumpMeBase.setPossiblePoolLength([participantLimitPoolUser2]);
  //     await pumpMeBase
  //       .connect(this.user2)
  //       .createPool(currentLottery, participantLimitPoolUser2);
  //     lastPoolCreated = await lotteryCreated.lastPoolCreated();
  //     poolData = await lotteryCreated.pools(lastPoolCreated);
  //     expect(poolData.participantCount).to.equal(0);
  //     expect(poolData.participantLimit).to.equal(participantLimitPoolUser2);
  //   });

  //   it("REQUIRE: initialize(), already initialized", async function () {
  //     await expect(lotteryCreated.initialize(0, 0, 0, 0)).to.be.revertedWith(
  //       "Initializable: contract is already initialized"
  //     );
  //   });

  //   it("REQUIRE: onlyPumpMeBase(), Only PumpMeBase authorized", async function () {
  //     await expect(lotteryCreated.drawLottery(0)).to.be.revertedWith(
  //       "Only PumpMeBase authorized"
  //     );
  //   });
  // });

  // describe("Lottery", function () {
  //   let startingAt: number;
  //   let endingAt: number;
  //   let deposit: number;
  //   let participantLimit: number;
  //   let participantLimitPoolUser1: number;
  //   let lotteryData: any;
  //   let currentLottery: BigNumber;
  //   let lotteryCreated: Lottery;
  //   const amountUSDT = ethers.utils.parseUnits("100", 6);

  //   beforeEach(async function () {
  //     // On transfert 100 USDT à chaque participants
  //     await usdt.connect(this.whale).transfer(this.user1.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user2.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user3.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user4.address, amountUSDT);
  //     await usdt.connect(this.whale).transfer(this.user5.address, amountUSDT);

  //     // Création d'une lotterie
  //     const { timestamp } = await ethers.provider.getBlock("latest");
  //     startingAt = timestamp;
  //     endingAt = parseInt(
  //       ethers.BigNumber.from(timestamp).add(addDays(7)).toString()
  //     );
  //     deposit = 10;
  //     participantLimit = 5;

  //     await pumpMeBase.newLottery(
  //       startingAt,
  //       endingAt,
  //       deposit,
  //       participantLimit
  //     );
  //     currentLottery = await pumpMeBase.currentLottery();
  //     const addressLottery = await pumpMeBase.getAddressLottery(currentLottery);
  //     lotteryCreated = lottery.attach(addressLottery);
  //     lotteryData = await lotteryCreated.lotteryData();

  //     // Création d'une pool
  //     await expect(
  //       pumpMeBase.setState(lotteryCreated.address, 2)
  //     ).to.be.revertedWith("Wrong state");
  //     await pumpMeBase.setState(lotteryCreated.address, 1);
  //     participantLimitPoolUser1 = 1000;
  //     await pumpMeBase
  //       .connect(this.user1)
  //       .createPool(currentLottery, participantLimitPoolUser1);

  //     // Bets
  //     await usdt
  //       .connect(this.user1)
  //       .approve(lotteryCreated.address, amountUSDT);
  //     await usdt
  //       .connect(this.user2)
  //       .approve(lotteryCreated.address, amountUSDT);
  //     await usdt
  //       .connect(this.user3)
  //       .approve(lotteryCreated.address, amountUSDT);
  //     await usdt
  //       .connect(this.user4)
  //       .approve(lotteryCreated.address, amountUSDT);
  //     await usdt
  //       .connect(this.user5)
  //       .approve(lotteryCreated.address, amountUSDT);

  //     await expect(
  //       pumpMeBase.connect(this.user1).bet(currentLottery, 3)
  //     ).to.be.revertedWith("Pool doesn't exist");
  //     await pumpMeBase.connect(this.user1).bet(currentLottery, 1);
  //     await pumpMeBase.connect(this.user2).bet(currentLottery, 1);
  //     await pumpMeBase.connect(this.user3).bet(currentLottery, 0);
  //     await pumpMeBase.connect(this.user4).bet(currentLottery, 1);
  //     await pumpMeBase.connect(this.user5).bet(currentLottery, 0);
  //     await expect(pumpMeBase.bet(currentLottery, 1)).to.be.revertedWith(
  //       "Lottery limit reached"
  //     );

  //     // DrawLottery
  //     const nonce = Math.floor(Math.random() * 1000) + 1;
  //     await pumpMeBase.drawLottery(lotteryCreated.address, nonce);
  //   });

  //   it("Bets", async function () {
  //     lotteryData = await lotteryCreated.lotteryData();
  //     expect(lotteryData.createdAt).to.equal(startingAt);
  //     expect(lotteryData.endingAt).to.equal(endingAt);
  //     expect(lotteryData.deposit).to.equal(deposit);
  //     expect(lotteryData.totalDeposit).to.equal(5 * deposit);
  //     expect(lotteryData.participantCount).to.equal(5);
  //     expect(lotteryData.participantLimit).to.equal(participantLimit);
  //   });

  //   it("Pools", async function () {
  //     let poolData = await lotteryCreated.pools(0);
  //     expect(poolData.participantCount).to.equal(0);
  //     expect(poolData.participantLimit).to.equal(0);
  //     let lastPoolCreated = await lotteryCreated.lastPoolCreated();
  //     poolData = await lotteryCreated.pools(lastPoolCreated);
  //     expect(poolData.participantCount).to.equal(3);
  //     expect(poolData.participantLimit).to.equal(participantLimitPoolUser1);
  //     expect(
  //       await lotteryCreated.getPoolParticipant(lastPoolCreated, 1)
  //     ).to.equal(this.user1.address);
  //     expect(
  //       await lotteryCreated.getPoolParticipant(lastPoolCreated, 2)
  //     ).to.equal(this.user2.address);
  //     expect(
  //       await lotteryCreated.getPoolParticipant(lastPoolCreated, 3)
  //     ).to.equal(this.user4.address);
  //   });

  //   it("Draw", async function () {
  //     let eventFilter = lotteryCreated.filters.Winner();
  //     let events = await lotteryCreated.queryFilter(eventFilter);
  //     const winners = events[0].args.owners;
  //     const amount = events[0].args.amount;

  //     if (winners.length === 1) {
  //       if (winners[0] === this.user3.address) {
  //         const balanceUser3USDT = await usdt.balanceOf(this.user3.address);
  //         expect(balanceUser3USDT)
  //           .to.equal(
  //             amountUSDT
  //               .sub(ethers.utils.parseUnits(deposit.toString(), 6))
  //               .add(amount)
  //           )
  //           .to.equal(140000000);
  //       } else {
  //         const balanceUser5USDT = await usdt.balanceOf(this.user5.address);
  //         expect(balanceUser5USDT)
  //           .to.equal(
  //             amountUSDT
  //               .sub(ethers.utils.parseUnits(deposit.toString(), 6))
  //               .add(amount)
  //           )
  //           .to.equal(140000000);
  //       }
  //     } else {
  //       const balanceUser1USDT = await usdt.balanceOf(this.user1.address);
  //       const balanceUser2USDT = await usdt.balanceOf(this.user2.address);
  //       const balanceUser4USDT = await usdt.balanceOf(this.user4.address);
  //       expect(balanceUser1USDT)
  //         .to.equal(balanceUser2USDT)
  //         .to.equal(balanceUser4USDT)
  //         .to.equal(
  //           amountUSDT
  //             .sub(ethers.utils.parseUnits(deposit.toString(), 6))
  //             .add(amount)
  //         )
  //         .to.equal(106666666);
  //     }
  //   });
  // });

  describe("Test Scénarios", function () {
    let startingAt: number;
    let endingAt: number;
    let deposit: number;
    let participantLimit: number;
    let participantLimitPoolUser1: number;
    let participantLimitPoolUser2: number;
    let lotteryData: any;
    let currentLottery: BigNumber;
    let lotteryCreated: Lottery;
    const amountUSDT = ethers.utils.parseUnits("100", 6);

    beforeEach(async function () {
      // On transfert 100 USDT à chaque participants
      await usdt.connect(this.whale).transfer(this.owner.address, amountUSDT);
      await usdt.connect(this.whale).transfer(this.user1.address, amountUSDT);
      await usdt.connect(this.whale).transfer(this.user2.address, amountUSDT);
      await usdt.connect(this.whale).transfer(this.user3.address, amountUSDT);
      await usdt.connect(this.whale).transfer(this.user4.address, amountUSDT);
      await usdt.connect(this.whale).transfer(this.user5.address, amountUSDT);

      // Creation d'une lotterie
      const { timestamp } = await ethers.provider.getBlock("latest");
      startingAt = timestamp;
      endingAt = parseInt(
        ethers.BigNumber.from(timestamp).add(addDays(7)).toString()
      );
      deposit = 10;
      participantLimit = 10000;

      await pumpMeBase.newLottery(
        startingAt,
        endingAt,
        deposit,
        participantLimit
      );
      currentLottery = await pumpMeBase.currentLottery();
      const addressLottery = await pumpMeBase.getAddressLottery(currentLottery);
      lotteryCreated = lottery.attach(addressLottery);

      // Wallet 1 et 2 creer une pool
      await pumpMeBase.setState(lotteryCreated.address, 1);
      participantLimitPoolUser1 = 10;
      participantLimitPoolUser2 = 100;
      await pumpMeBase
        .connect(this.user1)
        .createPool(currentLottery, participantLimitPoolUser1);
      await pumpMeBase
        .connect(this.user2)
        .createPool(currentLottery, participantLimitPoolUser2);
    });

    // it("Basic Scénario - Should pass", async function () {
    //   // 6 users bet dont 1 sans pool
    //   await usdt
    //     .connect(this.owner)
    //     .approve(lotteryCreated.address, amountUSDT);
    //   await usdt
    //     .connect(this.user1)
    //     .approve(lotteryCreated.address, amountUSDT);
    //   await usdt
    //     .connect(this.user2)
    //     .approve(lotteryCreated.address, amountUSDT);
    //   await usdt
    //     .connect(this.user3)
    //     .approve(lotteryCreated.address, amountUSDT);
    //   await usdt
    //     .connect(this.user4)
    //     .approve(lotteryCreated.address, amountUSDT);
    //   await usdt
    //     .connect(this.user5)
    //     .approve(lotteryCreated.address, amountUSDT);
    //   await pumpMeBase.connect(this.owner).bet(currentLottery, 2);
    //   await pumpMeBase.connect(this.user1).bet(currentLottery, 1);
    //   await pumpMeBase.connect(this.user2).bet(currentLottery, 2);
    //   await pumpMeBase.connect(this.user3).bet(currentLottery, 1);
    //   await pumpMeBase.connect(this.user4).bet(currentLottery, 1);
    //   await pumpMeBase.connect(this.user5).bet(currentLottery, 0);

    //   // DrawLottery
    //   const nonce = Math.floor(Math.random() * 1000) + 1;
    //   await pumpMeBase.drawLottery(lotteryCreated.address, nonce);

    //   // Vérifications des résultats
    //   let eventFilter = lotteryCreated.filters.Winner();
    //   let events = await lotteryCreated.queryFilter(eventFilter);
    //   const winners = events[0].args.owners;
    //   const amount = events[0].args.amount;

    //   if (winners.length === 1) {
    //     const balanceUser5USDT = await usdt.balanceOf(this.user5.address);
    //     expect(balanceUser5USDT)
    //       .to.equal(
    //         amountUSDT
    //           .sub(ethers.utils.parseUnits(deposit.toString(), 6))
    //           .add(amount)
    //       )
    //       .to.equal(150000000);
    //   } else if (winners.length === 2) {
    //     if (winners[0] === this.owner.address) {
    //       const balanceOwnerUSDT = await usdt.balanceOf(this.owner.address);
    //       expect(balanceOwnerUSDT)
    //         .to.equal(
    //           amountUSDT
    //             .sub(ethers.utils.parseUnits(deposit.toString(), 6))
    //             .add(amount)
    //         )
    //         .to.equal(120000000);
    //     } else {
    //       const balanceUser2USDT = await usdt.balanceOf(this.user2.address);
    //       expect(balanceUser2USDT)
    //         .to.equal(
    //           amountUSDT
    //             .sub(ethers.utils.parseUnits(deposit.toString(), 6))
    //             .add(amount)
    //         )
    //         .to.equal(120000000);
    //     }
    //   } else {
    //     const balanceUser1USDT = await usdt.balanceOf(this.user1.address);
    //     const balanceUser3USDT = await usdt.balanceOf(this.user3.address);
    //     const balanceUser4USDT = await usdt.balanceOf(this.user4.address);
    //     expect(balanceUser1USDT)
    //       .to.equal(balanceUser3USDT)
    //       .to.equal(balanceUser4USDT)
    //       .to.equal(
    //         amountUSDT
    //           .sub(ethers.utils.parseUnits(deposit.toString(), 6))
    //           .add(amount)
    //       )
    //       .to.equal(110000000);
    //   }
    // });

    // it("Essayer de jouer sans payer", async function () {
    //   // sans approve
    //   await expect(
    //     pumpMeBase.connect(this.user4).bet(currentLottery, 1)
    //   ).to.be.revertedWith("SafeERC20: low-level call failed");
    //   await expect(
    //     pumpMeBase.connect(this.user5).bet(currentLottery, 2)
    //   ).to.be.revertedWith("SafeERC20: low-level call failed");

    //   // Rendre l'argent pour user4 et user5
    //   await usdt.connect(this.user4).transfer(this.whale.address, amountUSDT);
    //   await usdt.connect(this.user5).transfer(this.whale.address, amountUSDT);

    //   // sans avoir les fonds
    //   await usdt
    //     .connect(this.user4)
    //     .approve(lotteryCreated.address, amountUSDT);
    //   await usdt
    //     .connect(this.user5)
    //     .approve(lotteryCreated.address, amountUSDT);
    //   await expect(
    //     pumpMeBase.connect(this.user4).bet(currentLottery, 1)
    //   ).to.be.revertedWith("SafeERC20: low-level call failed");
    //   await expect(
    //     pumpMeBase.connect(this.user5).bet(currentLottery, 2)
    //   ).to.be.revertedWith("SafeERC20: low-level call failed");
    // });

    it("Avec 1000 participants", async function () {
      // Va te faire un café ! Dure environ 15 minutes pour 1000 users...
      let addressArray: string[] = [];
      let signers: Wallet[] = [];
      const startingBalance = ethers.utils.parseEther("10000");

      // Create wallets
      for (let i = 0; i < 1000; i++) {
        let wallet = ethers.Wallet.createRandom().connect(ethers.provider);
        signers.push(wallet);
        addressArray.push(wallet.address.toString());
      }

      // Create 50 pools de 1000
      for (let i = 0; i < 50; i++) {
        const participantLimitPool = 1000;
        await pumpMeBase.createPool(currentLottery, participantLimitPool);
      }

      await mine(1);

      // Fund them with ETH and USDT
      const fundThem = async () => {
        return Promise.all(
          addressArray.map(async (wallet) => {
            expect(
              await setBalance(wallet, startingBalance)
            ).to.changeEtherBalance(wallet, startingBalance);
            await usdt.connect(this.whale).transfer(wallet, amountUSDT);
          })
        ).then(() => {
          console.log("fundThem done");
        });
      };
      await fundThem();

      const betThemAll = async () => {
        return Promise.all(
          signers.map(async (signer) => {
            await usdt
              .connect(signer)
              .approve(lotteryCreated.address, amountUSDT);
            const poolId = randomIntFromInterval(3, 52);
            await pumpMeBase.connect(signer).bet(currentLottery, poolId);
          })
        ).then(() => {
          console.log("betThemAll done");
        });
      };
      await betThemAll();

      // DrawLottery
      const nonce = Math.floor(Math.random() * 1000) + 1;
      await pumpMeBase.drawLottery(lotteryCreated.address, nonce);

      // Vérifications des résultats
      let eventFilter = lotteryCreated.filters.Winner();
      let events = await lotteryCreated.queryFilter(eventFilter);
      const winners = events[0].args.owners;
      console.log("winners :>> ", winners);
      const amount = events[0].args.amount;
      console.log("amount :>> ", amount);

      const balanceWinner = await usdt.balanceOf(winners[0]);
      console.log("balanceWinner :>> ", balanceWinner);
      winners.map(async (winner) =>
        expect(await usdt.balanceOf(winner)).to.equal(
          amount.sub(ethers.utils.parseUnits(deposit.toString(), 6))
        )
      );
    });
  });
});
