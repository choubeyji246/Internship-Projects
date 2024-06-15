import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Badge } from "@mui/material";
import React from "react";
import "./SidebarOption.css"

const SidebarOption = ({
  iconComponent,
  badge,
  darkMode,
  account,
  Icon,
  text,
  onClick,
}) => {
  console.log(text);
  return (
    <div className='sidebar'>
      {!iconComponent ? (
        <ListItem className="text" onClick={onClick} fullWidth>
          <ListItemIcon>
            {!account ? (
              <ArrowForwardIosIcon
                className={darkMode ? "dark-text" : "light-text"}
              />
            ) : (
              ""
            )}
             <Icon className={darkMode ? "dark-text" : "light-text"} />
          </ListItemIcon>
          <ListItemText>
            <span className={darkMode ? "dark-text" : "light-text"}>
              {text}
            </span>
          </ListItemText>
          {badge && <Badge badgeContent={4} color="primary" style={{marginLeft:"100px"}}/>}
        </ListItem>
      ) : (
        <Tooltip title={text}>
          <ListItem className="text" onClick={onClick} fullWidth>
            <ListItemIcon>
              {/* {!account ? (
                <ArrowForwardIosIcon
                  className={darkMode ? "dark-text" : "light-text"}
                />
              ) : (
                ""
              )} */}
              {badge ? (
                <Badge badgeContent={4} color="primary">
                  <Icon className={darkMode ? "dark-text" : "light-text"} />
                </Badge>
              ) : (
                <Icon className={darkMode ? "dark-text" : "light-text"} />
              )}
            </ListItemIcon>
          </ListItem>
        </Tooltip>
      )}
    </div>
  );
};

export default SidebarOption;