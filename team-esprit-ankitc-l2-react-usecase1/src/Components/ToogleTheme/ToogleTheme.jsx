import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Switch } from "@mui/material";
import React from "react";
import "./ToogleTheme.css"

const ToggleTheme = ({ darkMode, handleThemeToggle }) => {
  return (
    <div className="toggle">
      <Brightness7Icon />
      <Switch checked={darkMode} onChange={handleThemeToggle}  />
      <Brightness4Icon />
    </div>
  );
};

export default ToggleTheme;