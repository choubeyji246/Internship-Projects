import React from 'react'

import { Box, Typography } from '@mui/material'

import "./GraphBoard.css"

const GraphLabel = ({info}) => {
    const {color, name} = info;
  return (
    <Box className='graph-label-contents'>
        <Box className='indicator' sx={{backgroundColor: color}}></Box>
        <Typography className='continent-name' variant='h10'>{name}</Typography>
    </Box>
  )
}

export default GraphLabel