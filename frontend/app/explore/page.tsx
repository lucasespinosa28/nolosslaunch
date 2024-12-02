"use client"
import { useMemo } from 'react';
import Container from "@/components/ui/Container";
import { useExplore } from '@/hooks/graphql/useExplore';
import { useStakedUSDeMinterInfo } from '@/hooks/contract/read/useStakedUSDeMinterInfo';
import { formatEther } from 'viem';
import Link from 'next/link';
import Image from 'next/image';

const MAX_TOKENS = 10; // Maximum number of tokens we'll display

export default function Explore() {
    const { data: exploreData, isLoading: exploreLoading, isError: exploreError, error: exploreErrorData } = useExplore(MAX_TOKENS, 0);

    // Create an array of contract addresses, padded with null to always have MAX_TOKENS elements
    const contractAddresses = useMemo(() => {
        const addresses = exploreData?.map(item => item.tokenAddress) || [];
        return [...addresses, ...Array(MAX_TOKENS - addresses.length).fill(null)];
    }, [exploreData]);

    // Call useStakedUSDeMinterInfo for each potential contract address
    const tokenInfoResults = contractAddresses.map(address =>
        useStakedUSDeMinterInfo({ contractAddress: address || '0x0000000000000000000000000000000000000000' })
    );

    const combinedData = useMemo(() => {
        if (!exploreData) return [];

        return exploreData.map((item, index) => {
            const { tokenInfo, isLoading, isError } = tokenInfoResults[index];
            return {
                ...item,
                tokenInfo: tokenInfo || {},
                isLoading,
                isError
            };
        });
    }, [exploreData, tokenInfoResults]);

    const isLoading = exploreLoading || combinedData.some(item => item.isLoading);
    const isError = exploreError || combinedData.some(item => item.isError);

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-6">Explore Tokens</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p className="text-red-500">{exploreErrorData?.message || "An error occurred"}</p>}
            {!isLoading && !isError && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
                        <thead className="bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Token Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Symbol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Marketcap USDe</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {combinedData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-700 cursor-pointer">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300" colSpan={6}>
                                        <Link href={`/token/${item.tokenAddress}`} className="flex items-center">
                                            <div className="flex items-center w-full">
                                                <div className="w-10 h-10 mr-4 relative overflow-hidden rounded-full">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={`${item.tokenInfo.name || 'Token'} logo`}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div className="flex-1 grid grid-cols-5 gap-4">
                                                    <span>{item.tokenAddress}</span>
                                                    <span>{new Date(Number(item.timestamp_) * 1000).toLocaleString()}</span>
                                                    <span>{item.tokenInfo.name}</span>
                                                    <span>{item.tokenInfo.symbol}</span>
                                                    <span>
                                                        {formatEther(
                                                            BigInt(item.tokenInfo?.totalSupply || 0) *
                                                            BigInt(Math.floor((item.tokenInfo?.rate || 0) * 1e18))
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Container>
    );
}