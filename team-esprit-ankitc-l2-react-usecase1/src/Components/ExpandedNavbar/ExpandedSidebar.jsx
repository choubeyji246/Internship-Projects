import React from 'react';

import { Divider, Drawer, List } from "@mui/material";
import { useSelector } from "react-redux";

import Account from "../Account/Account";
import Overview from "../Overview/Overview";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import ToogleTheme from "../ToogleTheme/ToogleTheme";

const ExpandedSidebar = ({account, options ,handleThemeToggle, handleDrawerClose, handleDrawerOpen, openDrawer}) => {
    const darkMode = useSelector((state) => state.theme.darkMode);
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

export default ExpandedSidebar
