import React from 'react';
import './style.css';

function SelectOption({ className, titleInput, htmlFor, name, value, defaultValue, onChange, data }) {
  return (
    <div className={`wrapper-select-option ${className}`}>
      <label className="form-label" htmlFor={htmlFor}>
        <p>{titleInput}</p>
        <select onChange={onChange} name={name} defaultValue={defaultValue || ''}>
          {data.map(item => (
            <option key={item.id} value={item.id}>
              {item.des}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SelectOption;
