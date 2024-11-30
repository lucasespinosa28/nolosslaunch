import { useReadContract } from 'wagmi'
import StakedUSDeV2ABI from '../../../contract/StakedUSDeV2.json'
import { StakedUSDeV2_ADDRESS } from '../../../contract/addresses'
import { parseEther, formatEther } from 'viem'

export function useConvertToAssets(shares: string) {
  const { data, isError, isLoading } = useReadContract({
    address: StakedUSDeV2_ADDRESS,
    abi: StakedUSDeV2ABI,
    functionName: 'convertToAssets',
    args: [shares],
  })

  return {
    assets: data,
    isError,
    isLoading,
  }
}