import React from 'react';
import { useUnstakeCreatorAllRewards } from '@/hooks/contract/write/useUnstakeCreatorAllRewards';
import { useUnstakeCreatorReward } from '@/hooks/contract/write/useUnstakeCreatorReward';
import { useCreatorRewardsUnstaked } from '@/hooks/contract/read/useCreatorRewardsUnstaked';
import Button from '../Button';
import { useReadContract } from 'wagmi';
import { useGetData } from '@/hooks/contract/read/useGetData';

interface RewardTokenProps {
  contractAddress: `0x${string}`;
  amount: number;
}

const UnstakEToken: React.FC<RewardTokenProps> = ({ contractAddress, amount }) => {
  const {
    unstakeCreatorAllRewards,
    isUnstaking: isUnstakingAll,
    isUnstaked: isUnstakedAll
  } = useUnstakeCreatorAllRewards(contractAddress);

  const {
    unstakeCreatorReward,
    isUnstaking: isUnstakingSingle,
    isUnstaked: isUnstakedSingle
  } = useUnstakeCreatorReward(contractAddress);

  const handleUnstakeAll = () => {
    unstakeCreatorAllRewards();
  };

  const handleUnstakeSingle = () => {
    unstakeCreatorReward();
  };
  const { data, isError, isLoading } = useGetData(contractAddress);
  const timer = new Date(Number(data) * 1000);
  console.log(timer);
  //data.
  return (
    <div>
      <p className="font-bold">
        Creator Rewards: {Math.max(0, amount).toFixed(2)} USDe
      </p>
      <div>
        <pre>Blockchain date {JSON.stringify(timer.toLocaleString())}</pre>
      </div>
      {amount > 0 && (
        <>
         <Button
        onClick={handleUnstakeAll}
        disabled={isUnstakingAll}
      >
        {isUnstakingAll ? 'Unstaking All...' : '1 - Unstake All Creator Rewards'}
      </Button>
      <Button
        onClick={handleUnstakeSingle}
        disabled={isUnstakingSingle}
        className='mx-2'
      >
        {isUnstakingSingle ? 'Unstaking...' : '2 - Get Reward'}
      </Button>
        </>
      )}
    </div>
  );
};

export default UnstakEToken;