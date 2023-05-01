// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "./LotteryFactory.sol";
import "./Lottery.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @author cd33
contract PumpMeBase is Ownable {
    LotteryFactory public lotteryFactory;

    uint256 public currentLottery;
    uint[] private possiblePoolLength = [10, 100, 1000];
    mapping(uint256 => address) private addressStorage;

    event LotteryAdded(uint _lotteryId, address _lotteryAddress);

    function storeLottery(address _addressContract) private {
        currentLottery++;
        addressStorage[currentLottery] = _addressContract;
    }

    function newLottery(
        uint _createdAt,
        uint _endingAt,
        uint _deposit,
        uint _participantLimit
    ) external onlyOwner {
        address lotteryAddress = lotteryFactory.createLottery(
            _createdAt, _endingAt, _deposit, _participantLimit
        );
        storeLottery(lotteryAddress);
        emit LotteryAdded(currentLottery, lotteryAddress);
    }

    function setState(address _lotteryAddress, uint8 _state) external onlyOwner {
        require(_state == 0 || _state == 1, "Wrong state");
        Lottery(_lotteryAddress).setLotteryState(_state);
    }

    function drawLottery(address _lotteryAddress, uint _nonce) external onlyOwner {
        Lottery(_lotteryAddress).drawLottery(_nonce);
    }

    function bet(uint _idLottery, uint _poolId) external {
        address lotteryAddress = addressStorage[_idLottery];
        Lottery(lotteryAddress).bet(_poolId);
    }

    function createPool(uint _idLottery, uint _participantLimit) external {
        require(_participantLimit == possiblePoolLength[0] || 
        _participantLimit == possiblePoolLength[1] || 
        _participantLimit == possiblePoolLength[2], "Wrong Limit");
        address lotteryAddress = addressStorage[_idLottery];
        Lottery(lotteryAddress).createPool(_participantLimit);
    }

    function setPossiblePoolLength(uint[] calldata _possiblePoolLength) external onlyOwner {
        possiblePoolLength = _possiblePoolLength;
    }

    // STORAGE
    function getAddressLottery(uint256 _idLottery) external view returns (address) {
        return addressStorage[_idLottery];
    }

    function setAddressLottery(uint256 _idLottery, address _value) external onlyOwner {
        addressStorage[_idLottery] = _value;
    }

    function deleteAddressLottery(uint256 _idLottery) external onlyOwner {
        delete addressStorage[_idLottery];
    }

    function setLotteryFactory(address _lotteryFactory) external onlyOwner {
        lotteryFactory = LotteryFactory(_lotteryFactory);
    }
}