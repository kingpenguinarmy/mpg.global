const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // Initialize Web3
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Replace with your RPC URL

    // Read ABI and Bytecode
    const abi = JSON.parse(fs.readFileSync(path.join(__dirname, './path/to/SkillLevelVerifierABI.json'), 'utf8'));
    const bytecode = fs.readFileSync(path.join(__dirname, './path/to/SkillLevelVerifierBytecode.json'), 'utf8');

    // Contract Initialization
    const contract = new web3.eth.Contract(abi);

    // Get deployer account and unlock it
    const accounts = await web3.eth.getAccounts();
    const deployerAccount = accounts[0]; // Assuming the deployer account is the first one
    await web3.eth.personal.unlockAccount(deployerAccount, 'your-password', 600); // Replace 'your-password'

    // Fetch gas price from the network
    const gasPrice = await web3.eth.getGasPrice();

    // Deploy Contract
    const deployedContract = await contract.deploy({ data: bytecode })
      .send({
        from: deployerAccount,
        gas: 2000000,
        gasPrice
      });

    console.log(`Contract deployed at address: ${deployedContract.options.address}`);

    // Verify Contract Deployment
    const code = await web3.eth.getCode(deployedContract.options.address);
    if (code.length <= 2) {
      throw new Error('Contract failed to deploy');
    }

    // Listen for SkillLevelVerified event
    deployedContract.events.SkillLevelVerified({}, (error, event) => {
      if (error) {
        console.error('Error in SkillLevelVerified event:', error);
      } else {
        console.log('SkillLevelVerified event:', event);
      }
    });

  } catch (error) {
    console.error('Deployment failed:', error);
  }
}

main();
