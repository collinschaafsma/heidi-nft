import type { NextPage } from 'next'
import Head from 'next/head'
import { NFTList } from '../components/NFTList'
import { WalletDetails } from '../components/WalletDetails'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Heidi NFT Drop</title>
        <meta name="description" content="Collect all five Heidi NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <WalletDetails />
        <NFTList />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
