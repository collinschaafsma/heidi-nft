import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

export const ConnectButton: React.FC = () => {
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()

  return (
    <>
      {address ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <button onClick={() => connectWithMetamask()}>Connect with Metamask</button>
      )}
    </>
  )
}
