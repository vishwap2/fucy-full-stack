import React from 'react';
import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';

export default function ContactPage (){
  return (
    <Box sx={{ marginTop:'6rem'}}>
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
          Contact us
            </Typography>
      </Box>
     <ContactForm/>
    </Box>
  )
}
