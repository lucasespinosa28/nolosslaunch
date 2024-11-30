"use client"
import { useAccount } from "wagmi";
import SUSDEIcon from "../../components/ui/contract/sude";
import TokenInfo from "../../components/ui/contract/tokenInfo";
import USDEIcon from "../../components/ui/contract/usde";
import { USDE_ADDRESS, StakedUSDeV2_ADDRESS } from "../../components/ui/contract/addresses";
import Container from "@/components/ui/Container";
//0xAF6300eF2d0c14B949488f9AB460E4e3fA56B9Eb
export default function Faucet() {
  const account = useAccount()
  return (<Container>
    <TokenInfo contractAddress={USDE_ADDRESS} userAddress={account.address} icon={<USDEIcon width={32} height={32} />} />
    <TokenInfo contractAddress={StakedUSDeV2_ADDRESS} userAddress={account.address} icon={<SUSDEIcon width={32} height={32} />} />
  </Container>)
}