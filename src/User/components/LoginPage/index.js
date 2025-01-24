
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, CircularProgress, Link } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { Google as GoogleIcon } from '@mui/icons-material';
import Cookies from "js-cookie";
const API_URL = 'https://newcoursesbackend.onrender.com';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("authToken");
  console.log("Token from URL:", token);
  // Handle token from URL (Google OAuth callback)
  useEffect(() => {
    

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("authToken", token);
        toast.success("Đăng nhập thành công!");

        // Redirect based on role
        switch (decodedToken.RoleName) {
          case "Teacher":
            window.location.assign("/teacherPost");
            break;
          case "Admin":
            window.location.assign("/admin/courses");
            break;
          case "Student":
            window.location.assign("/");
            break;
          default:
            window.location.assign("/login");
        }
        
        
      } catch (error) {
        console.error("Token handling failed:", error);
        toast.error("Xác thực không thành công.");
        navigate("/login");
      }
    }
  }, [navigate]);

  // Handle successful authentication
  const handleAuthenticationSuccess = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("authToken", token);
      
      toast.success("Đăng nhập thành công!");
      
      // Redirect based on role
      setTimeout(() => {
        switch (decodedToken.RoleName) {
          case "Teacher":
            navigate("/teacherPost");
            break;
          case "Admin":
            navigate("/admin/courses");
            break;
          case "Student":
            navigate("/");
            break;
          default:
            navigate("/login");
        }
      }, 1500);
    } catch (error) {
      console.error("Token handling failed:", error);
      toast.error("Đăng nhập không thành công");
      navigate("/login");
    }
  };

  // Handle regular login
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/public/accounts/login`,
        null,
        {
          params: { username, password }
        }
      );
      
      const { token } = response.data;
      console.log("Manual Login Token:", token);
      handleAuthenticationSuccess(token);
    } catch (error) {
      toast.error("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
        }}
      >
        <Typography 
          component="h1" 
          color="primary" 
          variant="h4" 
          textAlign="center" 
          sx={{ fontWeight: "bold", mb: 4, mt: 2 }}
        >
          Đăng nhập
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%", mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Link
            component={RouterLink} 
            to="/forgot-password" 
            variant="body2" 
            sx={{ textDecoration: "none", display: "block", textAlign: "right", mb: 2 }}
          >
            Quên mật khẩu?
          </Link>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 1, padding: "10px", fontSize: "16px" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng nhập"}
          </Button>

          {/* <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{ mt: 2, mb: 1, padding: "10px", fontSize: "16px" }}
          >
            Đăng nhập bằng Google
          </Button> */}

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Bạn chưa có tài khoản?{" "}
            <Link component={RouterLink} to="/register" variant="body2" sx={{ textDecoration: "none" }}>
              Đăng ký
            </Link>
          </Typography>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default LoginPage;