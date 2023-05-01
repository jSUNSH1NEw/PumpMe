import { FetchSignerResult } from "@wagmi/core";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { chains } from "../config";

const useAvailableTokens = (
    account?: FetchSignerResult<ethers.Signer> | undefined 
) => {
    const [tokens, setTokens] = useState<Token[]>([]);

    useEffect(() => {
        if (!account) return;
        (async () => {
            const chainId = await account.getChainId();
            const tokens =
                chains
                    .find((chain) => chain.chainId === chainId)
                    ?.tokens.filter((token) => token.InoCurrency) || [];
            setTokens(tokens);
        })();
    }, [account]);

    return tokens;
};

export default useAvailableTokens;