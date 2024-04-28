
import React, { useState } from 'react';

const Settings = ({ onThemeChange }) => {
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem('themeColor') || 'blue'
  ); // Default theme color

  const handleThemeChange = (color) => {
    setThemeColor(color);
    // Save the theme color preference to localStorage
    localStorage.setItem('themeColor', color);
    // Call the onThemeChange function to update the theme in App.js
    onThemeChange(color);
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div>
        <label>Theme Color:</label>
        <select value={themeColor} onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value='black'>Black</option>
        </select>
      </div>
      {/* Add more customization options here */}
    </div>
  );
};

export default Settings;


