import { useReadContracts } from 'wagmi';
import { useState, useEffect } from 'react';
import StakedUSDeMinter from "../../../components/ui/contract/StakedUSDeMinter.json";

interface UseStakedUSDeMinterInfoProps {
  contractAddress: `0x${string}`;
}

interface StakedUSDeMinterInfo {
  name: string;
  symbol: string;
  countdownEnd: bigint;
  imageUrl: string;
  maxSupply: bigint;
  totalSupply: bigint;
  rate: number;
}

export const useStakedUSDeMinterInfo = ({ contractAddress }: UseStakedUSDeMinterInfoProps) => {
  const [tokenInfo, setTokenInfo] = useState<StakedUSDeMinterInfo | null>(null);

  const { data, isError, isLoading,error } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: StakedUSDeMinter,
        functionName: 'name',
      },
      {
        address: contractAddress,
        abi: StakedUSDeMinter,
        functionName: 'symbol',
      },
      {
        address: contractAddress,
        abi: StakedUSDeMinter,
        functionName: 'countdownEnd',
      },
      {
        address: contractAddress,
        abi: StakedUSDeMinter,
        functionName: 'imageUrl',
      },
      {
        address: contractAddress,
        abi: StakedUSDeMinter,
        functionName: 'maxSupply',
      },
      {
        address: contractAddress,
        abi: StakedUSDeMinter,
        functionName: 'totalSupply',
      },
      {
        address: contractAddress,
        abi: StakedUSDeMinter,
        functionName: 'rate',
      },
    ],
  });
  useEffect(() => {
    if (data && data.every(result => result.status === 'success')) {
      setTokenInfo({
        name: data[0].result as string,
        symbol: data[1].result as string,
        countdownEnd: data[2].result as bigint,
        imageUrl: data[3].result as string,
        maxSupply: data[4].result as bigint,
        totalSupply: data[5].result as bigint,
        rate: data[6].result as number,
      });
    }
  }, [data]);
  return { tokenInfo, isError, isLoading,error };
};