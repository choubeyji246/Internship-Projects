import React from 'react'

import { Box } from '@mui/material'

import Graph from './Graph'

import "./GraphBoard.css"
import Piechart from './Piechart'

const GraphBoard = () => {
  return (
    <Box className='graphboard-container'>
      <Piechart />
      <Graph />
    </Box>
  )
}

export default GraphBoard