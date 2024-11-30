import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { useAllowance } from '@/hooks/contract/read/useAllowance';
import { useApprove } from '@/hooks/contract/write/useApprove';
import { useDeposit } from '@/hooks/contract/write/useDeposit';
import { parseEther } from 'viem';

interface BuyTokenProps {
  symbol: string;
  rate: number;
  address: `0x${string}`;
  contractAddress: `0x${string}`;
}
const BuyToken: React.FC<BuyTokenProps> = ({ symbol, rate, address, contractAddress }) => {
  const [amount, setAmount] = useState<string>('');
  const [usdePrice, setUsdePrice] = useState<number>(0);
  const { allowance, isError: allowanceError, isLoading: allowanceLoading } = useAllowance(
    address,
    contractAddress
  );
  const { approve, isApproving, isApproved, isPending: isApprovePending, isError: isApproveError, error: approveError } = useApprove();
  const { deposit, isDepositing, isDeposited, isPending: isDepositPending, isError: isDepositError, error: depositError } = useDeposit();

  useEffect(() => {
    const calculateUSDEPrice = (rate: number) => {
      return rate;
    };
    setUsdePrice(calculateUSDEPrice(rate));
  }, [rate]);

  const handleBuy = () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }
    deposit(contractAddress, amount);
  };

  const handleApprove = () => {
    approve(contractAddress, amount);
  };

  const isAllowanceSufficient = allowance && BigInt(parseEther(amount || '0')) <= BigInt(allowance.toString());

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Buy {symbol} Tokens</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
            Amount of {symbol}
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount of ${symbol}`}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {amount && (
          <div className="text-sm text-gray-400">
            <span className="font-semibold">Total: </span> 
            {amount} USDe = {(Number(amount) * usdePrice).toFixed(2)} ${symbol}
          </div>
        )}
        <div>
          {allowanceLoading ? (
            <Button disabled className="w-full">Loading...</Button>
          ) : allowanceError ? (
            <Button disabled className="w-full">Error loading allowance</Button>
          ) : isAllowanceSufficient || isApproved ? (
            <Button onClick={handleBuy} disabled={isDepositing || isDepositPending} className="w-full">
              {isDepositing ? 'Buying...' : isDepositPending ? 'Pending...' : `Buy ${symbol}`}
            </Button>
          ) : (
            <Button onClick={handleApprove} disabled={isApproving || isApprovePending} className="w-full">
              {isApproving ? 'Approving...' : isApprovePending ? 'Pending...' : 'Approve USDe'}
            </Button>
          )}
        </div>
        {isApproveError && <div className="text-red-500 mt-2">Error approving: {approveError?.message}</div>}
        {isApproved && <div className="text-green-500 mt-2">Approval successful! You can now buy tokens.</div>}
        {isDepositError && <div className="text-red-500 mt-2">Error buying: {depositError?.message}</div>}
        {isDeposited && <div className="text-green-500 mt-2">Purchase successful!</div>}
      </div>
    </div>
  );
};

export default BuyToken;