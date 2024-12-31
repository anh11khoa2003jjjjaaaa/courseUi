import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  Badge
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import { useCart } from '../CartContext';
import CartDrawer from '../CartDrawer';
import { Link } from 'react-router-dom';


const UserHomePage = () => {
  const [courses, setCourses] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, addToCart } = useCart();
  useEffect(() => {
    
    axios.get("http://localhost:8080/public/courses/approved")
      .then(response => {
        const updatedCourses = response.data.map(course => ({
          ...course,
          thumbnailUrl: `http://localhost:8080/video/${course.thumbnailUrl.split('\\').pop()}`
        }));
        setCourses(updatedCourses);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleCartOpen = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleAddToCart = useCallback((course) => {
    addToCart(course);
  }, [addToCart]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">
          Khóa học online
        </Typography>
        <IconButton
          color="primary"
          onClick={handleCartOpen}
        >
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>

      <Grid container spacing={4}>
        {courses.map(course => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnailUrl}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Giá: {course.price.toLocaleString('vi-VN')} VND
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/courses/${course.id}`}
                >
                  Xem chi tiết
                </Button>
                <Button
                  size="small"
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
      
      <CartDrawer
        open={isCartOpen}
        onClose={handleCartClose}
      />
    </div>
   
  );
};

export default UserHomePage;