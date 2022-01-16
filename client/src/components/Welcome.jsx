import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { Loader } from './'
import { useRecoilState, useSetRecoilState } from "recoil";
import { account, count, form } from "../atoms/transactions/transactionsAtom";
import { connectWalletFromMetamask, sendTransaction } from "../atoms/transactions/transactionsUtils";
import { useState, useEffect } from "react";

const COMMON_STYLES = 'font-semibold min-h-[70px] sm:px-0 px-2 sm:min-w-[115px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Input = props => (
    <input  { ...props } />
)

const Welcome = () => {

    const [ currentAccount, setCurrentAccount ] = useRecoilState( account );
    const [ formData, setFormData ] = useRecoilState( form );
    const setTransactionCount = useSetRecoilState( count );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ error, setError ] = useState( false );

    // User Message disappearing after 1.2s
    useEffect(() => {
        if( error && error !== '' ) {
            setTimeout( () => setError(''), 2000 )
        }
    }, [ error ])

    const connectWallet = () => {
        setCurrentAccount( connectWalletFromMetamask() );
    }

    const handleInputChange = ( e ) => {

        setFormData( prevState => (
            {
                ...prevState,
                [ e.target.name ] : e.target.value
            }
        ))
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);

        const { addressTo, amount, message, keyword } = formData;

        if( ( !currentAccount || currentAccount === '' ) ||
            ( !addressTo || addressTo === '' ) ||
            ( !amount || amount === '' ) ||
            ( !message || message === '' ) ||
            ( !keyword || keyword === '' ) ) return;

        const transactionData = await sendTransaction( currentAccount, addressTo, amount, message, keyword );

        if( transactionData && transactionData.message ) {// if error
            setError( transactionData.message );
        }
        else {
            const { transactionsCount } = transactionData;
            setTransactionCount( transactionsCount.toNumber() );
        }

        setIsLoading(false);
    }

    return (
        <div className='flex w-full justify-center items-center px-5'>
            <div className="flex mf:flex-row flex-col items-start justify-between my-10 md:my-16">

                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 text-base w-11/12">Explore the crypto world. Buy and sell cryptocurrencies </p>
                    {
                        !currentAccount && (
                            <button
                                type="button"
                                className="flex flex-row my-5 justify-center text-white items-center
                                bg-[#2952e3] rounded-full cursor-pointer hover:bg-[#2546bd] py-2"
                                onClick={ connectWallet }>
                                <p className="font-semibold">Connect Wallet</p>
                            </button>
                        )
                    }


                    {/* Services Grid */}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${ COMMON_STYLES }`}>
                            Reliability
                        </div>
                        <div className={ COMMON_STYLES }>
                            Security
                        </div>
                        <div className={`sm:rounded-tr-2xl ${ COMMON_STYLES }`}>
                            Ethereum
                        </div>
                        <div className={`sm:rounded-bl-2xl ${ COMMON_STYLES }`}>
                            Web 3.0
                        </div>
                        <div className={ COMMON_STYLES }>
                            Low Fees
                        </div>
                        <div className={`rounded-br-2xl ${ COMMON_STYLES }`}>
                            Blockchain
                        </div>
                    </div>
                </div>


                <div className="flex flex-col flex-1 items-center justify-start w-full
                    mt-10 mf:mt-0">
                    <div className="p-3 justify-end items-center flex-col rounded-xl
                        h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>

                            <div>
                                <p className="text-white font-light text-sm truncate">
                                    { currentAccount }
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {
                        error && error !== ''
                            ?  (
                                <div className="mt-1 mb-4 bg-red-700 px-4 py-1 font-md">
                                    <p className='font-bold text-white'>Error: { error }</p>
                                </div>
                            )
                            : null
                    }

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input
                            type="text"
                            name="addressTo"
                            placeholder="Address To"
                            onChange={ e => handleInputChange(e, e.target.name) }
                            value={ formData.addressTo }
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism border-none"
                        />
                        <Input
                            type="number"
                            name="amount"
                            step="0.0001"
                            placeholder="Amount (ETH)"
                            onChange={ e => handleInputChange(e, e.target.name) }
                            value={ formData.amount }
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism border-none"
                        />
                        <Input
                            type="text"
                            name="keyword"
                            placeholder="Keyword (Gif)"
                            onChange={ e => handleInputChange(e, e.target.name) }
                            value={ formData.keyword }
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism border-none"
                        />
                        <Input
                            type="text"
                            name="message"
                            placeholder="Enter Message"
                            onChange={ e => handleInputChange(e, e.target.name) }
                            value={ formData.message }
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism border-none"
                        />

                        <div className="h-[1px] w-full bg-gray-400 my-2"></div>

                        {
                            isLoading
                                ? <Loader />
                                : (
                                    <button
                                        type="button"
                                        onClick={ handleSubmit }
                                        className="text-white w-full mt-2 border-[1px] transition
                                            font-semibold p-2 border-[#3d4f7x] rounded-full cursor-pointer hover:bg-white hover:text-[#181C2E]">
                                        Send Now
                                    </button>
                                )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Welcome;