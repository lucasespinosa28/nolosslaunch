"use client"
import React from 'react';
import { useAccount } from 'wagmi';
import { useStakedUSDeMinterInfo } from '@/hooks/contract/read/useStakedUSDeMinterInfo';
import { useDeposits } from '@/hooks/graphql/useDeposits';
import Container from '@/components/ui/Container';
import TokenHeader from '@/components/ui/token/TokenHeader';
import TokenDetails from '@/components/ui/token/TokenDetails';
import TokenSupply from '@/components/ui/token/TokenSupply';
import TokenDeposits from '@/components/ui/token/TokenDeposits';
import ErrorComponent from '@/components/ui/home/ErrorComponent';
import NoTokenInfoComponent from '@/components/ui/token/noTokenInfoComponent';
import SkeletonLoading from '@/components/ui/token/skeletonLoading';
export default function TokenPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params);
    const account = useAccount();
    const { tokenInfo, isError, isLoading, error } = useStakedUSDeMinterInfo({ contractAddress: unwrappedParams.id as `0x${string}` });
    const { data: depositsData, isLoading: isDepositsLoading, isError: isDepositsError } = useDeposits(unwrappedParams.id as string);

    if (isLoading) return <SkeletonLoading />;
    if (isError) return <ErrorComponent message={error?.message || 'An error occurred'} />;
    if (!tokenInfo) return <NoTokenInfoComponent />;
    const { address } = useAccount()
    if (!address) {
        return (
          <Container>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
              <p className="font-bold">Warning</p>
              <p>Please connect your wallet.</p>
            </div>
          </Container>
        );
      }
    return (
        <Container className="p-4 md:p-8">
            <TokenHeader tokenInfo={tokenInfo} />
            <div className="flex flex-col md:flex-row gap-8">
                <TokenDetails 
                    tokenInfo={tokenInfo} 
                    account={account} 
                    contractAddress={unwrappedParams.id as `0x${string}`}
                />
            </div>
            <TokenSupply tokenInfo={tokenInfo} />
            <TokenDeposits 
                tokenInfo={tokenInfo}
                depositsData={depositsData}
                isDepositsLoading={isDepositsLoading}
                isDepositsError={isDepositsError}
            />
        </Container>
    );
}
