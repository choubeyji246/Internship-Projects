import React from 'react'

import Avatar from '@mui/material/Avatar';

import profilePic from '../../assets/ncompass_techstudio_logo.jpg'

import "./DashboardNavbar"

const ProfileAvatar = () => {
  return (
    <Avatar className='profile-pic' alt="Remy Sharp" src={profilePic} />
  )
}

export default ProfileAvatar