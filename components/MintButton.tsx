import { useAddress } from '@thirdweb-dev/react'
import { ConnectButton } from './ConnectButton'

export const MintButton: React.FC = () => {
  const address = useAddress()
  const mintHandler = async () => {}

  return <>{address ? <button onClick={() => mintHandler()}>Mint NFT</button> : <ConnectButton />}</>
}
