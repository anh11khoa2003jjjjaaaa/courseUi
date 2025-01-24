import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import OrderItem from './OrderItem';

const YourOrder = () => {
  const { userId } = useParams();
  const navigate = useNavigate(); // Sử dụng hook useNavigate
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://newcoursesbackend.onrender.com/public/orders/status/3/${userId}`);
        if (response.data.length === 0) {
          // Điều hướng đến trang NotFound404 nếu không có đơn hàng
          navigate('/user/NotFound404');
        } else {
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Không thể tải đơn hàng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Đơn hàng của bạn
      </Typography>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </Box>
  );
};

export default YourOrder;
