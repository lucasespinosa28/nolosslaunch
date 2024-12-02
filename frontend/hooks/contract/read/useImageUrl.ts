import { useReadContract } from 'wagmi'
import RefundableToken from '../../../components/ui/contract/RefundableToken.json'

export function useImageUrl(contractAddress: `0x${string}`) {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: RefundableToken.abi,
    functionName: 'imageUrl',
  })

  return {
    imageUrl: data as bigint | undefined,
    isError,
    isLoading,
  }
}