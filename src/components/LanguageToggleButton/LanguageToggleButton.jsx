import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './LanguageToggleButton.css';

const LanguageToggleButton = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button className="language-toggle-button" onClick={toggleLanguage}>
      {language === 'en' ? 'ES' : 'EN'}
    </button>
  );
};

export default LanguageToggleButton;
