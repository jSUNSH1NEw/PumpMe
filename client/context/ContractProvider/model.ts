import { ethers } from "ethers";

export interface PUMPMEContractState {
    pool: ethers.Contract | undefined;
    Contract1: ethers.Contract | undefined;
    Contract2: ethers.Contract | undefined;

}

export const CONTRACT_INITIAL_STATE: PUMPMEContractState = {
    pool: undefined,
    Contract1: undefined,
    Contract2: undefined,
};