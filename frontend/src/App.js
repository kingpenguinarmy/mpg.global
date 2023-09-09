/**
 * Main Application File
 * 
 * This file serves as the entry point for the React application.
 * It sets up the Web3 instance, initializes smart contracts, and renders the main components.
 */

// Import required libraries and components
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { UserProvider, useUser } from './context/UserContext';
import NotificationSystem from './components/NotificationSystem';
import { LanguageProvider, useLanguage } from './LanguageContext';
import AdvancedContractInteraction from './AdvancedContractInteraction';
import UserBalance from './UserBalance';
import NetworkInfo from './NetworkInfo';
import UserTypePanel from './components/UserTypePanel';
import FreelancerAgreement from '../contracts/FreelancerAgreement.json';
import Web3 from 'web3';

// Initialize Web3 instance
// This sets up the Web3 instance for interacting with the Ethereum blockchain
let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// Contract ABI and address
// ABI and address are essential for interacting with smart contracts
const ABI = []; // Replace with your contract's ABI
const contractAddress = "0x..."; // Replace with your contract's address
const myContract = new web3.eth.Contract(ABI, contractAddress);

// Lazy imports for LoginForm and SignupForm components
// This improves performance by only loading these components when they are needed
const LoginForm = lazy(() => import('./components/LoginForm'));
const SignupForm = lazy(() => import('./components/SignupForm'));


/**
 * Function to handle sending transactions
 * 
 * This function allows users to send transactions to a specified Ethereum address.
 */
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");
  const amountInWei = web3.utils.toWei(amount, "ether");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTransactionHash("");
    setError("");

    if (!web3.utils.isAddress(toAddress)) {
      setError("Invalid address");
      return;
    }
    try {
      const hash = await web3.eth.sendTransaction({
        from: account,
        to: toAddress,
        value: amountInWei
      });
      setTransactionHash(hash.transactionHash);
    } catch (err) {
      setError(err.message);
    }
  };

/**
 * Main App component
 * 
 * This is the main component where all other components are rendered.
 */
function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [web3, setWeb3] = useState(null);
  const { language, changeLanguage } = useLanguage();
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

/**
 * useEffect Hook for Web3 Initialization
 * 
 * This useEffect hook initializes the Web3 instance for interacting with the Ethereum blockchain.
 * It checks for the availability of window.ethereum or window.web3 and sets up the Web3 instance accordingly.
 */
useEffect(() => {
  
  // Initialize Web3 based on the available provider
  if (window.ethereum) {
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
  } else if (window.web3) {
    setWeb3(new Web3(window.web3.currentProvider));
  } else {
    // Alert the user if no Web3 provider is detected
    alert('No web3 provider detected');
  }

}, []);  // Dependency array: Run this effect only once after the initial render

/**
 * useEffect Hook for Contract Initialization
 * 
 * This useEffect hook initializes the smart contract instance using the Web3 instance.
 * It uses the ABI and address of the FreelancerAgreement contract for initialization.
 */
useEffect(() => {
  
  // Initialize the contract instance if Web3 is available
  if (web3) {
    const contractInstance = new web3.eth.Contract(
      FreelancerAgreement.abi,
      'DEPLOYED_CONTRACT_ADDRESS_HERE'  // Replace with your contract's address
    );
    setContract(contractInstance);
  }

}, [web3]);  // Dependency array: Re-run the effect if web3 changes


/**
 * useEffect Hook for Various Initializations
 * 
 * This useEffect hook performs multiple initializations:
 * 1. Simulates fetching the user role from an API.
 * 2. Connects to the user's Ethereum wallet.
 * 3. Fetches past events from the smart contract.
 * 4. Subscribes to new events from the smart contract.
 */
useEffect(() => {
  
  // Simulate fetching user role from an API
  // This is a placeholder. Replace with actual API call to get the user role.
  setTimeout(() => {
    setUser({ role: 'admin' });  // Set role to 'admin', 'manager', or 'employee'
  }, 1000);

  // Connect to the user's Ethereum wallet
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  };
  connectWallet();

  // Fetch past events from the smart contract
  const getPastEvents = async () => {
    const events = await myContract.getPastEvents('MyEvent', {
      fromBlock: 0,
      toBlock: 'latest'
    });
    console.log("Past Events:", events);
  };
  getPastEvents();

  // Subscribe to new events from the smart contract
  const eventSubscription = myContract.events.MyEvent({
    fromBlock: 'latest'
  })
  .on('data', (event) => {
    console.log("New Event:", event);
  })
  .on('error', (error) => {
    console.log("Error:", error);
    // TODO: Handle reconnection logic here
  });

  // Cleanup: Unsubscribe from events when the component is unmounted
  return () => {
    eventSubscription.unsubscribe();
  };

}, [setUser]);  // Dependency array: Re-run the effect if setUser changes

  return (
    <Router>
      <div className='App'>
        <NavBar />
        <LanguageSelector changeLanguage={changeLanguage} currentLanguage={language} />
      {user?.role && <UserTypePanel role={user.role} />}
      <NetworkInfo />
          <UserBalance account={account} /> 
          <SendTransaction />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/contract" component={AdvancedContractInteraction} />
          </Switch>
        </Suspense>
        <NotificationSystem />
      </div>
    </Router>
  );
}

/**
 * WrappedApp component
 * 
 * This component wraps the main App component with necessary context providers.
 */
const WrappedApp = () => (
  <UserProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </UserProvider>
);

export default WrappedApp;
