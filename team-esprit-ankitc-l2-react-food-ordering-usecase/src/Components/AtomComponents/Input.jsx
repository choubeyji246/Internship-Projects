import React from 'react';

const Input = ({ label,...props }) => {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={props.id}>{label}</label>
      <input className="input-field" required {...props} />
    </div>
  );
};

export default Input;
