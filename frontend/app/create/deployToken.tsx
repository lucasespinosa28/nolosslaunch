import { useForm, SubmitHandler } from 'react-hook-form';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { LAUNCHPADFACTORY_ADDRESS, STAKE_ADDRESS, SUSDE_ADDRESS, USDE_ADDRESS } from '../contract/addresses';
import abi from "./../contract/LaunchpadFactory.json";
import { parseEther } from 'viem';
import { generatePrivateKey } from 'viem/accounts';
import TransactionAlert from '@/components/TransactionAlert';
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';

type FormValues = {
    tokenName: string;
    tokenSymbol: string;
    maxSupply: number;
    rate: number;
    refundDate: number;
    initialOwner: string;
    imageUrl: string;
};

export default function DeployToken() {
    const salt = generatePrivateKey()
    const { data: hash, writeContract, isPending, isError, error } = useWriteContract()
    const account = useAccount();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>();
    const [showError, setShowError] = useState(true);
    const [tokenImageUrl, setTokenImageUrl] = useState<string | undefined>(undefined);
    const [uploadStatus, setUploadStatus] = useState<{ message: string, isError: boolean }>();

    useEffect(() => {
        const name = faker.word.words(3);
        const generateSymbol = () => (name.split(' ').map(word => word[0]).join('').toUpperCase());
        const randomName = name;
        const randomSymbol = generateSymbol();
        const randomSupply = Math.floor(Math.random() * 1000000) + 1000;
        const randomRate = Math.floor(Math.random() * 100) + 1;
        const randomDays = Math.floor(Math.random() * 365) + 1;
        const initialOwner = account.address as `0x${string}`
        setValue('tokenName', randomName);
        setValue('tokenSymbol', randomSymbol);
        setValue('maxSupply', randomSupply);
        setValue('rate', randomRate);
        setValue('refundDate', randomDays);
        setValue('initialOwner', initialOwner);
    }, [setValue, account.address]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        writeContract({
            address: LAUNCHPADFACTORY_ADDRESS,
            abi: abi,
            functionName: 'createLaunchpad',
            args: [
                data.tokenName,
                data.tokenSymbol,
                USDE_ADDRESS,
                SUSDE_ADDRESS,
                STAKE_ADDRESS,
                data.refundDate,
                parseEther(data.maxSupply.toString()),
                data.rate,
                data.initialOwner,
                salt,
                tokenImageUrl
            ]
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    return (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg  shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-white">Deploy a Token</h1>
            <p className="text-green-400 text-sm mb-4">Form filled with random values. You can edit them if needed.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {tokenImageUrl ? (
                    <div className="mb-4">
                        <Image src={tokenImageUrl} alt="Token" width={512} height={512} className="rounded-lg" />
                    </div>
                ) : (
                    <p className="mb-2">No token picture uploaded yet.</p>
                )}
                <h4 className="text-md font-semibold mb-2">Upload New Token Picture (Required)</h4>
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                            console.log("Files: ", res);
                            setTokenImageUrl(res[0].url);
                            setUploadStatus({ message: "Upload Completed", isError: false });
                        }
                    }}
                    onUploadError={(error: Error) => {
                        setUploadStatus({ message: `ERROR! ${error.message}`, isError: true });
                    }}
                />
                {uploadStatus && (
                    <div className={`mt-2 p-2 rounded ${uploadStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {uploadStatus.message}
                    </div>
                )}
                <div className="flex items-center">
                    <label htmlFor="tokenName" className="w-1/3 text-white">Token Name:</label>
                    <div className="w-2/3">
                        <input
                            id="tokenName"
                            type="text"
                            placeholder="Token Name"
                            {...register("tokenName", { required: "Token name is required" })}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.tokenName && <p className="text-red-500 text-sm mt-1">{errors.tokenName.message}</p>}
                    </div>
                </div>

                <div className="flex items-center">
                    <label htmlFor="tokenSymbol" className="w-1/3 text-white">Token Symbol:</label>
                    <div className="w-2/3">
                        <input
                            id="tokenSymbol"
                            type="text"
                            placeholder="Token Symbol"
                            {...register("tokenSymbol", { required: "Token symbol is required" })}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.tokenSymbol && <p className="text-red-500 text-sm mt-1">{errors.tokenSymbol.message}</p>}
                    </div>
                </div>

                <div className="flex items-center">
                    <label htmlFor="maxSupply" className="w-1/3 text-white">Initial Supply:</label>
                    <div className="w-2/3">
                        <input
                            id="maxSupply"
                            type="number"
                            placeholder="Initial Supply"
                            {...register("maxSupply", { required: "Initial supply is required", min: 0 })}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.maxSupply && <p className="text-red-500 text-sm mt-1">{errors.maxSupply.message}</p>}
                    </div>
                </div>

                <div className="flex items-center">
                    <label htmlFor="rate" className="w-1/3 text-white">Rate:</label>
                    <div className="w-2/3">
                        <input
                            id="rate"
                            type="number"
                            placeholder="Initial Rate"
                            {...register("rate", { required: "Initial rate is required", min: 0 })}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate.message}</p>}
                        <p className="text-gray-400 text-sm mt-1">
                            USDe 1 = {' '}
                            {watch('rate') ? (
                                <>
                                    {(1 / watch('rate')).toFixed(2)} {watch('tokenSymbol') || '[Symbol]'}
                                </>
                            ) : (
                                '[Rate]'
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-center">
                    <label htmlFor="refundDate" className="w-1/3 text-white">Days to Refund:</label>
                    <div className="w-2/3">
                        <input
                            id="refundDate"
                            type="number"
                            placeholder="Days to refund"
                            {...register("refundDate", { required: "Refund date is required" })}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.refundDate && <p className="text-red-500 text-sm mt-1">{errors.refundDate.message}</p>}
                    </div>
                </div>

                <div className="flex items-center">
                    <label htmlFor="initialOwner" className="w-1/3 text-white">Initial Owner:</label>
                    <div className="w-2/3 flex">
                        <input
                            id="initialOwner"
                            type="text"
                            placeholder="Initial Owner"
                            {...register("initialOwner", { required: "Initial owner is required" })}
                            className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isPending || !tokenImageUrl}
                    className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(isPending || !tokenImageUrl) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isPending ? 'Deploying...' : (tokenImageUrl ? 'Deploy' : 'Upload Image to Deploy')}
                </button>
            </form>
            {isError && showError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error.message}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg
                            className="fill-current h-6 w-6 text-red-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            onClick={() => setShowError(false)}
                        >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </span>
                </div>
            )}
            <TransactionAlert isConfirming={isConfirming} isConfirmed={isConfirmed} hash={hash} />
        </div>
    );
}