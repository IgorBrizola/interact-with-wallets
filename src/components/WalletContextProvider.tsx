import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js'
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = web3.clusterApiUrl('devnet')
	const wallets = useMemo(()=> [],[]) 

	return (
		<ConnectionProvider endpoint={endpoint}>
	    <WalletProvider wallets={wallets} autoConnect>
	      <WalletModalProvider>
	        { children }
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
	)
}

export default WalletContextProvider