import { useEffect, useState } from "react";
import { CONTRACT_INITIAL_STATE } from "./model";
import { contractAddresses } from "../../config";
import { ethers } from "ethers";
import pool from "../../artifacts/contracts/ArtysPass.sol/ArtysPass.json";
import Contract1 from "../../artifacts/contracts/ArtysPassShop.sol/ArtysPassShop.json";
import stableJSON from "../../artifacts/contracts/mocks/MockStable.sol/Stable.json";

// import UMATCHNFTJSON from "../../artifacts/contracts/Umatch.sol/Umatch.json";
// import UMATCHNFTShopJSON from "../../artifacts/contracts/ArtysPassShop.sol//ArtysPassShop.json";
// import stableJSON from "../../artifacts/contracts/mocks/MockStable.sol/MockStable.json";
import { useSigner } from "wagmi";

const useContractManager = () => {
    const [state, setState] = useState(CONTRACT_INITIAL_STATE);
    const { data: account } = useSigner();
    const [addresses, setAddresses] = useState<PUMPMEContractList | undefined>();

    useEffect(() => {
        (async () => {
            if (!account?.provider) return;
            const chainId = (await account.provider.getNetwork()).chainId;
            setAddresses(
                contractAddresses.find((network) => network.chainId === chainId)
            );
        })();
    }, [account]);

    useEffect(() => {
        if (addresses && account) {
            setState({
                ...state,
                pool: new ethers.Contract(
                    addresses.pool as string,
                    pool.abi,
                    account
                ),
                Contract1: new ethers.Contract(
                    addresses.Contract1 as string,
                    Contract1.abi,
                    account
                ),
            });
            if (addresses.stable) {
                setState((state) => ({
                    ...state,
                    stable: new ethers.Contract(
                        addresses.stable as string,
                        stableJSON.abi,
                        account
                    ),
                }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, addresses]);
    return state;
};

export default useContractManager;
