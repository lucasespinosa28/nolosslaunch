"use client"
import React from 'react';
import tokens from "@/mock/tokens.json";
import transfersDeposit from "@/mock/transfersDeposit.json";
import transfersWithdraw from "@/mock/transfersWithdraw.json";
import Image from 'next/image';
import ProgressBar from '@/components/progressBar';
import TableTransfers from '@/components/tableTransfers';
import useCalculateCountdown from '@/components/calculateCountdown';
import Button from '@/components/Button';


const calculateUSDPrice = (tokenPrice: number): number => {
    return 1 / tokenPrice;
};
export default function TokenPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params);
    const token = tokens.find(t => t.contractAddress === unwrappedParams.id);

    if (!token) {
        return <main className="p-8">Token not found</main>;
    }

    const refundDate = new Date(token.refundDate * 1000);
    const currentDate = new Date();
    const usdPrice = calculateUSDPrice(token.rate);
    console.log({ refundDate, currentDate });
    if (refundDate >= currentDate) {
        console.log(true)
    } else {
        console.log(false)
    }
    const ended = refundDate >= currentDate ? false : true;
    const { countdown, isRefundDatePassed } = useCalculateCountdown(refundDate.toISOString());

    return (
        <main className="p-8">
            <div className="shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <div>
                        <p className="text-gray-600">Refund Date</p>
                        <p className="font-semibold">{refundDate.toDateString()}</p>
                        {!isRefundDatePassed && (
                            <p className="text-sm text-grey-500">Time remaining: {countdown}</p>
                        )}
                        {isRefundDatePassed && (
                            <p className="text-sm text-lime-500">Refund date has passed</p>
                        )}
                    </div>
                    <div className="flex items-center mb-4">
                        <Image
                            src={`/images/${token.imageUrl}`}
                            alt={token.tokenName}
                            width={64}
                            height={64}
                            className="rounded-full mr-4"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{token.tokenName}</h2>
                            <p className="text-gray-600">{token.tokenSymbol}</p>

                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Refund Date</p>
                            <p className="font-semibold">{refundDate.toDateString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Price</p>
                            <p className="text-sm text-gray-400">
                                {token.rate.toFixed(2)} {token.tokenSymbol} = $1 USDe
                            </p>
                            <p className="text-xs text-gray-500">
                                (${usdPrice.toFixed(4)} USD per {token.tokenSymbol})
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Supply</p>
                            <p className="font-semibold">{token.totalSupply.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Max Supply</p>
                            <p className="font-semibold">{token.maxSupply.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Market Cap</p>
                            <p className="font-semibold">${(token.totalSupply * token.rate).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-600">Contract Address</p>
                        <p className="font-mono text-sm break-all">{token.contractAddress}</p>
                    </div>
                    <ProgressBar totalSupply={token.totalSupply} maxSupply={token.maxSupply} />
                    {isRefundDatePassed ?
                        <>
                            <Button onClick={() => { alert("Reward") }} >Buy token</Button>
                            <Button onClick={() => { alert("Refund") }} >Buy token</Button>
                        </> :
                        <Button onClick={() => { alert("Buy token") }} >Buy token</Button>}
                </div>
            </div>
            <TableTransfers transfersDeposit={transfersDeposit} transfersWithdraw={transfersWithdraw} contractAddress={token.contractAddress} />

        </main>
    );
}