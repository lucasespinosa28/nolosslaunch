"use client"
import { UploadButton } from '@/utils/uploadthing';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { parseEther } from 'viem';
import { generatePrivateKey } from 'viem/accounts';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import abi from "./../contract/LaunchpadFactory.json";
import { LAUNCHPADFACTORY_ADDRESS, STAKE_ADDRESS, SUSDE_ADDRESS, USDE_ADDRESS } from '../contract/addresses';
import DeployToken from './deployToken';
interface TokenFormData {
  tokenName: string;
  tokenSymbol: string;
  rate: number;
  refundDate: number;
  maxSupply: string;
  initialOnwer: `0x${string}`;
}

interface TokenInfoData {
  description: string;
  website: string;
  telegram: string;
  discord: string;
  twitter: string;
  image: string;
}

export default function Create() {
  const account = useAccount()
  const [tokenFormData, setTokenFormData] = useState<TokenFormData>({
    tokenName: '',
    tokenSymbol: '',
    rate: 0,
    refundDate: 0,
    maxSupply: '',
    initialOnwer: account.address || "0x0"
  });

  const [tokenInfoData, setTokenInfoData] = useState<TokenInfoData>({
    description: '',
    website: '',
    telegram: '',
    discord: '',
    twitter: '',
    image: ''
  });

  const handleTokenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTokenFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleInfoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setTokenInfoData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Token Form submitted:', tokenFormData);
    handleCreateLaunchpad();
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Info Form submitted:', tokenInfoData);
  };
  const fillRandomData = () => {
    const name = faker.word.words(3)
    function generateSymbol() {
      return (name[0][0] + name[1][0] + name[1][0]).toUpperCase();
    }
    const randomTokenData: TokenFormData = {
      tokenName: name,
      tokenSymbol: generateSymbol(),
      rate: faker.number.int({ min: 1, max: 50 }),
      refundDate: faker.number.int({ min: 1, max: 365 }),
      maxSupply: faker.number.int({ min: 1000000, max: 1000000000 }).toString(),
      initialOnwer: account.address || "0x0"
    };
    const randomInfoData: TokenInfoData = {
      description: faker.lorem.paragraph(),
      website: faker.internet.url(),
      telegram: faker.internet.userName(),
      discord: faker.internet.userName(),
      twitter: faker.internet.userName(),
      image: ''
    };
    setTokenFormData(randomTokenData);
    setTokenInfoData(randomInfoData);
  };

  const { data: hash, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  const handleCreateLaunchpad = async () => {
    writeContract({
      address: LAUNCHPADFACTORY_ADDRESS,
      abi: abi,
      functionName: 'createLaunchpad',
      args: [
        tokenFormData.tokenName,
        tokenFormData.tokenSymbol,
        USDE_ADDRESS,
        SUSDE_ADDRESS,
        STAKE_ADDRESS,
        BigInt(tokenFormData.refundDate),
        parseEther(tokenFormData.maxSupply),
        parseEther(tokenFormData.rate.toString()),
        account.address,
        generatePrivateKey()
      ]
    })
  }

  return (
    <main className="p-8 flex justify-center">
      <DeployToken />
    </main>
  );
}