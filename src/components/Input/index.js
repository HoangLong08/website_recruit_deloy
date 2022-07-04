import React from 'react';

import './style.css';

function Input({
  className,
  titleInput,
  htmlFor,
  name,
  typeInput,
  placeholder,
  value,
  onChange,
  onKeyDown,
  errorInput
}) {
  return (
    <>
      <label className="form-label" htmlFor={htmlFor}>
        <p>{titleInput}</p>
        <input
          type={typeInput}
          id={htmlFor}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={className}
        />
      </label>
      {errorInput?.length > 0 && <small className="form-error">{errorInput}</small>}
    </>
  );
}

export default Input;
