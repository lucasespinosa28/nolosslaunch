import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  tokenId: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description, tokenId }) => {
  return (
    <Link href={`/token/${tokenId}`} className="block">
      <div className="bg-gray-900 p-4 rounded shadow transition duration-300 ease-in-out hover:bg-gray-800">
        <Image 
          src={imageSrc} 
          alt={`${title} Image`} 
          className="mb-4 rounded" 
          width={1024} 
          height={1024} 
        />
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Card;