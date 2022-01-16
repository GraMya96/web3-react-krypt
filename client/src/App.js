import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { account, transactions } from "./atoms/transactions/transactionsAtom";
import { checkIfWalletIsConnected, checkIfTransactionsExist } from "./atoms/transactions/transactionsUtils";
import Homepage from "./pages/Homepage";

export default function App() {

  const setCurrentAccount = useSetRecoilState( account );
  const setTransactions = useSetRecoilState( transactions );

  useEffect(() => {
    const setAccountAndTransactions = async () => {
      setCurrentAccount( await checkIfWalletIsConnected() );
      setTransactions( await checkIfTransactionsExist() );
    }
    setAccountAndTransactions();
  }, [])

  return (
    <Homepage />
  )
}


