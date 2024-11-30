import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import StakedUSDeMinter from '../../../contract/StakedUSDeMinter.json'; // Make sure this path is correct

export function useWithdrawal() {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const withdrawal = (contractAddress: `0x${string}`, amount: string) => {
    writeContract({
      address: contractAddress,
      abi: StakedUSDeMinter,
      functionName: 'withdrawal',
      args: [parseEther(amount)],
    });
  };

  const { isLoading: isDepositing, isSuccess: isDeposited } = useWaitForTransactionReceipt({ hash });

  return { withdrawal, isDepositing, isDeposited, isPending, isError, error };
}