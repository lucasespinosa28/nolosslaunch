import StakedUSDeMinter from '../../../components/ui/contract/StakedUSDeMinter.json'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

export function useUnstakeAllRewards(contractAddress: `0x${string}`) {
    const { writeContract, data: hash, isPending:isPendingAll, isError:isErrorAll, error:errorAll } = useWriteContract();

    const unstakeAllRewards = () => {
        writeContract({
            address: contractAddress,
            abi: StakedUSDeMinter,
            functionName: 'unstakeReward',
        });
    };

    const { isLoading: isUnstakingAll, isSuccess: isUnstakedAll } = useWaitForTransactionReceipt({ hash });
    console.log(errorAll)
    return {
        unstakeAllRewards,
        isUnstakingAll,
        isUnstakedAll,
        isPendingAll,
        isErrorAll,
        errorAll
    };
}