import { useReadContract } from 'wagmi'
import StakedUSDeMinter from '../../../components/ui/contract/StakedUSDeMinter.json'

export function useRewardsUnstaked(contractAddress: `0x${string}`) {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: StakedUSDeMinter,
    functionName: 'rewardsUnstaked',
  })

  return {
    rewardsUnstaked: data,
    isError,
    isLoading,
  }
}