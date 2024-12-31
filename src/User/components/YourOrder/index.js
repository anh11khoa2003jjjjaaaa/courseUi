// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, Divider } from '@mui/material';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const YourOrder = () => {
//   const { userId } = useParams();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/public/orders/user/${userId}`);
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Đơn hàng của bạn
//       </Typography>
//       {orders.map((orderDetailsResponse, index) => (
//         <Card key={index} sx={{ mb: 2 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Đơn hàng #{orderDetailsResponse.order.id}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Tổng số tiền: {orderDetailsResponse.order.totalPrice.toLocaleString('vi-VN')} VND
//             </Typography>
//             <Typography variant="body2" color="textSecondary" gutterBottom>
//               Trạng thái: {orderDetailsResponse.order.statusId === 2 ? 'Đã hoàn thành' : 'Đang xử lý'}
//             </Typography>
//             <Divider sx={{ my: 2 }} />
//             <List>
//               {orderDetailsResponse.orderDetails.map((item) => (
//                 <ListItem key={item.id} alignItems="flex-start">
//                   <CardMedia
//                     component="img"
//                     sx={{ width: 100, height: 100, mr: 2 }}
//                     image={`http://localhost:8080/video/${item.course.thumbnailUrl.split('\\').pop()}`}
//                     alt={item.course.title}
//                   />
//                   <ListItemText
//                     primary={item.course.title}
//                     secondary={
//                       <>
//                         <Typography component="span" variant="body2" color="textPrimary">
//                           Số lượng: {item.quantity}
//                         </Typography>
//                         <br />
//                         <Typography component="span" variant="body2" color="textPrimary">
//                           Giá: {item.course.price.toLocaleString('vi-VN')} VND
//                         </Typography>
//                         <br />
//                         <video width="320" height="240" controls>
//                           <source src={`http://localhost:8080/video/${item.course.videoUrl.split('\\').pop()}`} type="video/mp4" />
//                           Trình duyệt của bạn không hỗ trợ thẻ video.
//                         </video>
//                       </>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default YourOrder;
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OrderItem from './OrderItem';

const YourOrder = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/public/orders/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Không thể tải đơn hàng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

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