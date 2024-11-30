import { useReadContract } from 'wagmi'
import StakedUSDeV2 from '../../../components/ui/contract/StakedUSDeV2.json'
import { StakedUSDeV2_ADDRESS } from '../../../components/ui/contract/addresses'

export function useConvertToAssets(shares: string) {
  const { data, isError, isLoading } = useReadContract({
    address: StakedUSDeV2_ADDRESS,
    abi: StakedUSDeV2,
    functionName: 'convertToAssets',
    args: [shares],
  })

  return {
    assets: data,
    isError,
    isLoading,
  }
}