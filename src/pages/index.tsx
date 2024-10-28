import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { PingButton } from '../components/PingButton'
import Head from 'next/head'
import { BalanceDisplay } from '../components/BalanceDisplay'
import { Header } from '../components/Header'

const Home: NextPage = () => {

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
        <link rel="shortcut icon" href="/solana-sol-logo.png " sizes="any"/>
      </Head>
      <WalletContextProvider>
        <Header/>
        <div className={styles.AppBody}>
          <PingButton />
          <BalanceDisplay/>
        </div>
      </WalletContextProvider >
    </div>
  );
}

export default Home;