import { http, createConfig } from 'wagmi'
import { foundry, sepolia } from 'wagmi/chains'

export const config = createConfig({
    chains: [foundry, sepolia],
    transports: {
      [foundry.id]: http(),
      [sepolia.id]: http(),
    },
  })