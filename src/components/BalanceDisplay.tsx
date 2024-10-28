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
        return; // Adicione um return aqui para sair da função se não houver conexão ou chave pública
      }

      try {
        // Registra o listener para alterações na conta
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

        // Atualiza o saldo inicialmente
        const accountInfo = await connection.getAccountInfo(publicKey);

        if (accountInfo) {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        } else {
          throw new Error("Account info not found");
        }

        // Limpa o listener quando o componente for desmontado ou o publicKey mudar
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
