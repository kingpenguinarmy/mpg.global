/**
 * LoginForm Component
 * 
 * This component provides a login form for users to authenticate themselves using Firebase's authentication service.
 * 
 * @module LoginForm
 */

// Import required libraries and modules
import React, { useState } from 'react';
import { auth } from './firebase';

const LoginForm = () => {
  
  // State variables
  const [email, setEmail] = useState('');  // State to store the email input
  const [password, setPassword] = useState('');  // State to store the password input
  const [loading, setLoading] = useState(false);  // State to handle loading status during authentication
  const [error, setError] = useState('');  // State to store and display any authentication errors

  /**
   * handleLogin function
   * 
   * This function is triggered when the user submits the login form.
   * It uses Firebase's signInWithEmailAndPassword method to authenticate the user.
   * 
   * @param {Event} e - The submit event object
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);  // Indicate the start of the authentication process
    setError('');  // Reset any previous errors

    try {
      // Attempt to sign in using Firebase authentication
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully');
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message);  // Display the error message to the user
    } finally {
      setLoading(false);  // Indicate the end of the authentication process
    }
  };

  return (
    <div>
      {/* Login Form */}
      <form onSubmit={handleLogin}>
        {/* Email Input Field */}
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        {/* Password Input Field */}
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        {/* Login Button - Disabled during the authentication process */}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      {/* Display any authentication errors */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;