import React from "react";

import "./AtomComponent.css";

const Input = (props) => {
  const {style, type, id, name, value, changeEvent}= props;
  return (
    <div>
      <input
        className="input-tag"
        style={style}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => changeEvent(e)}
      />
    </div>
  );
};

export default Input;
