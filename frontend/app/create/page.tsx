"use client"
import { useState } from 'react';
import Container from '@/components/ui/Container';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import TokenImage from '@/components/ui/create/TokenImage';
import ImageUploader from '@/components/ui/create/ImageUploader';
import FormField from '@/components/ui/create/FormField';
import { fillRandomData } from '@/utils/fillRandomData';
import { FormValues } from '@/types/FormTypes';
import { useCreateToken } from '@/hooks/contract/write/useCreateToken';

export default function Create() {
  const [tokenImageUrl, setTokenImageUrl] = useState<string | undefined>(undefined);
  const [uploadStatus, setUploadStatus] = useState<{ message: string, isError: boolean }>();
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>();
  const account = useAccount();
  const { createToken, hash } = useCreateToken();
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}` | undefined,
  });


  const handleImageUpload = (url: string) => {
    setTokenImageUrl(url);
    setUploadStatus({ message: "Upload Completed", isError: false });
  };

  const handleUploadError = (error: Error) => {
    setUploadStatus({ message: `ERROR! ${error.message}`, isError: true });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!tokenImageUrl) {
      alert('Please upload a token image');
      return;
    }

    try {
      await createToken(
        data.tokenName,
        data.tokenSymbol,
        tokenImageUrl,
        data.countdownDays,
        data.rate,
        data.maxSupply.toString()
      );
    } catch (err) {
      console.error('Error creating launchpad:', err);
    }
  };
  const { address } = useAccount();
  if (!address) {
    return (
      <Container>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Warning</p>
          <p>Please connect your wallet.</p>
        </div>
      </Container>
    );
  }
  return (
    <Container>
    <section className="flex flex-col items-center space-y-8 w-full max-w-[768px] mx-auto bg-gradient-to-b from-gray-800 to-gray-900 p-10 rounded-2xl shadow-2xl">
      <h2 className="text-4xl font-bold mb-2 text-white">Create New Token</h2>
      <p className="text-indigo-300 text-center mb-8 max-w-md">
        Launch your token on our platform. Fill in the details below to set up your token's properties and initial distribution parameters.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="mb-8">
          <TokenImage imageUrl={tokenImageUrl} />
          <ImageUploader onImageUpload={handleImageUpload} onUploadError={handleUploadError} />
          {uploadStatus && (
            <p className={`mt-2 text-sm ${uploadStatus.isError ? 'text-red-400' : 'text-green-400'}`}>
              {uploadStatus.message}
            </p>
          )}
        </div>
        <FormField
          label="Token Name"
          name="tokenName"
          type="text"
          register={register}
          error={errors.tokenName}
          description="The full name of your token (e.g., 'Ethereum')."
        />
        <FormField
          label="Token Symbol"
          name="tokenSymbol"
          type="text"
          register={register}
          error={errors.tokenSymbol}
          description="A short abbreviation for your token (e.g., 'ETH')."
        />
        <FormField
          label="Countdown Days"
          name="countdownDays"
          type="number"
          register={register}
          error={errors.countdownDays}
          description="The number of days until the token launch is complete."
        />
        <FormField
          label="Rate"
          name="rate"
          type="number"
          register={register}
          error={errors.rate}
          description={`The initial exchange rate between USDe and your token. USDe 1 = ${watch('rate') ? (1 / watch('rate')).toFixed(8) : '[Rate]'} ${watch('tokenSymbol') || '[Symbol]'}`}
        />
        <FormField
          label="Max Supply"
          name="maxSupply"
          type="number"
          register={register}
          error={errors.maxSupply}
          description="The maximum number of tokens that can ever be created."
        />
        <div className="flex flex-col space-y-4 mt-8">
          <Button
            type="submit"
            disabled={!tokenImageUrl}
            className="w-full py-4 px-6 rounded-lg shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            Create Token
          </Button>
          <Button
            variant='outline'
            onClick={() => { fillRandomData(setValue, account.address) }}
            className="w-full py-3 px-6 rounded-lg shadow-md text-sm font-semibold text-indigo-300 bg-transparent border border-indigo-500 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            Fill with Random Data
          </Button>
        </div>
      </form>
      {isError && <p className="text-red-500 mt-4">Error: {error?.message}</p>}
      {isLoading && <p className="text-yellow-500 mt-4">Transaction confirming...</p>}
      {isSuccess && <p className="text-green-500 mt-4">Launchpad created successfully!</p>}
      {hash && (
        <p className="text-blue-400 mt-4">
          Transaction hash: <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">{hash}</a>
        </p>
      )}
    </section>
  </Container>
  );
}