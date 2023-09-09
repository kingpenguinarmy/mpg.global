/**
 * MatchResults Component
 * 
 * This React component displays a list of best matches based on the scores.
 * It receives an array of scores as a prop and renders each score along with the freelancer ID.
 */

// Import required libraries
import React from 'react';

/**
 * MatchResults Functional Component
 * 
 * @param {Object[]} scores - An array of score objects, each containing a freelancerId and a score.
 * @returns JSX element that displays the list of best matches.
 */
function MatchResults({ scores }) {
  
  return (
    <div>
      <h1>Best Matches</h1>
      
      {/* Render a list of scores */}
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {/* Display freelancer ID and score */}
            Freelancer ID: {score.freelancerId}, Score: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchResults;
