// The main function is responsible to deploy the contract
const main = async () => {

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy(); // one specific instance of our contract

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

const runMain = async () => {
    try {
      await main();
      process.exit(0) // process was successful
    }
    catch (error) {
      console.error(error);
      process.exit(1);
    }
}

runMain();
