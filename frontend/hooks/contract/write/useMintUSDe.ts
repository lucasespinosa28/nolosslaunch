import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import USDe from '../../../components/ui/contract/USDe.json'
import { USDE_ADDRESS } from '@/utils/constants/addresses'

export function useMintUSDe() {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract()

  const mint = async (to: `0x${string}`, amount: bigint) => {
    writeContract({
      address: USDE_ADDRESS,
      abi: USDe,
      functionName: 'mint',
      args: [to, amount],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  return {
    mint,
    isPending,
    isError,
    error,
    isConfirming,
    isConfirmed,
    hash
  }
}