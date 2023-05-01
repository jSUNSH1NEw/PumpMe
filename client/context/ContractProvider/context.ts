import { useContext, createContext} from "react";

import { PUMPMEContractState, CONTRACT_INITIAL_STATE } from "./model";

export const ContractContext = createContext<PUMPMEContractState>(
    CONTRACT_INITIAL_STATE
);

export function useContractContext() {
    return useContext(ContractContext);
}