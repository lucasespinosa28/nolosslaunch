import { useReadContract } from 'wagmi'
import RefundableToken from '../../../components/ui/contract/RefundableToken.json'
import { createServerSearchParamsForServerPage } from 'next/dist/server/request/search-params'

export function useCreatorRewardsUnstaked(contractAddress: `0x${string}`) {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: RefundableToken.abi,
    functionName: 'creatorRewardsUnstaked',
  })
  console.log({data,contractAddress});
  return {
    creatorRewardsUnstaked: data,
    isError,
    isLoading,
  }
}