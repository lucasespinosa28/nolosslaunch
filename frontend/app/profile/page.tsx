"use client"
import Container from '@/components/ui/Container'
import TokenInfo from '@/components/ui/contract/tokenInfo';
import TokenInfoCard from '@/components/ui/tokenInfoCard';
import { useTokenOwner } from '@/hooks/graphql/useTokenOwner';
import { useTokens } from '@/hooks/graphql/useTokens';
import { useAccount } from 'wagmi'
import { TokenSepolia } from '../page';
import { useState } from 'react';
import TokenGrid from '@/components/ui/home/TokenGrid';
import Pagination from '@/components/ui/home/Pagination';
import UserCreatedTokens from '@/components/ui/profile/UserCreatedTokens';

const TOKENS_PER_PAGE = 4;

export default function Profile() {
  const { address } = useAccount()
  const { data: tokensSepolia, isLoading, error: TokenError } = useTokens(1000, 0);

  if (!address) {
    return (
      <Container>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Warning</p>
          <p>Please connect your wallet to view your profile and tokens.</p>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      {address && <h1 className="text-2xl font-bold mb-4">Profile: {address}</h1>}
      {address && <UserCreatedTokens address={address} />}
      <p>--------------------</p>
      {isLoading && <p>Loading tokens...</p>}
      {TokenError && <p>Error loading tokens: {TokenError.message}</p>}
      {tokensSepolia && tokensSepolia.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Your Tokens:</h2>
          <div className="flex flex-wrap -mx-2">
            {tokensSepolia.map((token, index) => (
              <div key={token.id || index} className="w-full sm:w-1/2 px-2 mb-4">
                <TokenInfo
                  contractAddress={token.tokenAddress}
                  userAddress={address}
                  icon={<span>🪙</span>}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No tokens found.</p>
      )}
    </Container>
  )
}