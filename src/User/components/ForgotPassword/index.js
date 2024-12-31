import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:8080/public/auth/forgot-password', null, {
        params: { email },
      });
      toast.success(response.data);
    } catch (error) {
      console.error('Failed to send reset password email:', error);
      toast.error('Lỗi khi gửi email đặt lại mật khẩu.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f9f9f9',
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '400px' },
          p: 4,
          borderRadius: 2,
          bgcolor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Quên mật khẩu
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 3, color: 'gray' }}
        >
          Nhập email của bạn để nhận mật khẩu mới.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleForgotPassword}
              sx={{
                py: 1.5,
                fontSize: '16px',
              }}
            >
              Gửi mật khẩu mới
            </Button>
          </Grid>
        </Grid>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default ForgotPassword;
