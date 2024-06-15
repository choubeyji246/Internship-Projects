import React from 'react'

import BarChartIcon from '@mui/icons-material/BarChart';
import { Box, Typography } from '@mui/material'


const   Card = ({info}) => {
    const {header, amount, icon, percent, statIconColor} = info;
    
  return (
    <Box className='statboardcard-container'>
        <Box className='stat-info'>
            <Typography variant='h10' className='stat-header'>{header}</Typography>
            <Box className='stat-percentage'>
                {icon}
                <Typography variant='h10' className='percentage'>{percent}</Typography>
            </Box>
            <Typography variant='h10' className='stat-rs'>{amount}</Typography>
        </Box>
        <Box className='icon-sec'>
            <BarChartIcon style={{color: statIconColor}}/>
        </Box>
    </Box>
  )
}

export default Card