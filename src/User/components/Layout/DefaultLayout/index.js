import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Box, Card, CardContent, CardMedia,CardActions,Button, Grid, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link,useNavigate } from 'react-router-dom'; 
import CartDrawer from '../../CartDrawer';
import { useCart } from '../../CartContext';
import Cookies from 'js-cookie';
import Chatbox from '../../Chatbox/Chatbox';
import ChatboxToggle from '../../Chatbox/ChatboxToggle';
const DefaultLayout = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const[usertoken,setUsertoken]=useState(null);
    const navigate = useNavigate();
   
  

const { cartItems, addToCart } = useCart();
const [userRole, setUserRole] = useState("");
    useEffect(() => {
        // Lấy dữ liệu khóa học từ backend khi component được mount
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://newcoursesbackend.onrender.com/public/courses');
                const updatedCourses = response.data.map(course => ({
                    ...course,
                    thumbnailUrl: `https://newcoursesbackend.onrender.com/video/${course.thumbnailUrl.split('\\').pop()}`
                }));
                setCourses(updatedCourses);
                setSearchResults(updatedCourses); // Hiển thị tất cả khóa học ban đầu
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };

        
        fetchCourses();
        
    }, []); // Chỉ chạy một lần khi component được mount

  
    
    useEffect(() => {
        const checkAuth = async () => {
            const cookieToken = Cookies.get('authToken');
            const localToken = localStorage.getItem('authToken');
            const token = cookieToken || localToken;
    
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserRole(decodedToken.RoleName); // Lưu RoleName từ token
                    // Nếu token từ cookie, lưu vào localStorage
                    if (cookieToken && !localToken) {
                        localStorage.setItem('authToken', cookieToken);
                    }
    
                    // Fetch user data với token
                    const response = await axios.get(
                        `https://newcoursesbackend.onrender.com/public/users/account/${decodedToken.AccountID}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    );
    
                    setUser(response.data);
                    setUsertoken(decodedToken.RoleName);
                } catch (error) {
                    console.error('Auth error:', error);
                    handleLogout();
                }
            } else {
                setUser(null); // Xóa thông tin người dùng nếu không có token
                setUsertoken(null);
            }
        };
    
        checkAuth();
    }, [Cookies.get('authToken'), localStorage.getItem('authToken')]); // Thêm dependency để lắng nghe sự thay đổi token
    
    const handleSearch = useCallback((searchTerm) => {
        if (!searchTerm.trim()) {
            setOpen(false);
            return;
        }

        const results = courses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setOpen(true);
    }, [courses]);
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        navigate('/login');
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Navbar onSearch={handleSearch} user={user} onLogout={handleLogout} usertoken={usertoken} />
            <main>
                {children}
                {/* Hiển thị kết quả tìm kiếm trong Dialog */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                    BackdropProps={{ onClick: handleClose }}
                >
                    <DialogTitle>
                        Kết quả tìm kiếm
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {searchResults.length > 0 ? (
                                    searchResults.map(course => (
                                        <Grid item xs={12} sm={6} md={4} key={course.id}>
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
                                                        Price: {course.price} VND
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        component={Link} // Thêm này
                                                        to={`/courses/${course.id}`}
                                                        onClick={handleClose} // Thêm này
                                                    >
                                                        Xem chi tiết
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => addToCart(course)}
                                                        disabled={userRole === 'Admin'} // Disable nếu userRole là Admin
                                                    >
                                                        Thêm vào giỏ
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography variant="h6" component="div">
                                        No results found
                                    </Typography>
                                )}
                            </Grid>
                        </Box>
                    </DialogContent>
                </Dialog>
                {user && usertoken && <ChatboxToggle />}
            </main>
            
            <Footer />
        </div>
    );
};

export default DefaultLayout;