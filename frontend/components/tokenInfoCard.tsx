import { useStakedUSDeMinterInfo } from "@/hooks/contract/read/useStakedUSDeMinterInfo";
import Card from "./Card";

const TokenInfoCard = ({ contractAddress }: { contractAddress: `0x${string}` }) => {
  const { tokenInfo, isError, isLoading } = useStakedUSDeMinterInfo({ contractAddress });

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg animate-pulse">
        <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
    );
  }

  if (isError || !tokenInfo) {
    return (
      <div className="bg-red-800 p-4 rounded-lg text-white">
        <p className="text-lg font-semibold mb-2">Error</p>
        <p className="text-sm">
          {isError ? "Failed to load token information." : "No token information available."}
        </p>
      </div>
    );
  }
  return (
    <Card
      address={contractAddress}
      name={tokenInfo.name}
      symbol={tokenInfo.symbol}
      image={tokenInfo.imageUrl}
      price={Number(tokenInfo.rate)}
      totalSupply={Number(tokenInfo.totalSupply)}
      maxSupply={Number(tokenInfo.maxSupply)}
    />
  );
};

export default TokenInfoCard;