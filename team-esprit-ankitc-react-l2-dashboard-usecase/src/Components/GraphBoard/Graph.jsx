import React from 'react';
import { Box, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LineChart } from '@mui/x-charts/LineChart';
import GraphLabel from './GraphLabel';
import "./GraphBoard.css";

const userData = [70, 40, 18, 80, 160];
const pageData = [30, 50, 90, 120, 150];
const pageLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E'];

const graphLabelInfo = [
    { color: '#fed25e', name: 'Asia' },
    { color: '#4fd995', name: 'America' }
];

const Graph = () => {
    const colors = graphLabelInfo.map(label => label.color);

    return (
        <Box className='graph-comp'>
            <Box className='graph-info'>
                <Box className='graph-header-container'>
                    <Typography variant='h10' className='graph-header'>Area Installed</Typography>
                    <Typography variant='h10' className='graph-sec-header'>(+43%) than last year</Typography>
                </Box>
                <Box className='chip'>
                    <Chip style={{ color: '#ffffff', height: '100%', width: '100%', fontSize: '0.6rem' }} icon={<KeyboardArrowDownIcon style={{ color: '#ffffff', fontSize: '0.8rem' }} />} label="2019" variant="outlined" />
                </Box>
            </Box>
            <Box className='graph-label'>
                {graphLabelInfo.map((label, index) => (
                    <GraphLabel key={index} info={label} />
                ))}
            </Box>
            <Box className='graph'>
                <LineChart
                    height={190}
                    margin={0}
                    className='line-chart'
                    colors={colors}
                    series={[{ data: pageData }, { data: userData }]}
                    sx={{ stroke: '#6e7984' }}
                    xAxis={[{ scaleType: "point", data: pageLabels }]}
                />
            </Box>
        </Box>
    );
};

export default Graph;
