// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Card,
//   CardContent,
//   CardHeader,
//   Grid
// } from '@mui/material';

// const OrderPage = () => {
//   const { orderId } = useParams();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/public/orders/get/${orderId}`);
//         setOrderDetails(response.data);

//         // Fetch user details
//         const userResponse = await axios.get(`http://localhost:8080/public/users/${response.data.order.userId}`);
//         setUserName(userResponse.data.displayName);
//       } catch (error) {
//         console.error('Failed to fetch order or user details:', error);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   const handlePayment = () => {
//     // Xử lý thanh toán ở đây
//     console.log('Thanh toán đơn hàng:', orderId);
//   };

//   if (!orderDetails) {
//     return <Typography>Loading...</Typography>;
//   }

//   const { order, orderDetails: orderItems, totalAmount } = orderDetails;

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Thông tin đơn hàng
//       </Typography>
//       <Divider sx={{ mb: 2 }} />
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardHeader title="Thông tin đơn hàng" />
//             <CardContent>
//               <List>
//                 <ListItem>
//                   <ListItemText primary="Mã đơn hàng" secondary={order.id} />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText primary="Người dùng" secondary={userName} />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText primary="Tổng giá" secondary={`${order.totalPrice} VND`} />
//                 </ListItem>
                
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardHeader title="Chi tiết đơn hàng" />
//             <CardContent>
//               <List>
//                 {orderItems.map((item) => (
//                   <ListItem key={item.id}>
//                     <ListItemText
//                       primary={`Khóa học: ${item.course.title}`}
//                       secondary={`Số lượng: ${item.quantity}`}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>
//         Tổng tiền: {totalAmount} VND
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handlePayment}
//         sx={{ mt: 2 }}
//       >
//         Thanh toán
//       </Button>
//     </Box>
//   );
// };

// export default OrderPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Grid
} from '@mui/material';
const OrderPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [userName, setUserName] = useState('');
const navigave = useNavigate();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/public/orders/get/${orderId}`);
        setOrderDetails(response.data);

        // Fetch user details
        const userResponse = await axios.get(`http://localhost:8080/public/users/${response.data.order.userId}`);
        setUserName(userResponse.data.displayName);
      } catch (error) {
        console.error('Failed to fetch order or user details:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/submitOrder', {
        amount: orderDetails.totalAmount,
        orderInfo: `Order ID: ${orderDetails.order.id}`
      });
      window.location.href = response.data;// Redirect to VNPay payment URL
    } catch (error) {
      console.error('Failed to initiate payment:', error);
    }
  };

  if (!orderDetails) {
    return <Typography>Loading...</Typography>;
  }

  const { order, orderDetails: orderItems, totalAmount } = orderDetails;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Thông tin đơn hàng
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Thông tin đơn hàng" />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="Mã đơn hàng" secondary={order.id} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Người dùng" secondary={userName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Tổng giá" secondary={`${order.totalPrice} VND`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Trạng thái" secondary={order.statusId} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Chi tiết đơn hàng" />
            <CardContent>
              <List>
                {orderItems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`Khóa học: ${item.course.title}`}
                      secondary={`Số lượng: ${item.quantity}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Tổng tiền: {totalAmount} VND
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handlePayment}
        sx={{ mt: 2 }}
      >
        Thanh toán
      </Button>
    </Box>
  );
};

export default OrderPage;