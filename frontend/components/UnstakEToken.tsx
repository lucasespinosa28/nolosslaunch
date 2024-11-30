import React from 'react';
import { useUnstakeRewards } from '@/hooks/contract/write/useUnstakeRewards';
import { useUnstakeAllRewards } from '@/hooks/contract/write/useUnstakeAllRewards';
import { useRewardsUnstaked } from '@/hooks/contract/read/useRewardsUnstaked';
import Button from './Button';

interface RewardTokenProps {
  contractAddress: `0x${string}`;
  symbol: string;
}


const UnstakEToken: React.FC<RewardTokenProps> = ({ contractAddress }) => {
  const { unstakeRewards, isUnstaking, isUnstaked, isPending, isError, error } = useUnstakeRewards(contractAddress);
  const { unstakeAllRewards, isUnstakingAll, isUnstakedAll, isPendingAll, isErrorAll, errorAll } = useUnstakeAllRewards(contractAddress);
  const { rewardsUnstaked, isLoading: isLoadingRewards } = useRewardsUnstaked(contractAddress);

  const handleUnstake = () => {
    unstakeRewards();
  };
  const handleUnstakeAll = () => {
    unstakeAllRewards();
  };
  console.log(rewardsUnstaked);
  return (
    <div className="flex flex-col items-end">
      {isLoadingRewards ? (
        <p className="text-gray-400">Loading rewards...</p>
      ) : (
        <p className="text-white">
          {rewardsUnstaked ? <></> : <>
            <Button onClick={handleUnstake} disabled={isUnstaking || isPending}>
              {isUnstaking ? 'Unstaking...' : isPending ? 'Pending...' : `Unstake sUSDe`}
            </Button>
            <Button onClick={handleUnstakeAll} disabled={isUnstakingAll || isPendingAll}>
              {isUnstakingAll ? 'Unstaking...' : isUnstakedAll ? 'Pending...' : `Get after 1 hour reward USDe`}
            </Button>
            </>}
        </p>
      )}
      {isError && <div className="text-red-500 mt-2">Error unstaking: {error?.message}</div>}
      {isUnstaked && <div className="text-green-500 mt-2">Unstake successful!</div>}
      {isErrorAll && <div className="text-red-500 mt-2">Error unstaking: {errorAll?.message}</div>}
      {isUnstakedAll && <div className="text-green-500 mt-2">Unstake successful!</div>}
    </div>
  );
};

export default UnstakEToken;

