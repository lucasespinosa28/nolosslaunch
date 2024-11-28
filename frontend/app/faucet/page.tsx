"use client"
import { useAccount } from "wagmi";
import SUSDEIcon from "../contract/token/sude";
import TokenInfo from "../contract/token/tokenInfo";
import USDEIcon from "../contract/token/usde";
import { USDE_ADDRESS, SUSDE_ADDRESS } from "../contract/addresses";
//0xAF6300eF2d0c14B949488f9AB460E4e3fA56B9Eb
export default function Faucet() {
  const account = useAccount()
  return (<div>
    <TokenInfo contractAddress={USDE_ADDRESS} userAddress={account.address} icon={<USDEIcon width={32} height={32} />} />
    <TokenInfo contractAddress={SUSDE_ADDRESS} userAddress={account.address} icon={<SUSDEIcon width={32} height={32} />} />
    <TokenInfo contractAddress={"0xfA4f7bD71080d85205E9FecBC170374D928B73b4"} userAddress={account.address} icon={<></>} />
  </div>)
}