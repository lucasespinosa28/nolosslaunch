export interface TokenFormData {
  tokenName: string;
  tokenSymbol: string;
  rate: number;
  refundDate: number;
  maxSupply: string;
  initialOnwer: `0x${string}`;
}

export interface TokenInfoData {
  description: string;
  website: string;
  telegram: string;
  discord: string;
  twitter: string;
  image: string;
}