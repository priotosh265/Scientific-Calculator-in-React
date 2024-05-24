// src/components/Display.js
import React from 'react';
import './display.css';

const Display = ({ value }) => {
  return (
    <div className="display">
      {value}
    </div>
  );
};

export default Display;
