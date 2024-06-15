import React from 'react'
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import MenuIcon from "@mui/icons-material/Menu";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Divider, Drawer, IconButton, Toolbar, List } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Switch from "@mui/material/Switch";
import { themeActions } from "../../store/theme-slice";
import Account from "../Account/Account";
import Overview from "../Overview/Overview";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import ToogleTheme from "../ToogleTheme/ToogleTheme";
import "./Navbar.css";

import SidebarOption from "../SidebarOption/SidebarOption";


const Sidebar = () => {
  return (
    <Drawer
    className="drawer"
    anchor="left"
    open={openDrawer}
    onClose={handleDrawerClose}
  >
    <List
      classes={{
        root: darkMode ? "dark-drawer" : "light-drawer",
      }}
    >
      <SidebarHeader darkMode={darkMode} onClose={handleDrawerClose} />
      <Divider className={darkMode ? "dark-line" : ""} />
      <Overview text="Overview" options={options} darkMode={darkMode} />
      <Divider className={darkMode ? "dark-line" : ""} />
      <Account
        darkMode={darkMode}
        account={account}
        handleDrawerClose={handleDrawerClose}
      />
      <ToogleTheme
        darkMode={darkMode}
        handleThemeToggle={handleThemeToggle}
      />
    </List>
  </Drawer>
  )
}

export default Sidebar
