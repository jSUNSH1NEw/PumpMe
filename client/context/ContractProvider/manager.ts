import { useEffect, useState } from "react";
import { CONTRACT_INITIAL_STATE } from "./model";
import { contractAddresses } from "../../config";
import { ethers } from "ethers";
import lottery from "../../artifacts/Lottery.sol/Lottery.json";
import factory from "../../artifacts/LotteryFactory.sol/LotteryFactory.json";
import stableJSON from "../../artifacts/PumpMeBase.sol/PumpMeBase.json";

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
                lottery: new ethers.Contract(
                    addresses.lottery as string,
                    lottery.abi,
                    account
                ),
                lotteryFactory: new ethers.Contract(
                    addresses.lotteryFactory as string,
                    factory.abi,
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
