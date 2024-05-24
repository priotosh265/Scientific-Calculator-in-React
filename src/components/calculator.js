import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import Display from './display';
import Button from './Button';
import Confetti from './confettiexplosion';
import './calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [result, setResult] = useState('');
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme state

  const handleButtonClick = (label) => {
    let newValue = displayValue;

    const mathFunctions = {
      'x²': (x) => Math.pow(x, 2),
      'x³': (x) => Math.pow(x, 3),
      'xʸ': (x, y) => Math.pow(x, y),
      'eˣ': (x) => Math.exp(x),
      '10ˣ': (x) => Math.pow(10, x),
      '¹/x': (x) => 1 / x,
      '²√x': (x) => Math.sqrt(x),
      '³√x': (x) => Math.cbrt(x),
      'ʸ√x': (x, y) => Math.pow(x, 1 / y),
      'ln': (x) => Math.log(x),
      'log₁₀': (x) => Math.log10(x),
      'x!': (x) => factorial(x),
      'sin': (x) => isRadians ? Math.sin(x) : Math.sin(x * Math.PI / 180),
      'cos': (x) => isRadians ? Math.cos(x) : Math.cos(x * Math.PI / 180),
      'tan': (x) => isRadians ? Math.tan(x) : Math.tan(x * Math.PI / 180),
      'sinh': (x) => Math.sinh(x),
      'cosh': (x) => Math.cosh(x),
      'tanh': (x) => Math.tanh(x)
    };

    const factorial = (n) => {
      if (n === 0 || n === 1) return 1;
      return n * factorial(n - 1);
    };

    if (label === '=') {
      try {
        const replacedValue = displayValue.replace(/×/g, '*').replace(/÷/g, '/');
        const evalResult = evaluate(replacedValue);
        setResult(evalResult);
        newValue = evalResult.toString();
        if (/3.*4|4.*3/.test(displayValue)) {
          setConfettiTrigger(true);
          setTimeout(() => setConfettiTrigger(false), 3000);
        }
      } catch (error) {
        newValue = 'Error';
      }
    } else if (label === 'C') {
      newValue = '';
      setResult('');
    } else if (label === '±') {
      newValue = (parseFloat(displayValue) * -1).toString();
    } else if (label === '2nd') {
      setSecondary(!secondary);
    } else if (label === 'Rad') {
      setIsRadians(!isRadians);
    } else if (Object.keys(mathFunctions).includes(label)) {
      if (label === 'xʸ' || label === 'ʸ√x') {
        const values = displayValue.split(/[\s^√]+/);
        if (values.length === 2) {
          const x = parseFloat(values[0]);
          const y = parseFloat(values[1]);
          const func = mathFunctions[label];
          newValue = func(x, y).toString();
        }
      } else {
        const x = parseFloat(displayValue);
        const func = mathFunctions[label];
        newValue = func(x).toString();
      }
      setResult(newValue);
    } else if (label === 'e') {
      newValue += Math.E.toString();
    } else if (label === 'π') {
      newValue += Math.PI.toString();
    } else if (label === 'Rand') {
      newValue += Math.random().toString();
    }else if (label === '☀️' || label === '🌙') {
      setIsDarkMode(!isDarkMode);
    } else {
      newValue += label;
    }
    setDisplayValue(newValue);
  };

  
  return (
    <div className={`calculator ${isDarkMode ? 'dark' : 'light'}`}>
    <Display value={displayValue || result} />
    <div className="buttons">

        {['(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '±', '%', '÷'].map(label => (
          <Button key={label} label={label} onClick={handleButtonClick} className={label === '÷' ? 'orange' : ''} />
        ))}
        {['2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×'].map(label => (
          <Button key={label} label={label} onClick={handleButtonClick} className={(label === '×' ? 'orange' : '') + (['7', '8', '9'].includes(label) ? ' grey' : '')} />
        ))}
        {['1/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-'].map(label => (
          <Button key={label} label={label} onClick={handleButtonClick} className={(label === '-' ? 'orange' : '')+ (['4', '5', '6'].includes(label) ? ' grey' : '')} />
        ))}
        {['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'].map(label => (
          <Button key={label} label={label} onClick={handleButtonClick} className={(label === '+' ? 'orange' : '')+ (['1', '2', '3'].includes(label) ? ' grey' : '')} />
        ))}
         {[].map(label => (
          <Button key={label} label={label} onClick={handleButtonClick} className={+(label === '☀️' || label === '🌙' ? ' theme-toggle' : '')} />
          
        ))}
        {['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', isDarkMode ? '☀️' : '🌙','0', '.', '='].map(label => (
          <Button key={label} label={label} onClick={handleButtonClick} className={(label === '=' ? 'orange' : '')+ (['7', '8', '9','0','.','☀️','🌙'].includes(label) ? ' grey' : '')} />

          
        ))}
        
        {/* <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? 'D' : 'N'}
        </button> */}
      </div>
      <Confetti trigger={confettiTrigger} />
    </div>
  );
};

export default Calculator;
