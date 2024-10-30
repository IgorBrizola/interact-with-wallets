import { NextPage } from 'next'
import WalletContextProvider from '../components/WalletContextProvider'
import { PingButton } from '../components/PingButton'
import Head from 'next/head'
import { BalanceDisplay } from '../components/BalanceDisplay'
import { Header } from '../components/Header'

const Home: NextPage = () => {

  return (
    <div className="flex flex-col bg-[#282c34] min-h-screen items-center" >
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
        <div className="pt-[50px] flex flex-col justify-center items-center">
          <PingButton />
          <BalanceDisplay/>
        </div>
      </WalletContextProvider >
    </div>
  );
}

export default Home;