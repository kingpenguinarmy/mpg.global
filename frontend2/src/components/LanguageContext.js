/**
 * LanguageContext Module
 * 
 * This module provides a React context and hooks for managing language settings
 * in the application. It uses i18n for language translation.
 */

// Import required libraries and modules
import React, { createContext, useState, useContext } from 'react';
import i18n from './i18n';  // Import existing i18n configuration

/**
 * LanguageContext
 * 
 * This context provides the current language and a function to change the language.
 */
const LanguageContext = createContext();

/**
 * useLanguage Custom Hook
 * 
 * This custom hook provides an easy way to access the current language and the function
 * to change the language. It should be used within components that are children of LanguageProvider.
 * 
 * @returns {Object} The current language and a function to change the language.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/**
 * LanguageProvider Component
 * 
 * This component provides the LanguageContext to its children. It manages the state
 * of the current language and provides a function to change the language.
 * 
 * @param {Object} props The component props.
 * @param {React.ReactNode} props.children The children components.
 */
export const LanguageProvider = ({ children }) => {
  
  // State variable to hold the current language. Default is 'en' (English).
  const [language, setLanguage] = useState('en');

  /**
   * Function to Change Language
   * 
   * This function updates the current language and also updates i18n.
   * 
   * @param {string} newLanguage The new language to set.
   */
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    
    // Update i18n language settings
    i18n.changeLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
