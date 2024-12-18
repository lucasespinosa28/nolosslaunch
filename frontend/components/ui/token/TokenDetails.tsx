import React from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import USDEIcon from '@/components/ui/contract/usde';
import useImageColors from '@/hooks/utils/useImageColors';
import { calculateUSDPrice } from '@/utils/calculateUSDPrice';
import TokenInfo from '@/components/ui/contract/tokenInfo';
import BuyToken from '@/components/ui/contract/BuyToken';
import { useStakedUSDeV2Balance } from '@/hooks/contract/read/useStakedUSDeV2Balance';
import { useConvertToAssets } from '@/hooks/contract/read/useConvertToAssets';
import { formatEther } from 'viem';
import UnstakEToken from './UnstakEToken';
import BurnToken from '../contract/BurnToken';
import { USDE_ADDRESS } from '@/utils/constants/addresses';

interface TokenDetailsProps {
    tokenInfo: any;
    account: ReturnType<typeof useAccount>;
    contractAddress: `0x${string}`;
}
export default function TokenDetails({ tokenInfo, account, contractAddress }: TokenDetailsProps) {
    const imageColors = useImageColors(tokenInfo.imageUrl || '');
    const { balance, isError: balanceError, isLoading: balanceLoading } = useStakedUSDeV2Balance(contractAddress);
    const { assets, isError: conversionError, isLoading: conversionLoading } = useConvertToAssets(balance?.toString() || '0');

    const countdownEnd = new Date(Number(tokenInfo.countdownEnd) * 1000);
    const currentDate = new Date();
    const usdPrice = calculateUSDPrice(Number(tokenInfo.rate));
    const isCountdownEnded = countdownEnd <= currentDate;

    const gradientStyle = imageColors
        ? { background: `linear-gradient(to bottom right, ${imageColors.first}, ${imageColors.last})` }
        : { background: 'bg-indigo-800' };

    return (
        <>
            <div className="md:w-1/2">
                <Image
                    src={tokenInfo.imageUrl}
                    alt={tokenInfo.name}
                    width={512}
                    height={512}
                    className="rounded-lg shadow-lg w-full"
                />
            </div>
            <div className="md:w-1/2 space-y-4">
                <div className="p-4 rounded-lg" style={gradientStyle}>
                    <div className="p-4 bg-gray-800 rounded-lg m-4 shadow-md">
                        {balanceLoading || conversionLoading ? (
                            <div>Loading balance and asset conversion...</div>
                        ) : balanceError || conversionError ? (
                            <div>Error fetching balance or converting to assets</div>
                        ) : (
                                <UnstakEToken contractAddress={contractAddress} amount={Number(formatEther(assets as bigint - tokenInfo.totalSupply))}/>
                        )}
                    </div>
                    <TokenInfo contractAddress={USDE_ADDRESS} userAddress={account.address} icon={<USDEIcon width={32} height={32} />} />
                    <TokenInfo contractAddress={contractAddress} userAddress={account.address} icon={<span>{tokenInfo.symbol}</span>} />
                    <div className="p-4 bg-gray-800 rounded-lg m-4 shadow-md">
                        <p className="mb-2"><span className="font-semibold">Price:</span> {Number(tokenInfo.rate).toFixed(2)} {tokenInfo.symbol} = $1 USDe</p>
                        <p><span className="font-semibold">USDe Price:</span> ${usdPrice.toFixed(4)} per {tokenInfo.symbol}</p>
                        {isCountdownEnded ? (
                            <div className="space-x-4">
                                <BurnToken
                                    contractAddress={contractAddress}
                                    address={account.address ?? '0x'}
                                    symbol={tokenInfo.symbol}
                                    rate={Number(tokenInfo.rate)}
                                />
                            </div>
                        ) : account.address ? (
                            <BuyToken
                                contractAddress={contractAddress}
                                address={account.address}
                                symbol={tokenInfo.symbol}
                                rate={Number(tokenInfo.rate)}
                            />
                        ) : (
                            <div className="text-center">
                                <p className="text-yellow-400 mb-2">You need to sign in to buy tokens.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}