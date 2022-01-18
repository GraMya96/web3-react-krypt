import { contractABI, contractAddress } from '../../utlis/constants';
const { ethers } = require("ethers");

export const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider( window.ethereum );
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract( contractAddress, contractABI, signer );

    return transactionContract;
    // this is the most important part, this is OUT transaction contract, which returns a big object
    // containing also the function we created in our Solidity Smart Contract
}

export const getAllTransactions = async () => {
    try {
        if( !window.ethereum ) return alert('Please install Metamask');
        // This property of the window object exists because we installed
        // and setup Metamask

        const transactionContract = getEthereumContract();
        const availableTransactions = await transactionContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map( transaction => (
            {
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date( transaction.timestamp.toNumber() * 1000 ).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt( transaction.amount._hex ) / (10 ** 18)
            }
        ) );

        return structuredTransactions;
    }
    catch (error) {
        console.log(error);
    }
}

export const checkIfWalletIsConnected = async () => {
    try {
        if( !window.ethereum ) return alert('Please install Metamask');
        // This property of the window object exists because we installed
        // and setup Metamask

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            // console.log('Please connect to MetaMask.');
            return;
        }
        else {
            return accounts[0];
        }
    }
    catch( error ) {
        console.log(error);
        throw new Error("No Ethereum Object!");
    }

}

export const connectWalletFromMetamask = async () => {
    try {
        if( !window.ethereum ) return alert('Please install Metamask');

        const requestAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (requestAccounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        }
        else {
            return requestAccounts[0];
        }
    }
    catch( error ) {
        console.log(error);
        throw new Error("No Ethereum Object!");
    }
}

export const checkIfTransactionsExist = async () => {
    try {
        const transactionContract = getEthereumContract();
        const transactionCount = await transactionContract.getTransactionsCount();

        window.localStorage.setItem('transactionCount', transactionCount);
        return getAllTransactions();
    }
    catch (error) {
        console.log(error);
        throw new Error('No Transations');
    }
}

export const sendTransaction = async ( currentAccount, addressTo, amount, message, keyword ) => {
    try {
        if( !window.ethereum ) return alert('Please install Metamask');

        const transactionContract = getEthereumContract();

        const parsedAmount = ethers.utils.parseEther( amount );

        // We have our transaction contract... it's time
        // to make an actual transaction
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', //Hex value for 21000 GWEI -> 0.000021 ETH
                value: parsedAmount._hex
            }]
        })

        // And then we store our transaction to the blockchain...
        // We defined and created this function in our Solidity Contract,
        // but now it is available in JS in our transactionContract too
        const transactionHash = await transactionContract.addToBlockchain( addressTo, parsedAmount, message, keyword );

        await transactionHash.wait();
        // now we know that the transaction is over...

        const transactionsCount = await transactionContract.getTransactionsCount();

        return { transactionHash, transactionsCount };
    }
    catch( error ) {
        return error;
    }
}