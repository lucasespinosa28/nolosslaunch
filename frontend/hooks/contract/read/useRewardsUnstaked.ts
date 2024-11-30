import { useReadContract } from 'wagmi'
import StakedUSDeMinterAbi from "../../../contract/StakedUSDeMinter.json";

export function useRewardsUnstaked(contractAddress: `0x${string}`) {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: StakedUSDeMinterAbi,
    functionName: 'rewardsUnstaked',
  })

  return {
    rewardsUnstaked: data,
    isError,
    isLoading,
  }
}