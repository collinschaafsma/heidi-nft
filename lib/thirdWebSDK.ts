import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import { defaultProvider, alchemyApiKey } from './constants'

export const thirdWebSDK = new ThirdwebSDK(
  ethers.getDefaultProvider(defaultProvider, {
    alchemy: alchemyApiKey,
  }),
  {
    gasSettings: {
      maxPriceInGwei: 200000,
      speed: 'standard',
    },
  },
)
