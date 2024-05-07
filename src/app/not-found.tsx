// pages/404.js

import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';


const  NotFoundPage=() =>{
  return (
   <Container>
     <Grid container  sx={{ textAlign: 'center', paddingTop: '20vh' }}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! The page you&apos;re  looking for does not exist.
        </Typography>
        <Button variant="contained"  href="/">
          Go back to Home
        </Button>
      </Grid>
    </Grid>
   </Container>
  );
}

export default NotFoundPage
