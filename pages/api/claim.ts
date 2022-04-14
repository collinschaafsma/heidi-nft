import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import type { EditionDrop } from '@thirdweb-dev/sdk'
import { nftContractAddress, defaultProvider, alchemyApiKey } from '../../lib/constants'
import type { TransactionResult } from '@thirdweb-dev/sdk'
import type { ClaimJSONResponse } from '../../lib/types/claim'

const thirdWebSDKWrite = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.MINTER_PRIVATE_KEY as string,
    ethers.getDefaultProvider(defaultProvider, {
      alchemy: alchemyApiKey,
    }),
  ),
  {
    gasSettings: {
      maxPriceInGwei: 200000,
      speed: 'standard',
    },
  },
)

const handler = async (req: NextApiRequest, res: NextApiResponse<ClaimJSONResponse>) => {
  if (req.method !== 'POST') {
    res.status(405).json({ errors: [{ message: 'POST Request only' }] })
  }

  const { address, tokenId } = req.body
  try {
    const contract: EditionDrop = thirdWebSDKWrite.getEditionDrop(nftContractAddress)
    const tx: TransactionResult = await contract.claimTo(address as string, tokenId, 1)
    res.status(200).json({ data: { transactionHash: tx.receipt.transactionHash } })
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    res.status(500).json({ errors: [{ message }] })
  }
}

export default handler
