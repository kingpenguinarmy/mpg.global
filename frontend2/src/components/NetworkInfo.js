/**
 * NetworkInfo Component
 * 
 * This React component displays information about the Ethereum network the user is connected to.
 * It fetches the network ID, determines the network name, and checks if the network is supported.
 */

// Import required libraries
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

/**
 * NetworkInfo Functional Component
 * 
 * This component provides UI and logic for displaying Ethereum network information.
 */
const NetworkInfo = () => {
  
  // State variables
  const [networkId, setNetworkId] = useState(null);
  const [networkName, setNetworkName] = useState("");
  const [isSupportedNetwork, setIsSupportedNetwork] = useState(true);

  /**
   * useEffect Hook for Fetching Network Information
   * 
   * This hook initializes Web3 and fetches the network ID, name, and supported status.
   */
  useEffect(() => {
    
    // Asynchronous function to fetch network information
    const fetchNetworkInfo = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const id = await web3.eth.net.getId();
      let name = "";
      let supported = true;

      // Determine network name based on network ID
      switch (id) {
        case 1:
          name = "Mainnet";
          break;
        case 3:
          name = "Ropsten";
          break;
        case 4:
          name = "Rinkeby";
          break;
        case 5:
          name = "Goerli";
          break;
        case 42:
          name = "Kovan";
          break;
        default:
          name = "Unknown";
          supported = false;
          break;
      }

      // Update state variables
      setNetworkId(id);
      setNetworkName(name);
      setIsSupportedNetwork(supported);
    };

    // Fetch network information
    fetchNetworkInfo();

  }, []);  // Dependency array: Run this effect only once after the initial render

  return (
    <div>
      <h3>Network Information</h3>
      <p>Network ID: {networkId}</p>
      <p>Network Name: {networkName}</p>
      {isSupportedNetwork ? (
        <p style={{ color: 'green' }}>This network is supported</p>
      ) : (
        <p style={{ color: 'red' }}>This network is not supported</p>
      )}
    </div>
  );
};

export default NetworkInfo;
