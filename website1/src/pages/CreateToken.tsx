import { faker } from '@faker-js/faker';
import React, { useState } from 'react';
import { useAccount } from 'wagmi'
import Compressor from 'compressorjs';

interface TokenFormData {
  name: string;
  symbol: string;
  description: string;
  countdownDays: string;
  maxSupply: string;
  price: string;
  initialOwner: `0x${string}`;
  website: string;
  tokenThumbnail: string;
}

const CreateToken: React.FC = () => {
  const account = useAccount()
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    description: '',
    countdownDays: '',
    maxSupply: '',
    price: '',
    initialOwner: account.address || '0x0',
    website: '',
    tokenThumbnail: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Upload failed');
        }
  
        const result = await response.json();
        setFormData(prevData => ({
          ...prevData,
          tokenThumbnail: result.imageUrl // Assuming the backend returns the URL of the uploaded image
        }));
      } catch (error) {
        console.error('Image upload failed:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement token creation logic here
    console.log(formData);
  };
  const generateRandomData = () => {
    setFormData({
      name: faker.company.name() + ' Token',
      symbol: faker.finance.currencyCode(),
      description: faker.lorem.paragraph(4),
      countdownDays: faker.number.int({ min: 1, max: 365 }).toString(),
      maxSupply: faker.number.int({ min: 1e6, max: 1e18 }).toString(),
      price: faker.finance.amount({ min: 0.01, max: 10, dec: 2 }),
      initialOwner: formData.initialOwner,
      website: faker.internet.url(),
      tokenThumbnail:formData.tokenThumbnail,
    });
  };
  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-[1280px]">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Your NoLossToken</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={generateRandomData}
            className="w-1/2 p-2 bg-green-600 text-white rounded hover:bg-green-700 ml-2"
          >
            Random Data
          </button>
          <div>
            <label htmlFor="name" className="block mb-2">Token Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="symbol" className="block mb-2">Token Symbol</label>
            <input
              type="text"
              id="symbol"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              value={formData.symbol}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="website" className="block mb-2">Website</label>
            <input
              type="url"
              id="website"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://example.com"
            />
          </div>
          <div>
          <label htmlFor="tokenThumbnail" className="block mb-2">Token Thumbnail</label>
          <input
            type="file"
            id="tokenThumbnail"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded bg-gray-800 text-white"
          />
        </div>
        {formData.tokenThumbnail && (
          <div>
            <img
              src={formData.tokenThumbnail}
              alt="Token Thumbnail"
              className="mt-2 max-w-full h-auto"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
          <div>
            <label htmlFor="tokenThumbnail" className="block mb-2">Token Thumbnail</label>
          </div>
          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="countdownDays" className="block mb-2">Countdown Days</label>
            <input
              type="number"
              id="countdownDays"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              min="1"
              value={formData.countdownDays}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="maxSupply" className="block mb-2">Max Supply</label>
            <input
              type="number"
              id="maxSupply"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              min="1"
              value={formData.maxSupply}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2">Price in USDe</label>
            <input
              type="number"
              id="price"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              step="0.000001"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="initialOwner" className="block mb-2">Initial Owner Address</label>
            <input
              type="text"
              id="initialOwner"
              className="w-full p-2 border rounded bg-gray-800 text-white"
              value={formData.initialOwner}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create Token
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateToken;