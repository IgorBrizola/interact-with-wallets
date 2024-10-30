import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import React, { FC, useState } from 'react';
import Link from 'next/link';

const PROGRAM_ID = `ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa`;
const DATA_ACCOUNT_PUBKEY = `Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod`;

export const PingButton: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [signa, setSigna] = useState("")

    const onClick = async () => {
        if (!connection || !publicKey) { return; }
     
        const programId = new web3.PublicKey(PROGRAM_ID);
        const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY);
        const transaction = new web3.Transaction();

        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: programDataAccount,
                    isSigner: false,
                    isWritable: true,
                },
            ],
            programId,
        });

        transaction.add(instruction);
    
        try {
    const { blockhash } = await connection.getLatestBlockhash();

    transaction.recentBlockhash = blockhash; 

    transaction.feePayer = publicKey; 

    const signature = await sendTransaction(transaction, connection);
    
    setSigna(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);

    console.log('Transação enviada com sucesso:', signature);
} catch (error) {
    if (error instanceof web3.TransactionExpiredBlockheightExceededError) {
        console.error('Transação expirou, tentando novamente...');
    } else {
        console.error('Erro ao enviar a transação:', error);
    }}
    }  

    return (
        <>
            <div className="flex flex-col items-center justify-between h-30">
                {
                    publicKey && (
                        <button onClick={onClick}
                            className="cursor-pointer transistion-all w-52 justify-center duration-500 hover:shadow-[0_15px_50px_-15px_#13b6da] p-[12px] rounded-[14px] flex bg-gradient-to-r from-purple-500 to-teal-500"
                        >
                            <span className="text-[1.9rem] font-light text-white uppercase">Ping!</span>
                        </button>
                    )
                }
                <span className='mt-12'>
                    {signa && (
                        <Link href={signa} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-t from-purple-500 to-teal-300 bg-clip-text text-transparent text-4xl font-normal hover:text-emerald-400 text-decoration-line: underline"
                        >
                            Solana Explorer
                        </Link>
                    )}
                </span>
            </div>
      </>
    );
};
