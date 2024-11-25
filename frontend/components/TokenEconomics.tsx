import React, { useState } from 'react';
import useCalculateCountdown from './calculateCountdown';
import Buy from './Buy';

interface TokenEconomicsProps {
  symbol: string;
  price: number;
  refundDate: string;
  currentSupply: number;
  maxSupply: number;
}

const TokenEconomics: React.FC<TokenEconomicsProps> = ({ symbol, price, refundDate, currentSupply, maxSupply }) => {
  const supplyPercentage = (currentSupply / maxSupply) * 100;
  const [amount, setAmount] = useState<string>('');
  const { countdown, isRefundDatePassed } = useCalculateCountdown(refundDate);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Token Economics</h2>
      <div className="flex">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2 pr-4">
          <div className="mb-4">
            <p><strong>Price:</strong> ${price.toFixed(2)} USDe</p>
            <p><strong>Your Balance:</strong> 100.00 {symbol}</p>
          </div>
          <div>
            <span><strong>Refund Date:</strong> {refundDate}</span>
            {isRefundDatePassed ? (
              <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
                Refund available!!!
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                Time remaining: {countdown}
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <Buy price={price} id={"1"} symbol={symbol}/>
        </div>
      </div>
      <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center ">
          <span><strong>Current Supply:</strong> {currentSupply.toLocaleString()}</span>
          <span><strong>Max Supply:</strong> {maxSupply.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-indigo-600 h-2.5 rounded-full animate-pulse"
            style={{ width: `${supplyPercentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600 mt-1 block text-center">
          {supplyPercentage.toFixed(2)}% of max supply reached
        </span>
      </div>
    </div>
  );
};

export default TokenEconomics;