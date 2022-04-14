import { AddressDetails } from './AddressDetails'
import { ChainDetails } from './ChainDetails'

export const WalletDetails: React.FC = () => {
  return (
    <div>
      <h3>Wallet</h3>
      <AddressDetails />
      <ChainDetails />
    </div>
  )
}
