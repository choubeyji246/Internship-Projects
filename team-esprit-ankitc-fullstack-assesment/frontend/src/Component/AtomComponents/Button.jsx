import React from "react";

import "./AtomComponent.css";

const Button = (props) => {

  const {style, handleEvent, svg, text}=props
  return (
    <div>
      <button
        style={style}
        className="button"
        onClick={handleEvent}
      >
        {svg}
        {text}
      </button>
    </div>
  );
};

export default Button;
