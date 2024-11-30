import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import StakedUSDeMinter from '../../../contract/StakedUSDeMinter.json'; // Make sure this path is correct

export function useDeposit() {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const deposit = (contractAddress: `0x${string}`, amount: string) => {
    writeContract({
      address: contractAddress,
      abi: StakedUSDeMinter,
      functionName: 'depositToStakedUSDeV2',
      args: [parseEther(amount)],
    });
  };

  const { isLoading: isDepositing, isSuccess: isDeposited } = useWaitForTransactionReceipt({ hash });

  return { deposit, isDepositing, isDeposited, isPending, isError, error };
}