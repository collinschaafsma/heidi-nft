import Image from 'next/image'
import type { EditionDrop, EditionMetadata } from '@thirdweb-dev/sdk'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { useAddress } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { MintButton } from './MintButton'
import { ConnectButton } from './ConnectButton'

export const NFTList: React.FC = () => {
  const [nfts, setNFTs] = useState<EditionMetadata[]>([])
  const address = useAddress()
  const thirdWebSdk = new ThirdwebSDK(
    ethers.getDefaultProvider('https://polygon-mumbai.g.alchemy.com/v2/jbKZjYCkFHkgmwSjX_g8-KJLIZ_rNtcy'),
    {
      gasSettings: {
        maxPriceInGwei: 200000,
        speed: 'standard',
      },
    },
  )
  const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string
  const contract: EditionDrop = thirdWebSdk.getEditionDrop(nftContractAddress)

  useEffect(() => {
    const fetchNFTCollection = async () => {
      setNFTs(await contract.getAll())
    }

    fetchNFTCollection()
  }, [contract, address])

  return (
    <>
      {nfts?.length ? (
        nfts.map((nft: EditionMetadata, key: number) => (
          <>
            <div style={{ position: 'relative', width: '300px', height: '500px' }}>
              <div key={key}>
                {nft.metadata.name} <span>Supply: {nft.supply.toNumber()}</span>
              </div>
              <Image src={nft.metadata.image as string} alt={nft.metadata.name} objectFit="contain" layout="fill" />
            </div>
            <div>{address ? <MintButton /> : <ConnectButton />}</div>
          </>
        ))
      ) : (
        <>Loading the Heidi NFTs to mint!</>
      )}
    </>
  )
}
