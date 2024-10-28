import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

export const Header: FC = () => {
   const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
      <div className="h-[80px] flex bg-neutral-950 flex-row items-center justify-between uppercase px-4 text-center">
            <Image src="/solana-sol-logo.png" height="100" width="50" alt='logo solana'/>
            <span className='text-font-bold font-bold text-balance bg-gradient-to-tr from-teal-300 to-fuchsia-500 bg-clip-text text-transparent text-4xl'>Program Ping Solana</span>
                {isClient ? <WalletMultiButton/> : ''}     
 </div>
  )
}
