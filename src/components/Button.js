// src/components/Button.js
import React from 'react';
import './button.css';

const Button = ({ label, onClick, className }) => {
  return (
    <button className={`button ${className}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;
