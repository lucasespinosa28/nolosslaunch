"use client"
import { type BaseError, useChainId, useReadContracts, useWaitForTransactionReceipt, useWriteContract, } from "wagmi";
import abi from "./abi.json"
import { ReactNode, useState } from "react";
import { formatEther, formatUnits, parseEther } from "viem";

interface TokenInfoProps {
    userAddress: `0x${string}` | undefined;
    contractAddress: `0x${string}`
    icon: ReactNode;
}

export default function TokenInfo({ contractAddress, userAddress, icon }: TokenInfoProps) {
    const chainId = useChainId()
    const [mintAmount, setMintAmount] = useState("1")
    const { data: hash, writeContract, isPending, isError } = useWriteContract()
    const contract = {
        address: contractAddress,
        abi: abi,
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

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })


    const handleMint = async () => {
        if (!userAddress) return;
        writeContract({
            ...contract,
            functionName: 'mint',
            args: [userAddress, parseEther(mintAmount)]
        })
    }
    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            {status === 'pending' && <p className="text-yellow-400">Loading token information...</p>}
            {status === 'error' && <p className="text-red-500">Error loading token information</p>}
            {status === 'success' && (
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        {icon}
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-1">
                            {data?.[0]?.result as string}
                        </p>
                        <p className="text-sm text-gray-400">
                            {data?.[1]?.result as string}
                        </p>
                        {/* {userAddress && (
                            <p className="text-sm text-gray-400">
                                <span>Your balance:</span> {formatEther(data?.[2]?.result as bigint) }
                            </p>
                        )} */}
                        {chainId == 31337 && <div className="mt-4">
                            <input
                                type="number"
                                value={mintAmount}
                                onChange={(e) => setMintAmount(e.target.value)}
                                className="bg-gray-700 text-white px-2 py-1 rounded mr-2"
                            />
                            <button
                                onClick={handleMint}
                                disabled={isPending || !userAddress}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                {isPending ? 'Minting...' : 'Mint'}
                            </button>
                            {hash && <a href={"https://sepolia.etherscan.io/tx/" + hash} target="_blank">Transaction Hash</a>
                            }
                            {isConfirming && <div>Waiting for confirmation...</div>}
                            {isConfirmed && <div>Transaction confirmed.</div>}
                            {isError && <p className="text-red-500 mt-2">Error minting tokens</p>}
                        </div>}
                    </div>
                </div>
            )}
        </div>
    )
}