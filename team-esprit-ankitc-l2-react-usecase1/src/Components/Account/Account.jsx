import React from 'react'
import SidebarOption from '../SidebarOption/SidebarOption';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { ListItemText } from '@mui/material';
import "./Account.css"

const Account = ({ darkMode, account, handleDrawerClose }) => {
    return (
        <div className='account'>
        <ListItemText><span>Account</span></ListItemText>
          <SidebarOption
            darkMode={darkMode}
            account={account}
            Icon={ChatBubbleOutlineOutlinedIcon}
            text="Chat"
            onClick={handleDrawerClose}
          />
          <SidebarOption
            darkMode={darkMode}
            account={account}
            Icon={SettingsOutlinedIcon}
            text="Settings"
            onClick={handleDrawerClose}
          />
          <SidebarOption
            darkMode={darkMode}
            account={account}
            Icon={LogoutOutlinedIcon}
            text="Log Out"
            onClick={handleDrawerClose}
          />
        </div>
      );
}

export default Account