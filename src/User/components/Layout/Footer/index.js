import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333', // Màu nền tối
        color: '#fff', // Màu chữ trắng
        py: 4, // Padding trên và dưới
        mt: 'auto', // Đảm bảo footer tự động xuống cuối nếu nội dung ngắn
        width: '100%', // Chiều rộng 100%
        position: 'relative', // Không cố định cứng, cho phép tự động đẩy xuống
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cột 1: Thông tin chung */}
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

          {/* Cột 2: About */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{ textDecoration: 'none' }}
            >
              About Us
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{ textDecoration: 'none' }}
            >
              Contact Us
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{ textDecoration: 'none' }}
            >
              Careers
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{ textDecoration: 'none' }}
            >
              Blog
            </Link>
          </Grid>

          {/* Cột 3: Support */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{ textDecoration: 'none' }}
            >
              Help Center
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{ textDecoration: 'none' }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{ textDecoration: 'none' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{ textDecoration: 'none' }}
            >
              FAQs
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
