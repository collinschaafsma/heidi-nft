import Image from 'next/image'
import type { EditionDrop, EditionMetadata } from '@thirdweb-dev/sdk'
import { useAddress } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import { MintButton } from './MintButton'
import { ConnectButton } from './ConnectButton'
import { thirdWebSDK } from '../lib/thirdWebSDK'
import { nftContractAddress } from '../lib/constants'

export const NFTList: React.FC = () => {
  const [nfts, setNFTs] = useState<EditionMetadata[]>([])
  const address = useAddress()

  const contract: EditionDrop = thirdWebSDK.getEditionDrop(nftContractAddress)

  useEffect(() => {
    const fetchNFTCollection = async () => {
      try {
        setNFTs(await contract.getAll())
      } catch (error) {
        console.log(error)
      }
    }

    fetchNFTCollection()
  }, [contract, address])

  return (
    <>
      {nfts?.length ? (
        nfts.map((nft: EditionMetadata, key: number) => (
          <div key={key}>
            <div>
              <h3>{nft.metadata.name}</h3>
              <span>{nft.metadata.description}</span>
              <div>{address ? <MintButton /> : <ConnectButton />}</div>
            </div>
            <div style={{ position: 'relative', width: '300px', height: '500px' }}>
              <Image
                src={nft.metadata.image as string}
                alt={nft.metadata.name}
                objectFit="contain"
                layout="fill"
                priority
              />
            </div>
          </div>
        ))
      ) : (
        <>Loading the Heidi NFTs to mint!</>
      )}
    </>
  )
}
