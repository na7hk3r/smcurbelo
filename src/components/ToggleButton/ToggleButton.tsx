import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ToggleButton.css';

const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleButton;
