import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

export const BalanceDisplay: FC = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const updateBalance = async () => {
      if (!connection || !publicKey) {
        console.error("Wallet not connected or connection unavailable");
        return; 
      }

      try {
        const subscriptionId = connection.onAccountChange(
          publicKey,
          updatedAccountInfo => {
            if (updatedAccountInfo) {
              setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
            }
          },
          {
            commitment: "confirmed"
          }
        );

  
        const accountInfo = await connection.getAccountInfo(publicKey);

        if (accountInfo) {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        } else {
          throw new Error("Account info not found");
        }

        return () => {
          connection.removeAccountChangeListener(subscriptionId);
        };
      } catch (error) {
        console.error("Failed to retrieve account info:", error);
      }
    };

    updateBalance();
  }, [connection, publicKey]);

  return (
    <div>
      <p className="text-2xl font-bold mt-12">{publicKey ? `${balance.toPrecision(3)} SOL` : "Wallet not connected!"}</p>
    </div>
  );
};
