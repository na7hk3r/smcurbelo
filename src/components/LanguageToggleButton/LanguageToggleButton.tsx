import { useLanguage } from '../../context/LanguageContext';

const LanguageToggleButton = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className="language-toggle-button"
      onClick={toggleLanguage}
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
      aria-pressed={language === 'es'}
    >
      {language === 'en' ? 'ES' : 'EN'}
    </button>
  );
};

export default LanguageToggleButton;
