import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const HeroSlideshow = () => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Tự động chuyển ảnh
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging, images.length]);

  // Xử lý khi click nút "Next" hoặc "Previous"
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Xử lý kéo thả
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;
    if (diff > 50) {
      handlePrev();
      setIsDragging(false);
    } else if (diff < -50) {
      handleNext();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const currentImage = images[currentIndex];

  return (
    <Box
      sx={{
        position: "relative",
        height: 600,
        background: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('${currentImage.url}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        color: "white",
        overflow: "hidden",
        transition: "background-image 0.8s ease-in-out", // Hiệu ứng chuyển ảnh
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)} // Thả chuột khi ra khỏi slide
    >
      {/* Nội dung */}
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: "600px" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {currentImage.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {currentImage.description}
          </Typography>
        </Box>
      </Container>

      {/* Nút điều hướng */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default HeroSlideshow;
