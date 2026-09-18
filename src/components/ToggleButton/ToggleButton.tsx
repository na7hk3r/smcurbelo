import { useTheme } from '../../context/ThemeContext';

const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        role="switch"
        aria-label="Toggle dark mode"
        aria-checked={theme === 'dark'}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleButton;
