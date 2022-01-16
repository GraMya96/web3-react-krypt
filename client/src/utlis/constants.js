import abi from './Transactions.json';
export const contractABI = abi.abi;
// The big JSON object abi was just pasted into Transactions.json
// from smart-contract/artifacts/contracts/Transactions.sol/Transactions.json
// (artifacts folder was generated just after we deployed our contract
// to the ETH blockchain thorugh Hardhat and Alchemy)

export const contractAddress = '0x44b329aE3C35ffA7CFB4328f01d7Cd0b71be0d51'
// "Transactions deployed to" when we deploy our contract to the blockchain
// (Transactions.address in deploy.js)

// Now we have everything we need to interact with the blockchain
// and the smart contract we wrote from our React App