import { useReadContract } from 'wagmi'
import RefundableToken from '../../../components/ui/contract/RefundableToken.json'

export function useGetData(contractAddress: `0x${string}`) {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: RefundableToken.abi,
    functionName: 'getData',
  })

  return {
    data,
    isError,
    isLoading,
  }
}