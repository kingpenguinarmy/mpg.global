import React, { useState, useEffect } from 'react';
import web3 from './web3'; // Importing the web3 instance which is assumed to be already initialized
import SkillLevelVerifier from './contracts/SkillLevelVerifier.json'; // Importing the ABI for the SkillLevelVerifier contract

/**
 * SkillLevelVerification Component
 * This component provides an interface for users to verify their skill level using Zero-Knowledge Proofs (ZKP).
 * It interacts with an Ethereum smart contract to verify the ZKP.
 */
const SkillLevelVerification = () => {
  // State for managing the user's skill level
  const [skillLevel, setSkillLevel] = useState(0);
  
  // State for managing the threshold for skill verification
  const [threshold, setThreshold] = useState(5);
  
  // State for managing the contract instance
  const [contract, setContract] = useState(null);
  
  // State for managing the user's Ethereum account
  const [account, setAccount] = useState(null);
  
  // State for managing the loading state during verification
  const [loading, setLoading] = useState(false);
  
  // State for displaying notifications to the user
  const [notification, setNotification] = useState('');

  // useEffect hook to initialize the contract instance and set up event listeners
  useEffect(() => {
    const init = async () => {
      // Fetching the user's Ethereum accounts
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Initializing the contract instance
      const contractInstance = new web3.eth.Contract(
        SkillLevelVerifier.abi,
        '0xYourContractAddressHere' // Replace with your deployed contract address
      );
      setContract(contractInstance);

      // Setting up an event listener for the SkillLevelVerified event from the contract
      contractInstance.events.SkillLevelVerified({}, (error, event) => {
        if (error) {
          console.error('Error in SkillLevelVerified event:', error);
          setNotification('An error occurred. Please try again.');
        } else {
          console.log('SkillLevelVerified event:', event);
          setNotification('Skill level successfully verified!');
        }
      });
    };

    init();
  }, []);

  /**
   * Function to verify the user's skill level using ZKP
   * This function generates a ZKP using ZoKrates, fetches the proof parameters, and interacts with the Ethereum smart contract to verify the proof.
   */
  const verifySkillLevel = async () => {
    setLoading(true);

    try {
      // TODO: Generate ZKP using ZoKrates and get proof parameters (a, b, c, input)

      // Interacting with the Ethereum smart contract to verify the proof
      const isValid = await contract.methods.verifySkillLevel(a, b, c, input)
        .send({ from: account });

      if (isValid) {
        setNotification('Skill level successfully verified!');
      } else {
        setNotification('Failed to verify skill level.');
      }
    } catch (error) {
      console.error('Error verifying skill level:', error);
      setNotification('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Skill Level Verification</h1>
      {notification && <div className="notification">{notification}</div>}
      <input
        type="number"
        value={skillLevel}
        onChange={e => setSkillLevel(e.target.value)}
        disabled={loading}
      />
      <button onClick={verifySkillLevel} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify Skill Level'}
      </button>
    </div>
  );
};

export default SkillLevelVerification;
