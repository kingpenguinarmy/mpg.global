/**
 * ChatComponent
 * 
 * This React component serves as a chat interface for freelancer-client communication.
 * It uses Firebase Realtime Database to store and retrieve chat messages.
 */

// Import required libraries and styles
import React, { useState, useEffect } from 'react';
import './AdvancedChatComponent.css';
import firebase from './firebase';  // Assuming you have a firebase.js file for Firebase config

/**
 * ChatComponent Functional Component
 * 
 * This component provides the UI and logic for the chat functionality.
 */
const ChatComponent = () => {
  
  // State variables
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  
  // Reference to the 'chat' node in Firebase Realtime Database
  const chatRef = firebase.database().ref('chat');

  /**
   * useEffect Hook for Chat Initialization
   * 
   * This hook subscribes to changes in the 'chat' node of the Firebase Realtime Database.
   * It updates the chatLog state variable whenever new messages are added.
   */
  useEffect(() => {
    chatRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.values(data) : [];
      setChatLog(messages);
    });
  }, []);  // Dependency array: Run this effect only once after the initial render

  /**
   * Send a chat message
   * 
   * This function pushes a new message object to the 'chat' node in Firebase.
   */
  const sendMessage = () => {
    if (message) {
      const newMessage = {
        id: new Date().getTime(),
        text: message,
        user: 'freelancer',  // Replace with dynamic user identification
      };
      chatRef.push(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Freelancer-Client Chat</h2>
      </div>
      <div className="chat-display">
        {chatLog.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.user}`}>
            <strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="chat-send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
