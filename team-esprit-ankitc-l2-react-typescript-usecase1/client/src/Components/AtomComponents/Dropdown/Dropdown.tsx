import React, { useState } from "react";

import "./Dropdown.css";
import { DropdownProps } from "@/utils/type";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const [selectedOption, setSelectedOption] = useState<string>("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    //setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}>
        {selectedOption ? selectedOption : "👇"}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
