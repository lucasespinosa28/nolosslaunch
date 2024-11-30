import React from 'react';
import { useAccount } from 'wagmi';
import { useTokensByOwner } from '@/hooks/useLaunchpadsByOwner';
import { useStakedUSDeMinterInfo } from '@/hooks/contract/read/useStakedUSDeMinterInfo';
import Card from '@/components/Card';
import TokenInfoCard from './tokenInfoCard';


const UserTokensInfo = () => {
    const { address } = useAccount();
    
    if (!address) {
      return <div>Please connect your wallet to view your tokens.</div>;
    }
  
    const { tokens: userTokens, isLoading, isError } = useTokensByOwner({ ownerAddress: address });
  
    if (isLoading) return <div>Loading your tokens...</div>;
    if (isError) return <div>Error loading your tokens</div>;
    if (!userTokens || userTokens.length === 0) return <div>You don't own any tokens</div>;
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userTokens.map((tokenAddress) => (
            <TokenInfoCard key={tokenAddress} contractAddress={tokenAddress} />
          ))}
        </div>
      </div>
    );
  };
  
  export default UserTokensInfo;