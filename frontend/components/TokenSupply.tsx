import React from 'react';
import { formatEther } from 'viem';
import ProgressBar from '@/components/progressBar';

interface TokenSupplyProps {
    tokenInfo: any;
}

export default function TokenSupply({ tokenInfo }: TokenSupplyProps) {
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Token Supply</h3>
            <ProgressBar totalSupply={Number(tokenInfo.totalSupply)} maxSupply={Number(tokenInfo.maxSupply)} />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Total Supply: {formatEther(tokenInfo.totalSupply)} {tokenInfo.symbol}</span>
                <span>Max Supply: {formatEther(tokenInfo.maxSupply)} {tokenInfo.symbol}</span>
            </div>
        </div>
    );
}