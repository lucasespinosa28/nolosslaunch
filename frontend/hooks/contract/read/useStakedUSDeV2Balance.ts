import { useReadContract } from 'wagmi'
import StakedUSDeV2 from '../../../components/ui/contract/StakedUSDeV2.json'
import { StakedUSDeV2_ADDRESS } from '../../../components/ui/contract/addresses'

export function useStakedUSDeV2Balance(address: `0x${string}` ) {
  const { data, isError, isLoading } = useReadContract({
    address: StakedUSDeV2_ADDRESS,
    abi: StakedUSDeV2,
    functionName: 'balanceOf',
    args: [address],
  })

  return {
    balance: data,
    isError,
    isLoading,
  }
}