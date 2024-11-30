"use client"
import {  useReadContracts } from "wagmi";
import USDe from '../../../components/ui/contract/USDe.json'
import { ReactNode, useState } from "react";
import { formatEther, parseEther } from "viem";

interface TokenInfoProps {
    userAddress: `0x${string}` | undefined;
    contractAddress: `0x${string}`
    icon: ReactNode;
}

export default function TokenInfo({ contractAddress, userAddress, icon }: TokenInfoProps) {
    const contract = {
        address: contractAddress,
        abi: USDe,
    } as const

    const { data, status } = useReadContracts({
        contracts: [{
            ...contract,
            functionName: "name",
        },
        {
            ...contract,
            functionName: "symbol",
        },
        {
            ...contract,
            functionName: "balanceOf",
            args: [userAddress],
        }
        ]
    });

    return (
        <div className="p-6 bg-gray-800  bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl m-4 shadow-lg border border-gray-700">
            {status === 'pending' && <p className="text-yellow-400 animate-pulse">Loading token information...</p>}
            {status === 'error' && <p className="text-red-500">Error loading token information</p>}
            {status === 'success' && (
                <div className="flex flex-col space-y-4 ">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 bg-gray-700 p-3 rounded-full">
                            {icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                {data?.[0]?.result as string}
                            </h2>
                            <p className="text-lg text-gray-300">
                                {data?.[1]?.result as string}
                            </p>
                        </div>
                    </div>

                    {userAddress && (
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-lg text-gray-200">
                                Your balance: <span className="font-bold text-white">{Number(formatEther(data?.[2]?.result as bigint)).toFixed(2)}</span>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}