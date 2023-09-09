/**
 * NavBar Component
 * 
 * This React component serves as the navigation bar for the application.
 * It provides links to various sections of the app, such as Business Signup, Client Signup, etc.
 */

// Import required libraries and styles
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

/**
 * NavBar Functional Component
 * 
 * This component renders a navigation bar with links to different routes.
 * Each list item contains a Link component from react-router-dom to navigate to the specified route.
 */
const NavBar = () => {
  
  return (
    <nav className="navbar">
      <ul>
        {/* Link to Business Signup page */}
        <li>
          <Link to="/business-signup">Business Signup</Link>
        </li>
        
        {/* Link to Client Project Brief page */}
        <li>
          <Link to="/client-project-brief">Client Project Brief</Link>
        </li>
        
        {/* Link to Client Signup page */}
        <li>
          <Link to="/client-signup">Client Signup</Link>
        </li>
        
        {/* Link to Freelancer Profile page */}
        <li>
          <Link to="/freelancer-profile">Freelancer Profile</Link>
        </li>
        
        {/* Link to Freelancer Signup page */}
        <li>
          <Link to="/freelancer-signup">Freelancer Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
