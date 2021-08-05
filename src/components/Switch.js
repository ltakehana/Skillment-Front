import React, { useState } from 'react';
import '../styles/components/switch.css';

const Switch = ({onChecked=(checked)=>{}}) => {

  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={(e)=>onChecked(e.target.checked)}
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;