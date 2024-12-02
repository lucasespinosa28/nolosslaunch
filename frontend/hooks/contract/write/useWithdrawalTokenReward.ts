import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import RefundableToken from '../../../components/ui/contract/RefundableToken.json';

export function useWithdrawalTokenReward(contractAddress: `0x${string}`) {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const withdrawalTokenReward = () => {
    writeContract({
      address: contractAddress,
      abi: RefundableToken.abi,
      functionName: 'withdrawalTokenReward',
    });
  };

  const { isLoading: isWithdrawing, isSuccess: isWithdrawn } = useWaitForTransactionReceipt({ hash });

  return {
    withdrawalTokenReward,
    isWithdrawing,
    isWithdrawn,
    isPending,
    isError,
    error
  };
}