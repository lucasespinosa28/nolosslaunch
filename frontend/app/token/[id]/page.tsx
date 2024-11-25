"use client"
import React from 'react';
import Image from 'next/image';
import TransactionHistory from '@/components/TransactionHistory';
import Transactions from "../../../data/Transactions.json"
import Contact from '@/components/Contact';
import TokenEconomics from '@/components/TokenEconomics';
import tokens from "../../../data/tokens.json";


export default function TokenPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params);
    const token = tokens.filter(token => token.address === unwrappedParams.id)[0];
    const typedTransactions = Transactions.map(transaction => ({
        ...transaction,
        type: transaction.type as "buy" | "sell"
    }));
    return (
        <main className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-start mb-8">
                    <div className="w-2/5 pr-4">
                        <Image
                            src={token.image}
                            alt={token.name}
                            width={400}
                            height={400}
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                    <div className="w-3/5">
                        <h1 className="text-3xl font-bold">{token.name} <span className="text-gray-400">({token.symbol})</span></h1>
                        <p className="text-gray-400 mt-2">{token.description}</p>
                        <Contact
                            website={`https://${token.symbol}.com`}
                            telegram={`https://discord.gg/${token.symbol}`}
                            discord={`https://discord.gg/${token.symbol}`}
                            twitter={`https://discord.gg/${token.symbol}`}
                        />
                    </div>
                </div>
                <TokenEconomics
                    price={token.price}
                    refundDate={token.refundDate}
                    currentSupply={token.totalSupply}
                    maxSupply={token.maxSupply}
                    symbol={token.symbol}
                />
                <TransactionHistory transactions={typedTransactions} />
            </div>
        </main>
    );
}