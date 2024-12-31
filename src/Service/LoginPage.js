import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../services/AuthService";
import { Card, Typography, Alert, Spin, Modal } from "antd";

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("error")) {
      setError("Login failed. Please try again.");
    } else if (query.get("success")) {
     // navigate("/");
    }
  }, [location, navigate]);

  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      setLoading(true);
      const response = await handleGoogleLogin(credential);
      console.log(response);

      if (response.token) {
        setResponseData(response);
        setIsModalVisible(true);
        setMessage("Login successful! Redirecting to home...");
        setError("");
        //setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed: ", error);
    setError("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="591480352874-umkc4sq466ojjtn3hfubqgtnthkso4a4.apps.googleusercontent.com">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
        <Card
          style={{
            width: 500,
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
          title={<Title level={3} style={{ color: "#000dff", fontWeight: "bold", marginBottom: 24 }}>Welcome Back</Title>}
        >
          {error && (
            <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} closable onClose={() => setError("")} />
          )}

          {message && <Alert message={message} type="success" showIcon style={{ marginBottom: 16 }} />}

          {loading ? <Spin tip="Logging in..." size="large" /> : <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} type="icon" />}
        </Card>
      </div>

      <Modal
        title="Login Information"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p><strong>Full Name:</strong> {responseData?.account?.fullName}</p>
        <p><strong>Email:</strong> {responseData?.account?.email}</p>
        <p><strong>Token:</strong> {responseData?.token}</p>
      </Modal>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
