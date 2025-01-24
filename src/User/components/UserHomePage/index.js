import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Grid,
  Container,
  TextField,
  Chip,
  Avatar,
  Rating
} from "@mui/material";
import axios from "axios";
import { useCart } from '../CartContext';
import CartDrawer from '../CartDrawer';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Search } from 'lucide-react';
import HeroSlideshow from "./HeroSlideshow";

import ScrollElement from "./ScrollElement";
const UserHomePage = () => {
  const [courses, setCourses] = useState([]);
  const { addToCart } = useCart();
  const [userRole, setUserRole] = useState("");
  const [statistics, setStatistics] = useState({
    totalHours: 0,
    newCourses: 0,
    activeTeachers: 0,
  });
  const coursesContainerRef = useRef(null);
  const [teachers, setTeachers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
      title: "Học tập không giới hạn",
      description: "Khởi đầu, thay đổi hoặc nâng cao sự nghiệp của bạn với hơn 1000+ khóa học chất lượng cao.",
    },
    {
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
      title: "Nâng cao kỹ năng",
      description: "Học những kỹ năng mới để bắt kịp xu hướng thị trường hiện nay.",
    },
   
    {
      url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80",
      title: "Khám phá tương lai",
      description: "Khám phá và phát triển bản thân qua những khóa học đột phá.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Thay đổi ảnh sau 3 giây

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [images.length]);
  const currentImage = images[currentIndex];
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.RoleName);
    }

    // Fetching courses
    axios
      .get("https://newcoursesbackend.onrender.com/public/courses/approved")
      .then((response) => {
        const updatedCourses = response.data.map((course) => ({
          ...course,
          thumbnailUrl: `https://newcoursesbackend.onrender.com/video/${course.thumbnailUrl.split("\\").pop()}`,
        }));
        setCourses(updatedCourses);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
      });
      //Teachers
      axios
      .get("https://newcoursesbackend.onrender.com/public/users/teachers")
      .then((response) => {
        // Cập nhật state với dữ liệu trả về từ API
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });

  }, [userRole]);

  const handleAddToCart = useCallback(
    (course) => {
      addToCart(course);
    },
    [addToCart]
  );

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      {/* Hero Section */}
     <HeroSlideshow />
<ScrollElement>
      {/* Statistics Section */}
      <Box sx={{ bgcolor: "primary.main", py: 6, color: "white" }}>
        <Container maxWidth="lg">
        <Grid container spacing={4}>
  {[{ number: 1500, label: "Giờ học hoàn thành" },
    { number: 200, label: "Khóa học đăng ký mới" },
    { number: 50, label: "Giảng viên hoạt động" }]
    .map((stat, index) => (
      <Grid item xs={6} md={3} key={index}>
        <Typography variant="h4" fontWeight="bold">
          {stat.number}
        </Typography>
        <Typography>{stat.label}</Typography>
      </Grid>
  ))}
</Grid>

        </Container>
      </Box>
      </ScrollElement>
      <ScrollElement>
      {/* Blog/News Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tin tức & Mẹo học tập
        </Typography>
        <Grid container spacing={4}>
          {[{ title: "Cách học hiệu quả", summary: "Những mẹo nhỏ để cải thiện việc học." },
            { title: "Tương lai của giáo dục trực tuyến", summary: "Những xu hướng mới trong giáo dục." }]
            .map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{article.title}</Typography>
                    <Typography variant="body2">{article.summary}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to="/blog">
                      Đọc thêm
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
          ))}
        </Grid>
      </Container>
      </ScrollElement>
      {/* Free Courses Section */}
      <ScrollElement>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tất cả khóa học
        </Typography>
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="160"
                  image={course.thumbnailUrl}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2">
  {course.description.split(' ').slice(0, 10).join(' ')}{course.description.split(' ').length > 10 ? '...' : ''}
</Typography>

                  {/* <Rating value={averageRating} readOnly precision={0.5} /> */}
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/courses/${course.id}`}>
                    Xem chi tiết
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(course)}
                  >
                    Thêm vào giỏ
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </ScrollElement>
      {/* Top Teachers Section */}
      <ScrollElement>
      <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Giáo viên hàng đầu
      </Typography>
      <Grid container spacing={4}>
        {teachers.map((teacher) => (
          <Grid item xs={12} sm={6} md={4} key={teacher.userID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{teacher.displayName}</Typography>
                <Typography variant="body2">Số điện thoại: {teacher.phone || "N/A"}</Typography>
                <Typography variant="body2">Gmail: {teacher.email || "N/A"}</Typography>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </ScrollElement>
      {/* FAQ Section */}
      <ScrollElement>
      <Box sx={{ bgcolor: "gray", py: 6 }}>
        <Container maxWidth="lg">
          <Typography sx={{color:'white'}} variant="h4" fontWeight="bold" gutterBottom>
            Câu hỏi thường gặp (FAQ)
          </Typography>
          <Grid container spacing={2}>
            {["Cách đăng ký khóa học?", "Làm sao để thêm vào giỏ?", "Giảng viên có thể thêm khóa học không?"]
              .map((question, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ bgcolor: "white", p: 3, borderRadius: "8px" }}>
                    <Typography variant="h6">{question}</Typography>
                  </Box>
                </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      </ScrollElement>
    </Box>
  );
};

export default UserHomePage;


