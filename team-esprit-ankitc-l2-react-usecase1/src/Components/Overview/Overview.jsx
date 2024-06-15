import { ListItem, ListItemText } from "@mui/material";
import React from "react";

import SidebarOption from "../SidebarOption/SidebarOption";

const Overview = ({darkMode, text, options }) => {
  return (
    <div className="overview" >
      <ListItem className="overview-text">
        <ListItemText className= { darkMode ? 'dark-text' : 'light-text' } >{text}</ListItemText>
      </ListItem>
      {options?.map((option, index) => (
        <SidebarOption
          key={index}
          Icon={option.icon}
          text={option.text}
          onClick={option.onClick}
          darkMode={darkMode}
          badge= {option?.badge}
        />
      ))}
    </div>
  );
};

export default Overview;