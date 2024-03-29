import { useRecoilValue } from "recoil";
import { shortenAddress } from '../utlis/shortenAddress'
import { account, transactions } from "../atoms/transactions/transactionsAtom";
import useFetch from '../hooks/useFetch';

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, url, keyword, amount }) => {

    const gifUrl = useFetch({ keyword });

    return (
        <div className='bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl'>
            <div className='flex flex-col w-full items-center mt-3'>
                <div className='w-full mb-6 p-2 space-y-2'>

                    {/* From/To */}
                    <a
                        href={ ` https://ropsten.etherscan.io/address/${ shortenAddress( addressFrom ) }` }
                        target='_blank'
                        rel='noopener noreferrer'>
                        <p className='text-white text-base'>From: { shortenAddress( addressFrom )}</p>
                    </a>
                    <a
                        href={ ` https://ropsten.etherscan.io/address/${ shortenAddress( addressTo ) }` }
                        target='_blank'
                        rel='noopener noreferrer'>
                        <p className='text-white text-base'>To: { shortenAddress( addressTo )}</p>
                    </a>

                    {/* Message */}
                    <p className='text-white text-base'>Amount: { amount } ETH</p>
                    {
                        message && (
                            <>
                                <br />
                                <p className='text-white text-base'>Message: { message }</p>
                            </>
                        )
                    }

                </div>

                    {/* Gif */}
                    <img
                        src={ gifUrl && gifUrl !== '' ? gifUrl : url }
                        alt="Gif"
                        className='w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover' />

                    {/* Timestamp */}
                    <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
                        <p className='text-[#37C7DA] font-bold'>{ timestamp }</p>
                    </div>
            </div>
        </div>
    )
}

const Transactions = () => {

    const currentUser = useRecoilValue( account );
    const allTransactions = useRecoilValue( transactions );

    return (
        <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
            <div className='flex flex-col md:p-12 py-12 px-4'>
                {
                    currentUser
                    ? (
                        <h3 className='text-white text-3xl text-center my-2 mb-3'>
                            Latest Transactions
                        </h3>
                    )
                    : (
                        <h3 className='text-white text-3xl text-center my-2 mb-3'>
                            Connect your account to see the latest Transactions
                        </h3>
                    )
                }

                <div className='flex flex-wrap justify-center items-center text-white'>
                    { allTransactions.length > 0 &&
                        allTransactions.map( ( transaction, i ) => (
                            <TransactionCard key={ i } { ...transaction } />
                        ) ).reverse()
                    }
                </div>
            </div>
        </div>
    )
}

export default Transactions;