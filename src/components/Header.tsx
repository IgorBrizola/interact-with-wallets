import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

export const Header: FC = () => {
   const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
      <div className="h-[80px] w-full flex bg-neutral-900 flex-row items-center justify-between uppercase px-2 md:px-4 md:text-center">
        <div>
        <Image src="/solana-sol-logo.png" height="100" width="40" alt='logo solana' className='hidden md:flex'/>
        </div>
        <div>
        <span className='md:absolute md:top-3 md:left-0 md:right-0 font-medium text-balance bg-gradient-to-tr from-teal-300 to-fuchsia-500 bg-clip-text text-transparent md:text-5xl text-xl'>Program Ping</span>
        </div>
        <div>
        {isClient ? <WalletMultiButton /> : ''}     
        </div>
 </div>
  )
}
