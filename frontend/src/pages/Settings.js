import { useState } from 'react';
import i18n from './i18n';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en');

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
