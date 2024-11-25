"use client"
import { UploadButton } from '@/utils/uploadthing';
import { useState } from 'react';

interface TokenFormData {
  tokenName: string;
  tokenSymbol: string;
  description: string;
  website: string;
  telegram: string;
  discord: string;
  twitter: string;
  price: string;
  refundDate: string;
  maxSupply: string;
}


export default function Create() {
  const [step, setStep] = useState(1);

  // Add state variables for each input field
  const [formData, setFormData] = useState<TokenFormData>({
    tokenName: '',
    tokenSymbol: '',
    description: '',
    website: '',
    telegram: '',
    discord: '',
    twitter: '',
    price: '',
    refundDate: '',
    maxSupply: ''
  });


  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend or blockchain
    setStep(5); // Move to success step
  };
  return (
    <main className="p-8 flex justify-center">
      <div className="w-full max-w-[1280px]">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Your Token</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 1: Token Identity</h2>
              <p className="mb-4 text-gray-300">Start by naming your token and choosing a symbol. This will be how your token is identified on the blockchain.</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2">Token Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                    value={formData.tokenName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="symbol" className="block mb-2">Token Symbol</label>
                  <input
                    type="text"
                    id="symbol"
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                    value={formData.tokenSymbol}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 2: Token Details</h2>
              <p className="mb-4 text-gray-300">Provide more information about your token and how people can connect with your project.</p>
              <div className="space-y-4">
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
                  
                  {/* <label htmlFor="image" className="block mb-2">Upload Thumbnail</label>
                  <input type="file" id="image" className="w-full p-2 border rounded bg-gray-800 text-white" accept="image/*" /> */}
                </div>
                <div>
                  <label htmlFor="website" className="block mb-2">Website URL</label>
                  <input
                    type="url"
                    id="website"
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                    value={formData.website}
                    onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="telegram" className="block mb-2">Telegram</label>
                  <input
                    type="text"
                    id="telegram"
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                    value={formData.telegram}
                    onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="discord" className="block mb-2">Discord</label>
                  <input
                    type="text"
                    id="discord"
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                    value={formData.discord}
                    onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="twitter" className="block mb-2">Twitter</label>
                  <input
                    type="text"
                    id="twitter"
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                    value={formData.twitter}
                    onChange={handleInputChange} />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 3: Token Economics</h2>
              <p className="mb-4 text-gray-300">Set the price and refund date for your token. This determines how much each token costs and when investors can request refunds.</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="price" className="block mb-2">Price for 1 Token in USDe</label>
                  <input
                    type="number"
                    id="price"
                    className="w-full p-2 border rounded bg-gray-800 text-white" step="0.000001" min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="refundDate" className="block mb-2">Refund Date</label>
                  <input
                    type="date"
                    id="refundDate"
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                    value={formData.refundDate}
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
                    step="1"
                    value={formData.maxSupply}
                    onChange={handleInputChange} />
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 4: Create Your Token</h2>
              <p className="mb-4 text-gray-300">Review your information and create your token. This action will deploy your token to the blockchain.</p>
              <div className="space-y-2 text-gray-300">
                <p><strong>Name:</strong> {formData.tokenName}</p>
                <p><strong>Symbol:</strong> {formData.tokenSymbol}</p>
                <p><strong>Description:</strong> {formData.description}</p>
                <p><strong>Website:</strong> {formData.website}</p>
                <p><strong>Telegram:</strong> {formData.telegram}</p>
                <p><strong>Discord:</strong> {formData.discord}</p>
                <p><strong>Twitter:</strong> {formData.twitter}</p>
                <p><strong>Price:</strong> {formData.price} USDe</p>
                <p><strong>Refund Date:</strong> {formData.refundDate}</p>
                <p><strong>Max Supply:</strong> {formData.maxSupply}</p>
              </div>
              <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      alert("Upload Completed");
                    }}
                    onBeforeUploadBegin={(files) => {
                      // Preprocess files before uploading (e.g. rename them)
                      return files.map(
                        (f) => new File([f], "renamed-" + f.name, { type: f.type }),
                      );
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
              <button type="submit" className="bg-indigo-400 text-black px-4 py-2 rounded hover:bg-indigo-300 w-full">Create Token</button>
            </div>
          )}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Success!</h2>
              <p className="mb-4 text-gray-300">Your token has been created successfully. Here's a summary of your token:</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && step < 5 && <button type="button" onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500">Previous</button>}
            {step < 4 && <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Next</button>}
          </div>
        </form>
      </div>
    </main>
  );
}