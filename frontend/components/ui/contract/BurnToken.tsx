import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { useAllowance } from '@/hooks/contract/read/useAllowance';
import { useApprove } from '@/hooks/contract/write/useApprove';
import { formatEther, parseEther } from 'viem';
import { useWithdrawal } from '@/hooks/contract/write/useWithdrawal';
import { useUnstakeToken } from '@/hooks/contract/write/useUnstakeToken';
import { useWithdrawalTokenReward } from '@/hooks/contract/write/useWithdrawalTokenReward';

interface BuyTokenProps {
  symbol: string;
  rate: number;
  address: `0x${string}`;
  contractAddress: `0x${string}`;
}
//useAllowance
//useApprove
//useUnstakeToken
//withdrawalTokenReward
const BurnToken: React.FC<BuyTokenProps> = ({ symbol, rate, address, contractAddress }) => {
  const [amount, setAmount] = useState<string>('');
  const [usdePrice, setUsdePrice] = useState<number>(0);


  const { allowance, isLoading: isAllowanceLoading } = useAllowance(address, contractAddress);
  const { approve, isApproving, isApproved, isPending } = useApprove();
  const { unstakeToken, isUnstaking, isUnstaked } = useUnstakeToken(contractAddress);
  const { withdrawalTokenReward, isWithdrawing, isWithdrawn, } = useWithdrawalTokenReward(contractAddress);

  const getApproveButtonText = () => {
    if (isApproving) return 'Approving...';
    if (isPending) return 'Waiting for confirmation...';
    if (isApproved) return 'Approved!';
    return 'Approve';
  };

  const getUnstakeButtonText = () => {
    if (isUnstaking) return 'Unstaking...';
    if (isUnstaked) return 'Unstaked!';
    return 'Ask Refund Tokens';
  };

  const getWithdrawButtonText = () => {
    if (isWithdrawing) return 'Withdrawing...';
    if (isWithdrawn) return 'Withdrawn!';
    return 'Withdraw Token Reward';
  };

  useEffect(() => {
    const calculateUSDEPrice = (rate: number) => {
      return rate;
    };
    setUsdePrice(calculateUSDEPrice(rate));
  }, [rate]);

  const handleApprove = () => {
    if (amount) {
      approve(contractAddress, amount);
    }
  };

  const handleUnstake = () => {
    if (amount) {
      unstakeToken(parseEther(amount));
    }
  };

  const handleWithdrawReward = () => {
    withdrawalTokenReward();
  };


  const isApproveNeeded = allowance && amount >= formatEther(allowance as bigint);
  console.log({ isApproveNeeded });
  console.log({ allowance });

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Refund {symbol} Tokens</h2>
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
            className="my-1 p-2 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {amount && (
          <div className="text-sm text-gray-400">
            <span className="font-semibold">Total: </span>
            {amount} USDe = {(Number(amount) * usdePrice).toFixed(2)} ${symbol}
          </div>
        )}
      </div>
      {isApproveNeeded ? (
        <Button
          onClick={handleApprove}
          disabled={isApproving || isAllowanceLoading || isPending || isApproved}
          className="w-full my-1"
        >
          {getApproveButtonText()}
        </Button>
      ) : (
        <>
          <Button
            onClick={handleUnstake}
            disabled={isUnstaking || !amount}
            className="w-full my-1"
          >
            {getUnstakeButtonText()}
          </Button>
          <Button
            onClick={handleWithdrawReward}
            disabled={isWithdrawing || isWithdrawn}
            className="w-full my-1"
          >
            {getWithdrawButtonText()}
          </Button>
          <p className="text-sm text-gray-400 mt-2">
            Note: If you don't unstake manually in 1 hour, tokens will be automatically transferred when the next token holder call Unstak your account after 1 hour.
          </p>
        </>
      )}
    </div>
  );
};

export default BurnToken;