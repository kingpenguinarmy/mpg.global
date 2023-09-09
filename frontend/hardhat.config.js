// hardhat.config.js

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
