import React from 'react';

const ThemeToggle = ({ toggleTheme, currentTheme }) => {
  return (
    <button onClick={toggleTheme}>
      Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggle;
