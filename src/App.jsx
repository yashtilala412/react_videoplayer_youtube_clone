// LanguageSelector.js
import React from 'react';

const LanguageSelector = ({ onLanguageChange }) => {
  return (
    <select onChange={(e) => onLanguageChange(e.target.value)}>
      <option value="en">English</option>
      <option value="es">Spanish</option>
      {/* Add more language options */}
    </select>
  );
};

export default LanguageSelector;
