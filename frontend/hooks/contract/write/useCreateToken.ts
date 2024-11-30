import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import abi from '../../../contract/StakedUSDeMinterFactory.json'
import { FACTORY_ADDRESS_SEPOLIA } from '../../../contract/addresses'

export function useCreateToken() {
  const { writeContract, data: hash, isPending, isError, error } = useWriteContract()

  const createToken = async (
    tokenName: string,
    tokenSymbol: string,
    imageUrl: string,
    countdownDays: number,
    rate: number,
    maxSupply: string,
  ) => {
    writeContract({
      address: FACTORY_ADDRESS_SEPOLIA,
      abi: abi,
      functionName: 'createToken',
      args: [
        tokenName,
        tokenSymbol,
        imageUrl,
        BigInt(countdownDays),
        rate,
        parseEther(maxSupply),
        "0xdceaf0e96bc45d82aa10d5ecb258d79d75976f760ff39dd1b05fd27317e6bb18"
      ]
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  return {
    createToken,
    isPending,
    isError,
    error,
    isConfirming,
    isConfirmed,
    hash
  }
}