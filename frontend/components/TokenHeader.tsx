import React from 'react';

interface TokenHeaderProps {
    tokenInfo: any;
}

export default function TokenHeader({ tokenInfo }: TokenHeaderProps) {
    const data = new Date(Number(tokenInfo.countdownEnd) * 1000);
    return (
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
                {tokenInfo.name} <span className="text-2xl text-gray-600">{tokenInfo.symbol}</span>
            </h1>
               <h3 className="text-lg font-bold text-center text-gray-100">Refund Data: {data.toLocaleString()}</h3>
        </div>
    );
}