import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import RefundableToken from '../../../components/ui/contract/RefundableToken.json';

export function useUnstakeToken(contractAddress: `0x${string}`) {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const unstakeToken = (amount: bigint) => {
    writeContract({
      address: contractAddress,
      abi: RefundableToken.abi,
      functionName: 'unstakeToken',
      args: [amount],
    });
  };

  const { isLoading: isUnstaking, isSuccess: isUnstaked } = useWaitForTransactionReceipt({ hash });

  return {
    unstakeToken,
    isUnstaking,
    isUnstaked,
    isPending,
    isError,
    error
  };
}