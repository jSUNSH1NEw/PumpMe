import { ethers } from "ethers";

export interface ContractState {
    pool: ethers.Contract | undefined;
    Contract1: ethers.Contract | undefined;
    Contract2: ethers.Contract | undefined;

}

export const CONTRACT_INITIAL_STATE: ContractState = {
    pool: undefined,
    Contract1: undefined,
    Contract2: undefined,
};