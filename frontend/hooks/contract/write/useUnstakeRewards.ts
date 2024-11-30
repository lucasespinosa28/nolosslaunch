import ABI from '../../../contract/StakedUSDeMinter.json';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

export function useUnstakeRewards(contractAddress: `0x${string}`) {
    const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

    const unstakeRewards = () => {
        writeContract({
            address: contractAddress,
            abi: ABI,
            functionName: 'unstakeAllRewars',
        });
    };

    const { isLoading: isUnstaking, isSuccess: isUnstaked } = useWaitForTransactionReceipt({ hash });

    return {
        unstakeRewards,
        isUnstaking,
        isUnstaked,
        isPending,
        isError,
        error
    };
}