import { useChainId } from '@thirdweb-dev/react'

export const ChainDetails: React.FC = () => {
  const chainId = useChainId()
  return <div>Chain: {chainId ? chainId : 'not connected'}</div>
}
