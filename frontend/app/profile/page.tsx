"use client"
import { useAccount, useReadContract } from 'wagmi'
import { LAUNCHPADFACTORY_ADDRESS } from '../contract/addresses'
import abi from '../contract/LaunchpadFactory.json'
import { useState, useEffect } from 'react'
import TokenInfo from '../contract/token/tokenInfo'
export default function Profile() {
  const { address } = useAccount()
  const [launchpads, setLaunchpads] = useState<`0x${string}`[]>([])

  const { data: userLaunchpads } = useReadContract({
    address: LAUNCHPADFACTORY_ADDRESS,
    abi: abi,
    functionName: 'getLaunchpadsByOwner',
    args: [address],
  })

  useEffect(() => {
    if (userLaunchpads) {
      setLaunchpads(userLaunchpads as `0x${string}`[])
    }
  }, [userLaunchpads])
  console.log(userLaunchpads)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="mb-4">Welcome to your profile page!</p>

      <h2 className="text-xl font-semibold mb-2">Your Launchpads</h2>
      {launchpads.length > 0 ? (
        <div className="space-y-4">
          {launchpads.map((launchpad, index) => (
            <TokenInfo 
              key={index} 
              contractAddress={launchpad} 
              userAddress={address} 
              icon={<div className="w-8 h-8 bg-blue-500 rounded-full"></div>}
            />
          ))}
        </div>
      ) : (
        <p>You haven't created any launchpads yet.</p>
      )}
    </div>
  )
}