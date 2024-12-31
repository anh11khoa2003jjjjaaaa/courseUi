import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#333', color: '#fff', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              CourseShop
            </Typography>
            <Typography variant="body2" color="inherit">
              © {new Date().getFullYear()} CourseShop. All rights reserved.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
              About Us
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
              Contact Us
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
              Careers
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
              Blog
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
              Help Center
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
              FAQs
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;