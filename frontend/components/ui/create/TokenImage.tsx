import React from 'react';
import Image from 'next/image';

interface TokenImageProps {
  imageUrl: string | undefined;
}

const TokenImage: React.FC<TokenImageProps> = ({ imageUrl }) => {
  return (
    <div className="w-full flex justify-center">
      {imageUrl ? (
        <Image src={imageUrl} alt="Token" width={512} height={512} className="rounded-lg shadow-md" />
      ) : (
        <p className="text-sm text-red-200 text-center">No image uploaded yet.</p>
      )}
    </div>
  );
};

export default TokenImage;