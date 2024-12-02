import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import RefundableToken from '../../../components/ui/contract/RefundableToken.json';

export function useUnstakeCreatorReward(contractAddress: `0x${string}`) {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const unstakeCreatorReward = () => {
    writeContract({
      address: contractAddress,
      abi: RefundableToken.abi,
      functionName: 'unstakeCreatorReward',
    });
  };

  const { isLoading: isUnstaking, isSuccess: isUnstaked } = useWaitForTransactionReceipt({ hash });

  return {
    unstakeCreatorReward,
    isUnstaking,
    isUnstaked,
    isPending,
    isError,
    error
  };
}