import { ethers } from "ethers";
import { useState, useCallback, useEffect } from "react";
import { useInterval } from "usehooks-ts";
import { erc20ABI, useContract, useProvider, useSigner } from "wagmi";

interface UseAllowanceOptions {
  tokenAddress?: `0x${string}`;
  spender?: `0x${string}`;
  address?: `0x${string}`;
  onApproveSuccess?: () => any;
  onApproveFail?: (error: Error) => any;
}

const useAllowance = ({
  tokenAddress,
  spender,
  address,
  onApproveSuccess,
  onApproveFail,
}: UseAllowanceOptions) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const [allowance, setAllowance] = useState<ethers.BigNumberish>(
    ethers.constants.Zero
  );

  const stableContract = useContract({
    address: tokenAddress,
    abi: erc20ABI,
    signerOrProvider: signer ?? provider,
  });

  const updateBalance = useCallback(async () => {
    if ((!signer && !address) || !spender || !tokenAddress)
      return setAllowance(ethers.constants.Zero);

    let allowance = ethers.constants.Zero;

    const addressToUse =
      address || ((await signer?.getAddress()) as `0x${string}`);

    try {
      allowance =
        (await stableContract?.allowance(addressToUse, spender)) ||
        ethers.constants.Zero;
    } catch (err) {
      console.error(err);
    }

    setAllowance(allowance);
  }, [address, signer, spender, stableContract, tokenAddress]);

  const approve = async () => {
    if (!stableContract || !spender) return;
    try {
      const tx = await stableContract.approve(
        spender,
        ethers.constants.MaxUint256
      );
      await tx.wait();
      onApproveSuccess?.();
    } catch (err: any) {
      onApproveFail?.(err);
    }
  };

  useEffect(() => {
    updateBalance();
  }, [updateBalance]);

  useInterval(() => {
    updateBalance();
  }, 15000);

  return { allowance, approve };
};

export default useAllowance;
