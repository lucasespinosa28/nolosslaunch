import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { USDE_ADDRESS } from '../../../components/ui/contract/addresses';
import USDe from '../../../components/ui/contract/USDe.json'
import { parseEther } from 'viem';

export function useApprove() {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const approve = (spender: `0x${string}`, amount: string, contracAddress: `0x${string}` = "0x0") => {
    if (contracAddress == "0x0") contracAddress = USDE_ADDRESS
    const value = parseEther(amount)
    writeContract({
      address: USDE_ADDRESS,
      abi: USDe,
      functionName: 'approve',
      args: [spender,value],
    });
  };

  const { isLoading: isApproving, isSuccess: isApproved } = useWaitForTransactionReceipt({ hash });

  return { approve, isApproving, isApproved, isPending, isError, error };
}