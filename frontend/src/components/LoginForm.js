import React, { useState } from 'react';
import { auth } from './firebase';

const LoginForm = () => {
  
  // State variables
  const [email, setEmail] = useState('');  // State to store the email input
  const [password, setPassword] = useState('');  // State to store the password input
  const [loading, setLoading] = useState(false);  // State to handle loading status during authentication
  const [error, setError] = useState('');  // State to store and display any authentication errors
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [rememberMe, setRememberMe] = useState(false);  // State to handle "Remember Me" checkbox
  const [passwordStrength, setPasswordStrength] = useState('');  // State to store the password strength
  const [showConfirmation, setShowConfirmation] = useState(false);  // State to show confirmation message after successful password reset

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

    // Perform client-side validation on the email and password inputs
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 14) {
      setError('Password must be at least 14 characters long.');
      return;
    }

    // Check for at least 2 digits
    const regexDigit = /[0-9]/g;
    const digitCount = (password.match(regexDigit) || []).length;
    if (digitCount < 2) {
      setError('Password must contain at least 2 digits.');
      return;
    }

    // Check for at least 1 uppercase letter
    const regexUppercase = /[A-Z]/g;
    const uppercaseCount = (password.match(regexUppercase) || []).length;
    if (uppercaseCount < 1) {
      setError('Password must contain at least 1 uppercase letter.');
      return;
    }

    // Check for at least 3 special characters
    const regexSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const specialCount = (password.match(regexSpecial) || []).length;
    if (specialCount < 3) {
      setError('Password must contain at least 3 special characters.');
      return;
    }

    setLoading(true);  // Indicate the start of the authentication process
    setError('');  // Reset any previous errors

    try {
      // Attempt to sign in using Firebase authentication
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully');

      // If the "Remember Me" checkbox is checked, set a persistent cookie
      if (rememberMe) {
        localStorage.setItem('rememberMe', true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message);  // Display the error message to the user
    } finally {
      setLoading(false);  // Indicate the end of the authentication process
    }
  };

  /**
   * handlePasswordReset function
   * 
   * This function is triggered when the user clicks the "Forgot Password" link.
   * It uses Firebase's sendPasswordResetEmail method to send a password reset email to the user.
   * 
   * @param {Event} e - The click event object
   */
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Perform client-side validation on the email input
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);  // Indicate the start of the password reset process
    setError('');  // Reset any previous errors

    try {
      // Attempt to send a password reset email using Firebase authentication
      await auth.sendPasswordResetEmail(email);
      console.log('Password reset email sent');
      setShowConfirmation(true);  // Show the confirmation message
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError(error.message);  // Display the error message to the user
    } finally {
      setLoading(false);  // Indicate the end of the password reset process
    }
  };

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  /**
   * checkPasswordStrength function
   * 
   * This function checks the strength of the password and updates the passwordStrength state accordingly.
   * 
   * @param {string} password - The password to check
   */
  const checkPasswordStrength = (password) => {
    // Regular expressions to check for different password requirements
    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;
    const regexDigit = /[0-9]/;
    const regexSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    // Initialize the password strength level
    let strength = 'Weak';

    // Check for lowercase letters
    if (regexLowercase.test(password)) {
      strength = 'Medium';
    }

    // Check for uppercase letters
    if (regexUppercase.test(password)) {
      strength = 'Strong';
    }

    // Check for digits
    if (regexDigit.test(password)) {
      strength = 'Strong';
    }

    // Check for special characters
    if (regexSpecial.test(password)) {
      strength = 'Very Strong';
    }

    // Check for minimum password length
    if (password.length < 14) {
      strength = 'Weak';
    }

    // Update the password strength state
    setPasswordStrength(strength);
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
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          onChange={(e) => {
            setPassword(e.target.value);
            checkPasswordStrength(e.target.value);
          }} 
        />
        
        {/* Show/Hide Password Toggle */}
        <input 
          type="checkbox" 
          checked={showPassword} 
          onChange={(e) => setShowPassword(!showPassword)} 
        />
        <label>Show Password</label>
        
        {/* Password Strength Indicator */}
        <div>
          Password Strength: {passwordStrength}
        </div>

        {/* Remember Me Checkbox */}
        <input 
          type="checkbox" 
          checked={rememberMe} 
          onChange={(e) => setRememberMe(e.target.checked)} 
        />
        <label>Remember Me</label>
        
        {/* Login Button - Disabled during the authentication process */}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      {/* Forgot Password Link */}
      <a href="#" onClick={handlePasswordReset}>Forgot Password?</a>

      {/* Confirmation Message - Shown after successful password reset */}
      {showConfirmation && (
        <div>
          <p>A password reset email has been sent to your email address.</p>
          <p>Please check your inbox and follow the instructions in the email to reset your password.</p>
        </div>
      )}

      {/* Display any authentication errors */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;