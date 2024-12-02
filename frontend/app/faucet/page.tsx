"use client"
import Container from '@/components/ui/Container'
import { useMintUSDe } from '@/hooks/contract/write/useMintUSDe'
import { StakedUSDeV2_ADDRESS } from '@/utils/constants/addresses'
import { parseEther } from 'viem'
import { useAccount } from 'wagmi'

function Faucet() {
  const account = useAccount()
  const { mint, isPending, isError, error, isConfirming, isConfirmed } = useMintUSDe()

  const handleMintToUser = async () => {
    const recipientAddress = account.address
    if (recipientAddress) {
      const amount = parseEther('100') // 100 USDe tokens
      await mint(recipientAddress, amount)
    } else {
      console.error('No recipient address available')
    }
  }

  const handleMintToStakedUSDeV2 = async () => {
    const amount = parseEther('100') // 100 USDe tokens
    await mint(StakedUSDeV2_ADDRESS, amount)
  }
  return (
    <Container>
      <div className="space-y-4">
        <button 
          onClick={handleMintToUser} 
          disabled={isPending || isConfirming}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Mint USDe to Your Address
        </button>
        <button 
          onClick={handleMintToStakedUSDeV2} 
          disabled={isPending || isConfirming}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Mint USDe to StakedUSDeV2
        </button>
        {isPending && <p className="text-yellow-500">Transaction pending...</p>}
        {isConfirming && <p className="text-blue-500">Waiting for confirmation...</p>}
        {isConfirmed && <p className="text-green-500">Minting successful!</p>}
        {isError && <p className="text-red-500">Error: {error?.message}</p>}
      </div>
    </Container>
  )
}

export default Faucet