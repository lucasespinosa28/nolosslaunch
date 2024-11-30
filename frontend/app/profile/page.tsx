"use client"
import Container from '@/components/Container'
import TokenInfoCard from '@/components/tokenInfoCard'
import TokenInfo from '@/contract/token/tokenInfo'
import { useGetLaunchpadsByOwner } from '@/hooks/contract/read/useGetLaunchpadsByOwner'
import { useAccount } from 'wagmi'

export default function Profile() {
  const { address } = useAccount()
  const { launchpads, isError, isLoading } = useGetLaunchpadsByOwner(address)

  if (isLoading) {
    return (
      <Container className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        {/* <Skeleton className="h-48 w-full mb-4" />
        <Skeleton className="h-48 w-full" /> */}
      </Container>
    )
  }

  if (isError) {
    return (
      <Container className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> There was an error fetching your launchpads. Please try again later.</span>
        </div>
      </Container>
    )
  }

  if (!launchpads || launchpads.length === 0) {
    return (
      <Container className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">You haven't created any launchpads yet. Start by creating your first token!</span>
        </div>
      </Container>
    )
  }

  return (
    <Container className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Created Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {launchpads.map((launchpad) => (
            <TokenInfoCard key={launchpad} contractAddress={launchpad} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-2xl font-semibold mb-4">Your Token Balances</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {launchpads.map((launchpad) => (
            <TokenInfo
              key={launchpad}
              contractAddress={launchpad}
              userAddress={address}
              icon={<span className="text-2xl">🪙</span>}
            />
          ))}
        </div>
      </section>
    </Container>
  )
}