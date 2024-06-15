import React from 'react'

import { Box, Typography, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import welcomePic from '../../assets/welcome-pic.jpg'
import Dot from './Dot';
import "./WelcomeBoard.css"

const WelcomeBoard = () => {
  return (
    <Box className='welcomeboard-container'>
        <Box className='welcome-box'>
        <Box className='info-sec'>
            <Typography variant='h8' className='header'>
                Welcome back
                <br/>
                Jaydon Frankie
            </Typography>
            <Typography variant='h10' className='description'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Obcaecati debitis sapiente itaque 
            </Typography>
            <Button className='welcome-btn'>Go Now</Button>
        </Box>
        <Box className='pic-sec'>
            <img className='welcome-pic' src={welcomePic} alt='welcome pic'/>
        </Box>
    </Box>
    <Box className='guide-box'>
      <Box className='guidebox-container'>

      </Box>
      <Box className='guide-pic-sec'>
        <Box className='three-dots-sec'>
          <Dot styles='dot-dimmed' />
          <Dot styles='dot' />
          <Dot styles='dot-dimmed' />
        </Box>
        <Box>
          <ArrowBackIosIcon style={{ fontSize: 'small', marginRight: '1rem', color: 'white' }} />
          <ArrowForwardIosIcon style={{ fontSize: 'small', color: 'white' }} />
        </Box>
      </Box>
      <Box className='guide-info-sec'>
        <Typography className='header' variant='h10'>FEATURED APP</Typography>
        <br />
        <Typography className='info-first' variant='h10'>The Ultimate Guide to Productivity and...</Typography>
        <br />
        <Typography className='info-second' variant='h10'>She eagerly opened the gift, her eyes sparkling with...</Typography>
      </Box>
    </Box>
    </Box>
  )
}

export default WelcomeBoard