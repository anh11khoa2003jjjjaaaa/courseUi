import React, { useState } from 'react';
import { ListItem, ListItemText, CardMedia, Typography, Box } from '@mui/material';
import VideoModal from './VideoModal';

const OrderItemDetails = ({ item }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleThumbnailClick = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const thumbnailUrl = `http://localhost:8080/video/${item.course.thumbnailUrl.split('\\').pop()}`;
  const videoUrl = `http://localhost:8080/video/${item.course.videoUrl.split('\\').pop()}`;

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
          <CardMedia
            component="img"
            sx={{ 
              width: 160,
              height: 90,
              borderRadius: 1,
              objectFit: 'cover'
            }}
            image={thumbnailUrl}
            alt={item.course.title}
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