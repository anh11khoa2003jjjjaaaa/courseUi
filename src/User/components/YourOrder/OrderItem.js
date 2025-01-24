import React from 'react';
import { Card, CardContent, Typography, List, Divider } from '@mui/material';
import OrderItemDetails from './OrderItemDetails';

const OrderItem = ({ order }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Đơn hàng #{order.order.id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tổng số tiền: {order.order.totalPrice.toLocaleString('vi-VN')} VND
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Trạng thái: {order.order.statusId === 3 ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {order.orderDetails.map((item) => (
            <OrderItemDetails key={item.id} item={item} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default OrderItem;