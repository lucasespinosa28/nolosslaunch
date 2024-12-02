import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import RefundableToken from '../../../components/ui/contract/RefundableToken.json';

export function useUnstakeCreatorAllRewards(contractAddress: `0x${string}`) {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const unstakeCreatorAllRewards = () => {
    writeContract({
      address: contractAddress,
      abi: RefundableToken.abi,
      functionName: 'unstakeCreatorAllRewars',
    });
  };

  const { isLoading: isUnstaking, isSuccess: isUnstaked } = useWaitForTransactionReceipt({ hash });
  console.log({error});
  return {
    unstakeCreatorAllRewards,
    isUnstaking,
    isUnstaked,
    isPending,
    isError,
    error
  };
}