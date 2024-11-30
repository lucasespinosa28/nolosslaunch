import Image from 'next/image';
import Link from 'next/link';
import ProgressBar from './token/progressBar';

interface CardProps {
  address: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  totalSupply: number;
  maxSupply: number;
}

const calculateUSDPrice = (tokenPrice: number): number => {
  return 1 / tokenPrice;
};
const Card: React.FC<CardProps> = ({ address, name, symbol, image, price, totalSupply, maxSupply }) => {
  const usdPrice = calculateUSDPrice(price);
  return (
    <Link href={`/token/${address}`} className="block">
      <div className="border border-gray-700 rounded-lg overflow-hidden hover:border-indigo-400 transition-colors">
        <div className="aspect-square relative">
          <Image 
            src={image} 
            alt={name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold truncate">{name} ({symbol})</h4>
          <p className="text-sm text-gray-400">
            {price.toFixed(2)} {symbol} = $1 USDe
          </p>
          <p className="text-xs text-gray-500">
            (${usdPrice.toFixed(4)} USD per {symbol})
          </p>
          <ProgressBar totalSupply={totalSupply} maxSupply={maxSupply}/>
        </div>
      </div>
    </Link>
  );
};

export default Card;