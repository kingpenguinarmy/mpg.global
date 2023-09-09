/**
 * LoginForm Component
 * 
 * This React component provides a login form for users to authenticate themselves.
 * It uses Firebase's authentication service to handle email and password-based login.
 */

// Import required libraries and modules
import React, { useState } from 'react';
import { auth } from '../components/firebase';

/**
 * LoginForm Functional Component
 * 
 * This component renders a login form and handles user authentication.
 */
const LoginForm = () => {
  
  // State variables to hold email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handle Login
   * 
   * This function is triggered when the user submits the login form.
   * It uses Firebase's signInWithEmailAndPassword method to authenticate the user.
   * 
   * @param {Event} e - The submit event object
   */
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    try {
      // Attempt to sign in using Firebase authentication
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Logged in');  // Log success message to console
    } catch (error) {
      console.error('Error logging in:', error);  // Log error message to console
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Email Input */}
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      
      {/* Password Input */}
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      
      {/* Login Button */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
