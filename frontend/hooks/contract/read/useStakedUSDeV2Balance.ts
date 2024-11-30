import { useReadContract } from 'wagmi'
import StakedUSDeV2ABI from '../../../contract/StakedUSDeV2.json'
import { StakedUSDeV2_ADDRESS } from '../../../contract/addresses'

export function useStakedUSDeV2Balance(address: `0x${string}` ) {
  const { data, isError, isLoading } = useReadContract({
    address: StakedUSDeV2_ADDRESS,
    abi: StakedUSDeV2ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  return {
    balance: data,
    isError,
    isLoading,
  }
}