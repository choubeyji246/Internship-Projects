import React from 'react';

import { List } from "@mui/material";
import { useSelector } from "react-redux";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Switch from "@mui/material/Switch";
import SidebarOption from '../SidebarOption/SidebarOption';

const ShrinkedSidebar = ({iconComponent,messages, handleThemeToggle, options, handleDrawerOpen}) => {

    const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className={darkMode ? "dark" : "iconbar"}>
          <List>
            <div className="image" onClick={handleDrawerOpen}>
              <img
                src="https://media.licdn.com/dms/image/D560BAQHPVqwXeFRo0w/company-logo_200_200/0/1693224093103/ncompass_techstudio_logo?e=2147483647&v=beta&t=utI4CS9Mmsmg2pRku8FAiFtg5ZY605bkeElzYZ-3HRc"
                alt="logo"
              />
            </div>
            <div className="icon-overview" style={{ marginTop: "40px" }}>
              {options?.map((option, index) => (
                <SidebarOption
                  iconComponent={iconComponent}
                  key={index}
                  Icon={option.icon}
                  darkMode={darkMode}
                  text={option.text}
                  badge={option?.badge}
                  messages={messages}
                />
              ))}
            </div>
            <div className="icon-account" style={{ marginTop: "80px" }}>
              <SidebarOption
                iconComponent={iconComponent}
                darkMode={darkMode}
                Icon={ChatBubbleOutlineOutlinedIcon}
              />
              <SidebarOption
                iconComponent={iconComponent}
                darkMode={darkMode}
                Icon={SettingsOutlinedIcon}
              />
              <SidebarOption
                iconComponent={iconComponent}
                darkMode={darkMode}
                Icon={LogoutOutlinedIcon}
              />
              <div className="toggle-bar">
                <Switch checked={darkMode} onChange={handleThemeToggle} />
              </div>
            </div>
          </List>
        </div>
  )
}

export default ShrinkedSidebar
