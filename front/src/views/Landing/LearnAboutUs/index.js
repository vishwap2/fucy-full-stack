import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import ideas from "../../../assets/images/others/Ideas.webp";
import ideas from "../../../assets/images/others/nextidea.jpg";


const useStyles =  makeStyles((theme)=>({
    footer: {
        backgroundColor: "#000",
        padding: theme.spacing(4),
        maxWidth:'inherit'
      },
      content:{
        // width:'auto'
        display:'flex',
        flexDirection:'column',
        gap:15
      },
      button:{
        backgroundColor:'black',
        color:'white',
        fontSize:23,
        padding:'8px 20px',
        width:'fit-content',

      },
}))

export default function CyberSecuritySection(){
  const classes = useStyles();
  return (
    <Box >
      {/* <Grid container spacing={4}  sx={{ my: 8, mx:10 }}  display='flex' flexDirection='row' justifyContent='space-between' alignItems="center">
        <Grid item xs={3} md={3} xl={6} lg={6}>
          <Box
            component="img"
            src={ideas}
            alt="Cybersecurity Innovation"
            sx={{ width: '600px',height:'400px', borderRadius: 2 }}
          />
        </Grid>
        <Grid item lg={6} xs={3} md={6} xl={6} maxWidth='md'>
            <Box className={classes.content}>
          <Typography variant="h3" component="h1" gutterBottom>
            The Next Big Step in Cybersecurity Innovation
          </Typography>
          <Typography variant="body1" paragraph>
            In a cyber-physical system, cybersecurity is no longer a software engineering task - it requires systems engineering.
            The right hardware needs to be matched with the right software via the right interface. The system design must be planned
            before the first line of code is written.
          </Typography>
          <Button variant="contained" color="primary">
            Learn More About Us
          </Button>
          </Box>
        </Grid>
      </Grid> */}

      <Grid container  sx={{ my: 8 }} columnGap={4} >
        <Grid item lg={6}>
          <Box
            component="img"
            src={ideas}
            alt="Cybersecurity Innovation"
            sx={{ width: '600px',height:'400px', borderRadius: 2, ml:18 }}
          />
        </Grid>
        <Grid item lg={5} >
            <Box className={classes.content}>
          <Typography variant="h3" component="h1" gutterBottom fontSize={50} fontWeight={700}>
            The Next Big Step in Cybersecurity Innovation
          </Typography>
          <Typography variant="body1" paragraph fontSize={20}>
            In a cyber-physical system, cybersecurity is no longer a software engineering task - it requires systems engineering.
            The right hardware needs to be matched with the right software via the right interface. The system design must be planned
            before the first line of code is written.
          </Typography>
          <Button  className={classes.button}>
            Learn More About Us
          </Button>
          </Box>
        </Grid>
      </Grid>
      {/* <Box>
      <Box
            component="img"
            src={ideas}
            alt="Cybersecurity Innovation"
            sx={{ width: '600px',height:'400px', borderRadius: 2 }}
          />
          <Box className={classes.content}>
          <Typography variant="h3" component="h1" gutterBottom>
            The Next Big Step in Cybersecurity Innovation
          </Typography>
          <Typography variant="body1" paragraph>
            In a cyber-physical system, cybersecurity is no longer a software engineering task - it requires systems engineering.
            The right hardware needs to be matched with the right software via the right interface. The system design must be planned
            before the first line of code is written.
          </Typography>
          <Button variant="contained" color="primary">
            Learn More About Us
          </Button>
          </Box>
      </Box> */}
      <Container className={classes.footer}>
        <Typography color='white' variant="h6" textAlign="center" fontSize={50} >
        Automotive cybersecurity compliance made simple
        </Typography>
      </Container>
    </Box>
  )
}

