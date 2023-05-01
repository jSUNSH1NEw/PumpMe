// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "./Lottery.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

/// @author cd33
contract LotteryFactory {
    address public immutable lottery;
    address public immutable pumpMeBase;

    event LotteryCreated(
        uint createdAt,
        uint endingAt,
        uint deposit,
        uint participantLimit
    );

    constructor(address _pumpMeBase, address _lottery) {
        pumpMeBase = _pumpMeBase;
        lottery = _lottery;
    }

    modifier onlyShop() {
        require(pumpMeBase == msg.sender, "Only Shop authorized");
        _;
    }

    function createLottery(
        uint _createdAt,
        uint _endingAt,
        uint _deposit,
        uint _participantLimit
    ) public onlyShop returns(address) {
        address clone = Clones.clone(lottery);
        Lottery(clone).initialize(_createdAt, _endingAt, _deposit, _participantLimit);
        emit LotteryCreated(_createdAt, _endingAt, _deposit, _participantLimit);
        return clone;
    }
}