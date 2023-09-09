/**
 * LanguageSelector Component
 * 
 * This React component allows users to select the language for the application.
 * It uses the i18next library for internationalization (i18n).
 */

// Import required libraries
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * LanguageSelector Functional Component
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.changeLanguage - Function to change the current language
 * @param {string} props.currentLanguage - The current language code ('en', 'es', 'fr', etc.)
 * 
 * @returns {React.Element} The rendered component
 */
const LanguageSelector = ({ changeLanguage, currentLanguage }) => {
  
  // Use the i18next translation hook
  const { t } = useTranslation();

  return (
    <div className="language-selector">
      {/* English Language Button */}
      <button 
        className={currentLanguage === 'en' ? 'active' : ''} 
        onClick={() => changeLanguage('en')}
      >
        {t('English')}
      </button>

      {/* Spanish Language Button */}
      <button 
        className={currentLanguage === 'sp' ? 'active' : ''} 
        onClick={() => changeLanguage('sp')}
      >
        {t('Español')}
      </button>

      {/* French Language Button */}
      <button 
        className={currentLanguage === 'fr' ? 'active' : ''} 
        onClick={() => changeLanguage('fr')}
      >
        {t('Français')}
      </button>
    </div>
  );
};

export default LanguageSelector;
