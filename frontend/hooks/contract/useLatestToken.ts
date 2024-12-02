import { useReadContract } from 'wagmi'
import RefundableTokenFactory from '@/components/ui/contract/RefundableTokenFactory.json'
import { FACTORY_ADDRESS_SEPOLIA } from '@/utils/constants/addresses'

export function useLatestToken() {
  const { data, isError, isLoading } = useReadContract({
    address: FACTORY_ADDRESS_SEPOLIA,
    abi: RefundableTokenFactory,
    functionName: 'latestToken',
  })
  console.log({data})
  return {
    latestToken: data as `0x${string}` | undefined,
    isError,
    isLoading,
  }
}