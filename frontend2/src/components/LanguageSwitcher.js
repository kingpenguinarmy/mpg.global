/**
 * LanguageSwitcher Component
 * 
 * This React component allows users to switch the application language.
 * It uses the i18n library to handle language changes.
 */

// Import required libraries
import { useState } from 'react';
import i18n from './i18n';

/**
 * LanguageSwitcher Functional Component
 * 
 * This component provides a dropdown for selecting the application language.
 * It initializes with English ('en') as the default language.
 */
const LanguageSwitcher = () => {
  
  // State variable to keep track of the current language
  const [language, setLanguage] = useState('en');

  /**
   * Handle language change
   * 
   * This function updates the state and changes the application language
   * using the i18n library when a new language is selected.
   * 
   * @param {Event} e - The change event from the select element
   */
  const handleChange = (e) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select value={language} onChange={handleChange}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
    </select>
  );
};

export default LanguageSwitcher;
