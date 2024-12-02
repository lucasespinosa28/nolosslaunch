import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import USDe from '../../../components/ui/contract/USDe.json'
import { parseEther } from 'viem';
import { USDE_ADDRESS } from '@/utils/constants/addresses';

export function useApprove() {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const approve = (spender: `0x${string}`, amount: string, contracAddress: `0x${string}` = USDE_ADDRESS) => {
    const value = parseEther(amount)
    writeContract({
      address: contracAddress,
      abi: USDe,
      functionName: 'approve',
      args: [spender,value],
    });
  };

  const { isLoading: isApproving, isSuccess: isApproved } = useWaitForTransactionReceipt({ hash });

  return { approve, isApproving, isApproved, isPending, isError, error };
}