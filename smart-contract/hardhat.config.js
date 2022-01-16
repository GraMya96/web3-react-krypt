require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/cdD36Ac1bxOMLtYwRF5S-_ulyHzzEYpD',
      accounts: [ '0204206f3d0356cee8d8e664d3ef752b5ac47ac215f10d9992e55ec42153e0de' ] // Metamask private key
    }
  }
}
