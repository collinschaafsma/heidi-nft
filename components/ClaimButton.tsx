import { useAddress } from '@thirdweb-dev/react'
import { ClaimJSONResponse } from '../lib/types/claim'
import { ConnectButton } from './ConnectButton'

export const ClaimButton: React.FC<{ tokenId: number }> = ({ tokenId }) => {
  const address = useAddress()
  const claimHandler = async () => {
    const claimResponse = await fetch('/api/claim', {
      method: 'POST',
      body: JSON.stringify({ address, tokenId }),
      headers: { 'Content-Type': 'application/json' },
    })

    const { data, errors }: ClaimJSONResponse = await claimResponse.json()

    if (claimResponse.ok) {
      console.log(data?.transactionHash)
    } else {
      const error = new Error(errors?.map((e) => e.message).join('\n') ?? 'unknown')
      console.log(error)
    }
  }

  return <>{address ? <button onClick={() => claimHandler()}>Claim & Mint NFT</button> : <ConnectButton />}</>
}
