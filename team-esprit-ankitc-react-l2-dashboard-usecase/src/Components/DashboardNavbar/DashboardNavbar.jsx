import React from 'react';

import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Box, Grid } from '@mui/material';

import flag from "../../assets/Flag_of_India.svg";
import ProfileAvatar from './Avatar';

import "./DashboardNavbar.css";


const Navbar = () => {
    return (
        <Box className='navbar-container'>
            <Grid xs={2} className='search-container' container>
                <SearchIcon />
                <Box className='command-section'>
                    <KeyboardCommandKeyIcon />K
                </Box>
            </Grid>
            <Grid xs={10} className='profile-container' container>
                <img className='profile-items' src={flag} alt='flag pic'/>
                <NotificationImportantIcon className='profile-items' />
                <PeopleAltIcon className='profile-items' />
                <Badge className='profile-items badge-dot' variant='dot'>
                    <SettingsIcon />
                </Badge>
                <ProfileAvatar className='profile-items' />
            </Grid>
        </Box>
    )
}

export default Navbar