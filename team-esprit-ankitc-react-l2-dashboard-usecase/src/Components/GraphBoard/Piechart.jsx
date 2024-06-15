import { Box, Typography } from '@mui/material'
import React from 'react'

import "./GraphBoard.css"
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
];

const pieChartColors = ['#00a76f', '#ffab00', '#00b8d9', '#ff5630'];

const Piechart = () => {
  return (
    <Box className='piechart-comp'>
      <Typography variant='h10' className='pie-header'>Current Download</Typography>
      <PieChart
        series={[{ data, innerRadius: 70 }]}
        colors={pieChartColors}
      >
      </PieChart>
      <Box className='piechart-details'>
        <Typography variant='h10' className='total'>Total</Typography>
        <Typography variant='h10' className='number'>188,245</Typography>
      </Box>
    </Box>
  )
}

export default Piechart