import { ethers } from "ethers";

export interface PUMPMEContractState {
    lottery: ethers.Contract | undefined;
    lotteryFactory: ethers.Contract | undefined;
    Contract2: ethers.Contract | undefined;

}

export const CONTRACT_INITIAL_STATE: PUMPMEContractState = {
    lottery: undefined,
    lotteryFactory: undefined,
    Contract2: undefined,
};