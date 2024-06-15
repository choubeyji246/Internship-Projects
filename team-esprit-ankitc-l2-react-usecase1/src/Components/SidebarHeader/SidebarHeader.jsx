import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton, ListItemText } from "@mui/material";
import React from "react";

import "./SidebarHeader.css"

const SidebarHeader = ({ darkMode, onClose }) => {
  return (
    <div className="sidebar-header">
      <img
        src="https://media.licdn.com/dms/image/D560BAQHPVqwXeFRo0w/company-logo_200_200/0/1693224093103/ncompass_techstudio_logo?e=2147483647&v=beta&t=utI4CS9Mmsmg2pRku8FAiFtg5ZY605bkeElzYZ-3HRc"
        alt="logo"
      />
      <ListItemText className={`header-text ${darkMode ? "dark-text" : "light-text"}`} ><span>Ncompass Techstudio</span></ListItemText>

      <IconButton onClick={onClose} className="back-arrow">
        <ArrowBackIosIcon
          className={darkMode ? "dark-text" : "light-text"}
        />
      </IconButton>
    </div>
  );
};

export default SidebarHeader;