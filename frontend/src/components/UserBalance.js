import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const UserBalance = ({ account }) => {
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  // Replace with your ERC-20 token contract ABI and address
  const tokenABI = [...];  // Your ERC-20 Token ABI
  const tokenAddress = '0x...';  // Your ERC-20 Token Address

  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

  useEffect(() => {
    // Fetch Ether balance
    const fetchEthBalance = async () => {
      const balance = await web3.eth.getBalance(account);
      setEthBalance(web3.utils.fromWei(balance, 'ether'));
    };

    // Fetch Token balance
    const fetchTokenBalance = async () => {
      const balance = await tokenContract.methods.balanceOf(account).call();
      setTokenBalance(web3.utils.fromWei(balance, 'ether'));
    };

    if (account) {
      fetchEthBalance();
      fetchTokenBalance();
    }

    // Listen for account changes and update balance
    window.ethereum.on('accountsChanged', (accounts) => {
      fetchEthBalance();
      fetchTokenBalance();
    });

  }, [account]);

  return (
    <div>
      <h3>User Balance</h3>
      <p>Ether Balance: {ethBalance} ETH</p>
      <p>Token Balance: {tokenBalance} TOKEN</p>
    </div>
  );
};

export default UserBalance;
