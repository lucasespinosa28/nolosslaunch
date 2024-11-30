"use client"
import React from 'react';
import { useAccount } from 'wagmi';
import { useStakedUSDeMinterInfo } from '@/hooks/contract/read/useStakedUSDeMinterInfo';
import { useDeposits } from '@/hooks/graphql/useDeposits';
import Container from '@/components/Container';
import TokenHeader from '@/components/TokenHeader';
import TokenDetails from '@/components/TokenDetails';
import TokenSupply from '@/components/TokenSupply';
import TokenDeposits from '@/components/TokenDeposits';
import SkeletonLoading from './skeletonLoading';
import ErrorComponent from './errorComponent';
import NoTokenInfoComponent from './noTokenInfoComponent';



export default function TokenPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params);
    const account = useAccount();
    const { tokenInfo, isError, isLoading } = useStakedUSDeMinterInfo({ contractAddress: unwrappedParams.id as `0x${string}` });
    const { data: depositsData, isLoading: isDepositsLoading, isError: isDepositsError } = useDeposits(unwrappedParams.id as string);

    if (isLoading) return <SkeletonLoading />;
    if (isError) return <ErrorComponent />;
    if (!tokenInfo) return <NoTokenInfoComponent />;

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
