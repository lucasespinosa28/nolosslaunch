import React from 'react';
import DepositsTable from '@/components/DepositsTable';

interface TokenDepositsProps {
    tokenInfo: any;
    depositsData: any;
    isDepositsLoading: boolean;
    isDepositsError: boolean;
}

export default function TokenDeposits({ tokenInfo, depositsData, isDepositsLoading, isDepositsError }: TokenDepositsProps) {
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Deposits</h3>
            {Number(tokenInfo.totalSupply) === 0 ? (
                <p>No deposits yet.</p>
            ) : isDepositsLoading ? (
                <p>Loading deposits...</p>
            ) : isDepositsError ? (
                <p>Error loading deposits</p>
            ) : (
                <DepositsTable transfers={depositsData?.data.transfers || []} symbol={tokenInfo.symbol} />
            )}
        </div>
    );
}