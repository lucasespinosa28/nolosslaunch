"use client"
import { useAccount } from "wagmi";
import SUSDEIcon from "../../contract/token/sude";
import TokenInfo from "../../contract/token/tokenInfo";
import USDEIcon from "../../contract/token/usde";
import { USDE_ADDRESS, StakedUSDeV2_ADDRESS } from "../../contract/addresses";
import Container from "@/components/Container";
//0xAF6300eF2d0c14B949488f9AB460E4e3fA56B9Eb
export default function Faucet() {
  const account = useAccount()
  return (<Container>
    <TokenInfo contractAddress={USDE_ADDRESS} userAddress={account.address} icon={<USDEIcon width={32} height={32} />} />
    <TokenInfo contractAddress={StakedUSDeV2_ADDRESS} userAddress={account.address} icon={<SUSDEIcon width={32} height={32} />} />
  </Container>)
}