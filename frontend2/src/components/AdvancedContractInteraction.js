/**
 * AdvancedContractInteraction Component
 * 
 * This React component demonstrates advanced interactions with a smart contract.
 * It allows users to fetch and create tasks using the smart contract's methods.
 */

// Import required libraries
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Smart contract ABI and address (Replace with your contract's ABI and address)
const ABI = [...];
const contractAddress = '0x...';

/**
 * AdvancedContractInteraction Functional Component
 * 
 * This component provides UI and logic for advanced smart contract interactions.
 */
const AdvancedContractInteraction = () => {
  
  // State variables
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [taskId, setTaskId] = useState(1);
  const [task, setTask] = useState({});

  /**
   * useEffect Hook for Web3 and Contract Initialization
   * 
   * This hook initializes Web3, sets up the smart contract instance, and listens for events.
   */
  useEffect(() => {
    
    // Initialize Web3
    const web3Instance = new Web3(Web3.givenProvider || "http://localhost:8545");
    setWeb3(web3Instance);

    // Initialize contract instance
    const contractInstance = new web3Instance.eth.Contract(ABI, contractAddress);
    setContract(contractInstance);

    // Fetch and set the default account
    web3Instance.eth.getAccounts().then(accounts => {
      setAccount(accounts[0]);
    });

    // Subscribe to TaskCreated event from the smart contract
    contractInstance.events.TaskCreated({}, (error, event) => {
      console.log("New task created:", event);
    });

  }, []);  // Dependency array: Run this effect only once after the initial render

  /**
   * Fetch task details from the smart contract
   */
  const fetchTask = async () => {
    if (contract) {
      const taskDetails = await contract.methods.getTask(taskId).call();
      setTask(taskDetails);
    }
  };

  /**
   * Create a new task using the smart contract
   */
  const createTask = async () => {
    if (contract && account) {
      await contract.methods.createTask("New Task", Date.now() + 1000).send({ from: account });
    }
  };

  return (
    <div>
      <h1>Advanced Smart Contract Interaction</h1>
      <button onClick={fetchTask}>Fetch Task</button>
      <button onClick={createTask}>Create Task</button>
      <div>
        <h2>Task Details</h2>
        <p>Name: {task.name}</p>
        <p>Deadline: {task.deadline}</p>
      </div>
    </div>
  );
};

export default AdvancedContractInteraction;
