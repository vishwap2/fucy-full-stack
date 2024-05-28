import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AboutPage (){
  return (
    <Box sx={{height:'70svh', marginTop:'6rem'}}>
      <Box textAlign="center" my={4}>
      <Typography
                variant="h3"
                align="left"
                gutterBottom
                sx={{ 
                    borderBottom: '1px solid black',
                    pb: 2 ,
                    mx:18
                    }}
                fontSize={25}
                fontWeight={700}
            >
          About us
            </Typography>
      </Box>
      <Box  my={4} bgcolor="grey.100" p={4}>
        <Typography textAlign="center" variant="h5" gutterBottom>
          Why Join Us?
        </Typography>
        <ul style={{display:'grid',placeContent:'center', gap:10}}>
          <li>Hold a key role and contribute directly to the core business in a fast-growing technology startup</li>
          <li>Competitive compensation package including company equity</li>
          <li>Flexible working hours</li>
        </ul>

      </Box>
    </Box>
  )
}
