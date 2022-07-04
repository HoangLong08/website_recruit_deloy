import React from 'react';
import './style.css';

function Button({ className, content, onclick }) {
  return (
    <button type="button" className={`btn ${className}`} onClick={onclick}>
      {content}
    </button>
  );
}

export default Button;
