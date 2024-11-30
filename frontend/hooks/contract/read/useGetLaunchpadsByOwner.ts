import { useReadContract } from 'wagmi'
import { FACTORY_ADDRESS_SEPOLIA } from '../../../contract/addresses'
import abi from '../../../contract/StakedUSDeMinterFactory.json'

export function useGetLaunchpadsByOwner(ownerAddress: `0x${string}`) {
  const { data, isError, isLoading } = useReadContract({
    address: FACTORY_ADDRESS_SEPOLIA,
    abi: abi,
    functionName: 'getLaunchpadsByOwner',
    args: [ownerAddress],
  })

  return {
    launchpads: data as `0x${string}`[] | undefined,
    isError,
    isLoading,
  }
}