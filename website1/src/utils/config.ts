import { metaMask } from '@wagmi/connectors'
import { http, createConfig, injected } from '@wagmi/core'
import { foundry, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [foundry, sepolia],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [foundry.id]: http(),
    [sepolia.id]: http(),
  },
})