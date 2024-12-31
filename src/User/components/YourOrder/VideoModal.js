// import React from 'react';
// import { Modal, Box } from '@mui/material';

// const VideoModal = ({ open, onClose, videoUrl }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="video-modal"
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Box sx={{ 
//         bgcolor: 'background.paper',
//         boxShadow: 24,
//         p: 2,
//         maxWidth: '90vw',
//         maxHeight: '90vh',
//       }}>
//         <video 
//           width="100%" 
//           height="auto" 
//           controls 
//           autoPlay
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Trình duyệt của bạn không hỗ trợ thẻ video.
//         </video>
//       </Box>
//     </Modal>
//   );
// };

// export default VideoModal;
import React from 'react';
import { Modal, Box } from '@mui/material';

const VideoModal = ({ open, onClose, videoUrl }) => {
  // Log để debug
  console.log('Video URL:', videoUrl);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="video-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '800px'
        }}
      >
        <video
          controls
          autoPlay
          width="100%"
          height="auto"
          style={{ maxHeight: '70vh' }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Modal>
  );
};

export default VideoModal;