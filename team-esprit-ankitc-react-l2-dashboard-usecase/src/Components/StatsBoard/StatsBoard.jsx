import React from 'react'

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Box } from '@mui/material'

import Card from './Card'

import './StatsBoard.css'


const statCardInfo = [
    {
        header: 'Total Active Users',
        icon: <KeyboardDoubleArrowUpIcon className='stat-icon green' />,
        percent: '+2.6%',
        amount: '18,765',
        statIconColor: '#1fbc7d'
    },
    {
        header: 'Total Installed',
        icon: <KeyboardDoubleArrowUpIcon className='stat-icon green' />,
        percent: '+0.2%',
        amount: '4,876',
        statIconColor: '#0fc1dd'
    },
    {
        header: 'Total Active Users',
        icon: <KeyboardDoubleArrowDownIcon className='stat-icon red' />,
        percent: '-0.1%',
        amount: '678',
        statIconColor: '#ffb71c'
    }
]
const StatBoard = () => {


  return (
    <Box className='statboard-container'>
        {statCardInfo.map((elem) => {
            return <Card key={elem.amount} info={elem}/>
        })}
    </Box>
  )
}

export default StatBoard