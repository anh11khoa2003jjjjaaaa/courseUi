import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Paper,
  Rating,
} from '@mui/material';
import {
  PlayCircleOutline,
  Description,
  Schedule,
  Person,
  CheckCircleOutline,
} from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { useCart } from '../CartContext';
import ReviewerPage from '../ReviewerPage';
import { jwtDecode } from 'jwt-decode';
const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [averageRating, setAverageRating] = useState(0); // Giá trị trung bình
  const [reviewCount, setReviewCount] = useState(0);
  const [roleName,setRoleName]=useState('');
  const token = localStorage.getItem('authToken');
  const[review,setReview]=useState([]);
  useEffect(() => {

    const fetchRolename=async()=>{
      if(token){
        const decodedToken = jwtDecode(token);
        setRoleName(decodedToken.RoleName);
      }
    }
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`https://newcoursesbackend.onrender.com/public/courses/${courseId}`);
        const courseData = {
          ...response.data,
          videoUrl: `https://newcoursesbackend.onrender.com/video/${response.data.videoUrl.split('\\').pop()}`,
          thumbnailUrl: `https://newcoursesbackend.onrender.com/video/${response.data.thumbnailUrl.split('\\').pop()}`,
        };
        setCourse(courseData);

        // Fetch teacher details
        const teacherResponse = await axios.get(`https://newcoursesbackend.onrender.com/public/users/${courseData.teacherId}`);
        setTeacher(teacherResponse.data);
  // Fetch reviews for the course
  const reviewsResponse = await axios.get(`https://newcoursesbackend.onrender.com/api/reviews/course/${courseId}`);
  const reviews = reviewsResponse.data;
  setReview(reviews);
  const avg=()=>{
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    setAverageRating(totalRating / reviews.length);
    setReviewCount(reviews.length);
  }
  // Calculate average rating and review count
  if (reviews.length > 0) {
    avg();
    
}} catch (error) {
  console.error('Không thể lấy thông tin khóa học:', error);
} finally {
  setLoading(false);
}
};
fetchRolename();
    fetchCourseDetails();
  }, [courseId,roleName,review]);

  if (loading) {
    return <Typography>Đang tải...</Typography>;
  }

  if (!course) {
    return <Typography>Không tìm thấy khóa học</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Phần đầu trang */}
      <Box sx={{ mb: 4, bgcolor: 'grey.900', color: 'white', p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {course.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={averageRating} readOnly precision={0.5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({reviewCount} đánh giá)
              </Typography>
            </Box>
            <Typography variant="body2">
              Giáo viên: {teacher ? teacher.displayName : 'Đang tải...'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <ReactPlayer
                url={course.videoUrl}
                width="100%"
                height="200px"
                controls
                light={course.thumbnailUrl}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {course.price.toLocaleString('vi-VN')} VND
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={roleName === "Admin"}
                  sx={{ mb: 2 }}
                  onClick={() => addToCart(course)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Nội dung khóa học */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bạn sẽ học được gì
            </Typography>
            <List>
              {['Học lại kiến thức từ đầu', 'Xây dựng dự án thực tế', 'Làm chủ phát triển web hiện đại'].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutline color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
        
          <ReviewerPage />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail;