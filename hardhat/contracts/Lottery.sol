// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./AggregatorV3Interface.sol";
import "hardhat/console.sol";

/// @author cd33
contract Lottery is Initializable {
    using SafeERC20 for IERC20;
    IERC20 private constant usdt = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);

    address immutable pumpMeBase;

    enum LotteryState {
        inactive,
        active
    }

    struct Pool {
        uint participantCount;
        uint participantLimit;
        mapping(uint => address) participants;
    }
    
    struct Bet {
        address participant;
        uint poolId;
    }

    struct LotteryData {
        uint createdAt;
        uint endingAt;
        uint deposit; // prix du bet en USD sans les décimales
        uint totalDeposit;
        uint participantCount;
        uint participantLimit;
        mapping(uint => Bet) participants;
    }

    LotteryState public currentState;
    LotteryData public lotteryData;

    uint public lastPoolCreated;
    mapping(uint => Pool) public pools;

    event LotteryBought(address owner);
    event Winner(address[] owners, uint amount);

    constructor(address _pumpMeBase) {
        pumpMeBase = _pumpMeBase;
    }

    modifier onlyPumpMeBase() {
        require(pumpMeBase == msg.sender, "Only PumpMeBase authorized");
        _;
    }

    modifier isPoolActive(LotteryState _lotteryState) {
        require(currentState == _lotteryState, "Not allowed in this state");
        _;
    }

    function initialize(
        uint _createdAt,
        uint _endingAt,
        uint _deposit,
        uint _participantLimit
    ) external initializer {
        lotteryData.createdAt = _createdAt;
        lotteryData.endingAt = _endingAt;
        lotteryData.deposit = _deposit;
        lotteryData.participantLimit = _participantLimit;
    }

    function _acceptPayment() private {
        usdt.safeTransferFrom(tx.origin, address(this), lotteryData.deposit * 10 ** 6);  // attention aux décimals USDT = 6 sur Ethereum
    }

    function getRandom(uint _nonce) view private returns(uint) {
        uint random = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, lotteryData.totalDeposit, _nonce)));
        return 1 + (random % lotteryData.participantCount);
    }

    function setLotteryState(uint8 _state) external onlyPumpMeBase {
        currentState = LotteryState(_state);
    }

    function drawLottery(uint _nonce) external onlyPumpMeBase isPoolActive(LotteryState.active) {
        currentState = LotteryState(LotteryState.inactive);

        // tirage au sort, chainlink ?
        uint winner = getRandom(_nonce);
        console.log("winner", winner);
        Bet memory winnerBet = lotteryData.participants[winner];

        // calcul des gains en fonction de la pool, changer avec un withdraw ?
        uint amountPerWinner = usdt.balanceOf(address(this));
        if (winnerBet.poolId > 0) {
            Pool storage pool = pools[winnerBet.poolId];
            uint limit = pool.participantCount;
            address[] memory winnersAddresses = new address[](limit);
            amountPerWinner /= limit;
            for (uint i = 1; i <= limit; ++i) {
                address addressWinner = pool.participants[i];
                winnersAddresses[i-1] = addressWinner;
                usdt.safeTransfer(addressWinner, amountPerWinner);
            }
            emit Winner(winnersAddresses, amountPerWinner);
        } else {
            address addressWinner = winnerBet.participant;
            usdt.safeTransfer(addressWinner, amountPerWinner);
            address[] memory winnersAddresses = new address[](1);
            winnersAddresses[0] = addressWinner;
            emit Winner(winnersAddresses, amountPerWinner);
        }
    }

    // possibilité de faire plusieurs bet d'un coup ?
    function bet(uint _poolId) external onlyPumpMeBase isPoolActive(LotteryState.active) {
        LotteryData storage lottery = lotteryData;
        require(lottery.participantCount < lottery.participantLimit, "Lottery limit reached");

        _acceptPayment();

        if (_poolId > 0) {
            Pool storage pool = pools[_poolId];
            require(pool.participantLimit > 0, "Pool doesn't exist");
            require(pool.participantCount < pool.participantLimit, "Pool limit reached");
            pool.participantCount++;
            pool.participants[pool.participantCount] = tx.origin;
        }

        lottery.totalDeposit += lottery.deposit;
        lottery.participantCount++;
        lottery.participants[lottery.participantCount] = Bet({
            participant: tx.origin,
            poolId: _poolId
        });
    }

    function createPool(uint _participantLimit) external onlyPumpMeBase isPoolActive(LotteryState.active) {
        lastPoolCreated++;
        Pool storage newPool = pools[lastPoolCreated];
        newPool.participantLimit = _participantLimit;
    }

    function getPoolParticipant(uint _poolId, uint _participant) external view returns(address) {
        Pool storage pool = pools[_poolId];
        return pool.participants[_participant];
    }
}