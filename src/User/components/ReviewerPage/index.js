import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Đảm bảo thư viện jwt-decode đã được cài đặt
import {
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Rating,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ReviewerPage = () => {
  const { courseId } = useParams(); // Lấy ID khóa học từ URL
  const [reviews, setReviews] = useState([]);
  const [userMap, setUserMap] = useState({}); // Lưu tên user tương ứng với userId
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [editingReview, setEditingReview] = useState(null); // Đánh giá đang được chỉnh sửa
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(''); // Vai trò người dùng
  const [userId, setUserId] = useState(null); // ID người dùng hiện tại
  const token = localStorage.getItem('authToken');

  // Decode JWT để lấy thông tin người dùng
  useEffect(() => {
    const userToken=async()=>{
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.RoleName);
            const userResponse = await axios.get(`https://newcoursesbackend.onrender.com/public/users/account/${decodedToken.AccountID}`);
            console.log(userResponse.data);
            console.log(userResponse.data.userID);
            setUserId(userResponse.data.userID); // Lấy userId từ token
          }
    }
    userToken();
  }, [token]);

  // Fetch reviews và thông tin user
  useEffect(() => {
    const fetchReviewsAndUsers = async () => {
      try {
        // Fetch reviews của khóa học
        const response = await axios.get(`https://newcoursesbackend.onrender.com/api/reviews/course/${courseId}`);
        const fetchedReviews = response.data;

        // Lấy danh sách userId từ reviews
        const userIds = [...new Set(fetchedReviews.map((review) => review.userId))];

        // Fetch thông tin user theo userId
        const userResponses = await Promise.all(
          userIds.map((id) =>
            axios.get(`https://newcoursesbackend.onrender.com/public/users/${id}`).catch((err) => null)
          )
        );

        const userData = userResponses.reduce((acc, res, index) => {
          if (res && res.data) acc[userIds[index]] = res.data.displayName;
          return acc;
        }, {});

        setReviews(fetchedReviews);
        setUserMap(userData);
      } catch (error) {
        console.error('Không thể tải đánh giá hoặc thông tin user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsAndUsers();
  }, [courseId,userMap]);

  // Thêm hoặc cập nhật đánh giá
  const handleSaveReview = async () => {
    if (!token) {
        toast.error('Vui lòng đăng nhập để đánh giá khóa học.');
      console.error('Token không tồn tại, không thể thêm hoặc cập nhật đánh giá.');
      return;
    }

    try {
      if (editingReview) {
        // Chỉnh sửa đánh giá
        await axios.put(`https://newcoursesbackend.onrender.com/api/reviews/${editingReview.id}`, {
          rating: newReview.rating,
          comment: newReview.comment,
        });

        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === editingReview.id
              ? { ...review, rating: newReview.rating, comment: newReview.comment }
              : review
          )
        );
      } else {
        // Thêm đánh giá mới
        const response = await axios.post(`https://newcoursesbackend.onrender.com/api/reviews`, {
          courseId,
          rating: newReview.rating,
          comment: newReview.comment,
          userId,
        });

        setReviews([...reviews, response.data]);
      }

      setNewReview({ rating: 0, comment: '' });
      setEditingReview(null);
    } catch (error) {
      console.error('Không thể thêm hoặc cập nhật đánh giá:', error);
    }
  };

  // Xóa đánh giá
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`https://newcoursesbackend.onrender.com/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('Không thể xóa đánh giá:', error);
    }
  };

  if (loading) {
    return <Typography>Đang tải đánh giá...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Đánh giá khóa học
      </Typography>

      {/* Hiển thị danh sách đánh giá */}
      <Paper elevation={3} sx={{ mb: 3, p: 3 }}>
        {reviews.length > 0 ? (
          <List>
            {reviews.map((review) => (
              <ListItem key={review.id} divider>
                <ListItemText
  primary={
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating value={review.rating} readOnly />
      <Typography variant="subtitle2" sx={{ ml: 2 }}>
        {userMap[review.userId]
          ? userRole=== 'Admin'
            ? `${userMap[review.userId]} (Admin)`
            : userMap[review.userId]
          : 'Học viên ẩn danh'}
      </Typography>
    </Box>
  }
  secondary={review.comment}
/>

                {/* Nút sửa và xóa */}
                {(userRole === 'Admin' || review.userId === userId) && (
                  <Box>
                    <IconButton
                      onClick={() => {
                        setEditingReview(review);
                        setNewReview({ rating: review.rating, comment: review.comment });
                      }}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteReview(review.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>Chưa có đánh giá nào.</Typography>
        )}
      </Paper>

      <Divider sx={{ mb: 3 }} />

      {/* Form thêm hoặc chỉnh sửa đánh giá */}
      <Typography variant="h6" gutterBottom>
        {editingReview ? 'Chỉnh sửa đánh giá của bạn' : 'Thêm đánh giá của bạn'}
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Rating
          value={newReview.rating}
          onChange={(event, newValue) => setNewReview({ ...newReview, rating: newValue })}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Bình luận"
          value={newReview.comment}
          onChange={(event) => setNewReview({ ...newReview, comment: event.target.value })}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSaveReview}>
          {editingReview ? 'Lưu chỉnh sửa' : 'Gửi đánh giá'}
        </Button>
      </Paper>
    </Box>
  );
};

export default ReviewerPage;
