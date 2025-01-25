
import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, InputBase, Box, Avatar,
  Badge, MenuItem, FormControl, CircularProgress, Select, ListItem,
  ListItemAvatar,
  ListItemText, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, List, CardActions
} from '@mui/material';
import { Search as SearchIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../../../../Hook/useDebounce';
import logo from '../../../UserImg/logo1.png';
import { useCart } from "../../CartContext";
import CartDrawer from "../../CartDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from 'axios';

const Navbar = ({ onSearch, user, onLogout, usertoken }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formatThumbnailUrl = (url) => {
    if (!url) return "default-image.jpg";
  
    // Check if it's a Google Drive URL
    const fileIdMatch = url.match(/(?:\/d\/|id=)([^\/&]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1]; 
      console.log(fileId);// Lấy fileId từ URL
      // Trả về URL hình ảnh đúng định dạng
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return url; // Trả về URL gốc nếu không phải là URL Google Drive
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://newcoursesbackend.onrender.com/public/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCoursesByCategory = async () => {
      if (!selectedCategory) {
        setCourses([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newcoursesbackend.onrender.com/public/courses/category/${selectedCategory}`
        );

        const formattedCourses = response.data.map((course) => ({
          ...course,
          thumbnailUrl: formatThumbnailUrl(course.thumbnailUrl),
        }));

        setCourses(formattedCourses);
        setIsDialogOpen(true); // Open dialog when courses are fetched
      } catch (error) {
        console.error("Lỗi khi lấy khóa học:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesByCategory();
  }, [selectedCategory]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCartOpen = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedCategory(""); // Reset selected category when closing dialog
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`); // Navigate to course detail page
    handleDialogClose();
  };
  const handleAddToCart = useCallback(
    (course) => {
      addToCart(course);
    },
    [addToCart]
  );
  return (
    <AppBar position="static">{/*static*/}
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        height: '80px'
      }}>
        {/* Logo and Brand Section */}
        <Box
          component={Link}
          to={usertoken === 'Teacher' ? '/teacherPost' : '/home'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            textDecoration: 'none',
            color: 'inherit',
            flex: '0 0 auto',
            cursor: 'pointer'
          }}
        >
    <Avatar
      sx={{
        width: 50,
        height: 50,
        backgroundColor: 'blue', // Màu nền xanh
        color: 'white', // Chữ màu trắng
        fontSize: '24px', // Kích thước chữ
        fontWeight: 'bold', // Độ đậm của chữ
      }}
    >
      K
    </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold'
            }}
          >
            Kurge
          </Typography>
        </Box>

        <FormControl
          sx={{
            minWidth: 150,
            backgroundColor: "white",
            borderRadius: "5px",
            marginRight: "20px",
          }}
        >
          {usertoken === "Student" &&(
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            sx={{ height: 40 }}
            
          >
            <MenuItem value="">
              <em>Chọn danh mục</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          )}
        </FormControl>

        {/* Dialog hiển thị danh sách khóa học */}
        <Dialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            Khóa học trong danh mục
            {!loading && courses.length > 0 && ` (${courses.length} khóa học)`}
          </DialogTitle>
          <DialogContent dividers>
            {loading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : courses.length > 0 ? (
              <List>
                {courses.map((course) => (
                  <ListItem
                    key={course.id}
                    button
                    onClick={() => handleCourseClick(course.id)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={course.thumbnailUrl}
                        alt={course.title}
                        variant="rounded"
                        sx={{ width: 80, height: 60, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={course.title}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {course.description}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            {course.price ? `${course.price.toLocaleString()} VND` : 'Miễn phí'}
                          </Typography>
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
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" textAlign="center" py={3}>
                Không tìm thấy khóa học nào trong danh mục này
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>

        {user && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '4px 15px',
            maxWidth: '400px',
            width: '100%',
            margin: '0 40px'
          }}>
            <InputBase
              placeholder="Tìm kiếm khóa học..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                flex: 1,
                '& input': {
                  padding: '8px 0'
                }
              }}
            />
            <IconButton
              type="submit"
              sx={{
                p: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            position: 'relative',
            top: 5,
            left: 16,
          }}
        >
          <IconButton
            color="white"
            onClick={handleCartOpen}
            disabled={usertoken === "Admin"}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* User Section */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flex: '0 0 auto'
        }}>
          {usertoken === 'Admin' && (
            <IconButton
              component={Link}
              to="/admin/courses"
              sx={{
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
              aria-label="Back to Admin Courses"
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          {user ? (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {user.displayName}
              </Typography>
              {usertoken === "Student" && (
                <Button
                  color="inherit"
                  component={Link}
                  to={`/orders/user/${user.userID}`}
                  sx={{
                    borderRadius: '20px',
                    padding: '6px 16px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Đơn hàng của bạn
                </Button>
              )}
              <Button
                color="inherit"
                onClick={onLogout}
                sx={{
                  borderRadius: '20px',
                  padding: '6px 16px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                borderRadius: '20px',
                padding: '6px 16px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>
      <CartDrawer
        open={isCartOpen}
        onClose={handleCartClose}
      />
    </AppBar>
  );
};

export default Navbar;