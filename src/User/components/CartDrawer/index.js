import React, { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../CartContext';

const CartDrawer = ({ open, onClose }) => {
  const { cartItems, removeFromCart, checkout, loadCartItems } = useCart();
  const [loading, setLoading] = useState(false); // Trạng thái loading cho nút thanh toán
  const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi nếu có

  useEffect(() => {
    if (open) {
      loadCartItems();
    }
  }, [open, loadCartItems,cartItems]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true); // Bắt đầu loading
    setErrorMessage(''); // Xóa thông báo lỗi trước đó

    try {
      await checkout();
      onClose(); // Đóng Drawer sau khi thanh toán thành công
    } catch (error) {
      console.error('Checkout failed:', error);
      setErrorMessage('Thanh toán thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Giỏ hàng
        </Typography>
        <Divider />
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.cartDetailID}>
              <ListItemText
                primary={item.title || 'Không rõ tiêu đề'}
                secondary={`${item.quantity} x ${(item.price || 0).toLocaleString('vi-VN')} VND`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeFromCart(item.cartDetailID)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6">
            Tổng cộng: {totalPrice.toLocaleString('vi-VN')} VND
          </Typography>
        </Box>
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCheckout}
          disabled={cartItems.length === 0 || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          Đặt hàng
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;