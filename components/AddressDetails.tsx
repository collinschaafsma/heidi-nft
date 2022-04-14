import { useAddress } from '@thirdweb-dev/react'

export const AddressDetails: React.FC = () => {
  const address = useAddress()
  return <div>Address: {address ? address : 'who dis?'}</div>
}
