import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import React from "react";
import { useDispatch } from "react-redux";

import { themeActions } from "../../../store/theme-slice";
import "./Navbar.css";

import ExpandedSidebar from "../ExpandedNavbar/ExpandedSidebar";
import ShrinkedSidebar from "../ShrinkedSidebar/ShrinkedSidebar";

let iconComponent = true;
const options = [
  {
    icon: GridViewOutlinedIcon,
    text: "Dashboard",
  },
  {
    icon: Inventory2OutlinedIcon,
    text: "Products",
  },
  {
    icon: ChatOutlinedIcon,
    text: "Messages",

    badge: true,
  },
  { icon: LocalMallOutlinedIcon, text: "Orders" },
  {
    icon: CalendarMonthOutlinedIcon,
    text: "Calendar",
  },
  {
    icon: InsertChartOutlinedTwoToneIcon,
    text: "Activity",
  },
  {
    icon: TrendingUpOutlinedIcon,
    text: "Static",
  },
];

const Navbar = ({openDrawer, handleDrawerClose, handleDrawerOpen}) => {
  let account = true;
  let messages = true;

  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(themeActions.toggleTheme());
  };

  return (
    <>
      {openDrawer ? (
        <ExpandedSidebar
          account={account}
          options={options}
          openDrawer={openDrawer}
          handleThemeToggle={handleThemeToggle}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
        />
      ) : (
        <ShrinkedSidebar
          options={options}
          iconComponent={iconComponent}
          messages={messages}
          openDrawer={openDrawer}
          handleDrawerClose={handleDrawerClose}
          handleThemeToggle={handleThemeToggle}
          handleDrawerOpen={handleDrawerOpen}
        />
      )}
    </>
  );
};

export default Navbar;
