const HDWalletProvider = require('@truffle/hdwallet-provider');

// Replace these with your own mnemonic and Infura API key
const mnemonic = 'your twelve-word mnemonic here';
const infuraApiKey = 'your infura api key here';

module.exports = {
  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0", // Use a compatible compiler version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200 // Optimize for how many times you intend to run the code
        }
      }
    }
  },

  // Truffle network configuration
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 8545, // Standard Ethereum port
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraApiKey}`),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    // You can add more networks like rinkeby, mainnet, etc.
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your plugins if you're using any
  plugins: [
    // Example: "truffle-plugin-verify"
  ]
};
