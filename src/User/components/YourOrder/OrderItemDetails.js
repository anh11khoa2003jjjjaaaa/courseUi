import React, { useState } from 'react';
import { ListItem, ListItemText, CardMedia, Typography, Box } from '@mui/material';
import VideoModal from './VideoModal';

const OrderItemDetails = ({ item }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  // Hàm xử lý URL thumbnail
  const formatThumbnailUrl = (url) => {
    if (!url) return "default-image.jpg";
    const fileIdMatch = url.match(/(?:\/d\/|id=)([^\/&]+)/);
    if (fileIdMatch) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
    return url;
  };

  // Hàm xử lý URL video
  const formatVideoUrl = (url) => {
    if (!url) return "";
    const fileIdMatch = url.match(/(?:\/d\/|id=)([^\/&]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return url;
  };
  const handleThumbnailClick = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const thumbnailUrl = formatThumbnailUrl(item.course.thumbnailUrl);
  const videoUrl =formatVideoUrl(item.course.thumbnailUrl);

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ gap: 2 }}>
        <Box 
          sx={{ 
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
              transition: 'opacity 0.2s'
            }
          }}
          onClick={handleThumbnailClick}
        >
          <img
  src={thumbnailUrl} // Sử dụng thuộc tính src thay vì image
  alt={item.course.title}
  style={{ 
    width: 160, // Chiều rộng
    height: 90, // Chiều cao
    borderRadius: 4, // Độ bo góc (1 trong sx tương đương 4px)
    objectFit: 'cover' // Đảm bảo hình ảnh phủ kín khung
  }}
/>
        </Box>
        <ListItemText
          primary={
            <Typography variant="h6" component="div">
              {item.course.title}
            </Typography>
          }
          secondary={
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.primary" gutterBottom>
                Số lượng: {item.quantity}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Giá: {item.course.price.toLocaleString('vi-VN')} VND
              </Typography>
            </Box>
          }
        />
      </ListItem>

      <VideoModal
        open={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default OrderItemDetails;