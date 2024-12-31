
// import React, { useState, useEffect } from 'react';
// import {
//   Box, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions
// } from '@mui/material';
// import { Search, Delete } from '@mui/icons-material';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import VideoModal from '../../../User/components/YourOrder/VideoModal';

// const TeacherCoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState('');
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
//   const [videoUrl, setVideoUrl] = useState('');

//   useEffect(() => {
//     fetchApprovedCourses();
//   }, []);

//   const fetchApprovedCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/public/courses');

//       setCourses(response.data);
//       // const video = `http://localhost:8080/video/${response.data.videoUrl.split('\\').pop()}`;
//       // setVideoUrl(video);
//     } catch (error) {
//       console.error('Failed to fetch approved courses:', error);
//       toast.error('Failed to fetch approved courses');
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };
//   const handlReviewVideo=async(courseId)=>{
//     const video=await axios.delete(`http://localhost:8080/public/courses/${courseId}`);
//     setVideoUrl(video.data.videoUrl);
//   }

//   const handleDeleteCourse = async (courseId) => {
//     try {
//       await axios.delete(`http://localhost:8080/public/courses/${courseId}`);
//       fetchApprovedCourses();
//       toast.success('Xóa khóa học thành công!');
//     } catch (error) {
//       console.error('Failed to delete course:', error);
//       toast.error('Failed to delete course');
//     }
//   };

//   const handleUpdateStatus = async (courseId) => {
//     try {
//       await axios.put(`http://localhost:8080/public/courses/${courseId}/status`, { status: 2 });
//       fetchApprovedCourses();
//       toast.success('Duyệt khóa học thành công!');
//     } catch (error) {
//       console.error('Failed to update course status:', error);
//       toast.error('Failed to update course status');
//     }
//   };

//   const handleOpenRejectDialog = (course) => {
//     setSelectedCourse(course);
//     setRejectDialogOpen(true);
//   };

//   const handleCloseRejectDialog = () => {
//     setRejectDialogOpen(false);
//     setRejectReason('');
//     setSelectedCourse(null);
//   };

//   const handleRejectCourse = async () => {
//     if (!rejectReason.trim()) {
//       toast.error('Lý do từ chối không được để trống!');
//       return;
//     }

//     try {
//       // Gọi API cập nhật lý do từ chối
//       await axios.put(`http://localhost:8080/public/courses/cancelReason/${selectedCourse.id}`, null, {
//         params: { reason: rejectReason },
//       });

//       fetchApprovedCourses(); // Làm mới danh sách khóa học
//       toast.success('Từ chối khóa học thành công!');
//       handleCloseRejectDialog(); // Đóng hộp thoại
//     } catch (error) {
//       console.error('Failed to update cancel reason:', error);
//       toast.error('Failed to update cancel reason');
//     }
//   };

//   const filteredCourses = courses.filter((course) =>
//     course.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const handleCloseVideoModal = () => {
//     setIsVideoModalOpen(false);
//   };
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Quản lý khóa học đã duyệt
//       </Typography>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <TextField
//           label="Tìm kiếm khóa học"
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           InputProps={{
//             endAdornment: (
//               <IconButton>
//                 <Search />
//               </IconButton>
//             ),
//           }}
//         />
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Tiêu đề</TableCell>
//               <TableCell>Mô tả</TableCell>
//               <TableCell>Giá</TableCell>
//               <TableCell>Trạng thái</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredCourses.map((course) => (
//               <TableRow key={course.id}>
//                 <TableCell>{course.id}</TableCell>
//                 <TableCell>{course.title}</TableCell>
//                 <TableCell>{course.description}</TableCell>
//                 <TableCell>{`${course.price.toLocaleString('vi-VN')} VND`}</TableCell>
//                 {(course.status === 1) ? (
//                   <TableCell>Chờ duyệt</TableCell>
//                 ) : (
//                   <TableCell>Đã duyệt</TableCell>
//                 )}
//                 <TableCell>
//                   <IconButton color="secondary" onClick={() => handleDeleteCourse(course.id)}>
//                     <Delete />
//                   </IconButton>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleUpdateStatus(course.id)}
//                     disabled={course.status === 0}
//                     sx={{ mx: 1 }}
//                   >
//                     Duyệt
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => handleOpenRejectDialog(course)}
//                   >
//                     Từ chối
//                   </Button>

//                   <Button
//                     variant="outlined"
//                     color="info"
//                     onClick={() => {
//                       setVideoUrl(course.videoUrl); // Cập nhật URL video
//                       setIsVideoModalOpen(true);   // Mở modal
//                     }}
//                   >
//                     Xem chi tiết
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog để nhập lý do từ chối */}
//       <Dialog open={rejectDialogOpen} onClose={handleCloseRejectDialog}>
//         <DialogTitle>Nhập lý do từ chối</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Lý do từ chối"
//             multiline
//             rows={4}
//             fullWidth
//             variant="outlined"
//             value={rejectReason}
//             onChange={(e) => setRejectReason(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseRejectDialog} color="secondary">
//             Hủy
//           </Button>
//           <Button onClick={handleRejectCourse} color="error" variant="contained">
//             Từ chối
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {filteredCourses.map((course) => (
//       <VideoModal
//         open={isVideoModalOpen}
//         onClose={handleCloseVideoModal}
//         onClick={() => handlReviewVideo(course.id)}
//         videoUrl={videoUrl}
//       />
//       ))}
//       <ToastContainer />
//     </Box>
//   );
// };

// export default TeacherCoursePage;
import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Search, Delete } from '@mui/icons-material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoModal from '../../../User/components/YourOrder/VideoModal';
import { Visibility } from '@mui/icons-material';

const TeacherCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    fetchApprovedCourses();
  }, []);

  const fetchApprovedCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/public/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch approved courses:', error);
      toast.error('Failed to fetch approved courses');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/public/courses/${courseId}`);
      fetchApprovedCourses();
      toast.success('Xóa khóa học thành công!');
    } catch (error) {
      console.error('Failed to delete course:', error);
      toast.error('Failed to delete course');
    }
  };

  const handleUpdateStatus = async (courseId) => {
    try {
      await axios.put(`http://localhost:8080/public/courses/${courseId}/status`, { status: 2 });
      fetchApprovedCourses();
      toast.success('Duyệt khóa học thành công!');
    } catch (error) {
      console.error('Failed to update course status:', error);
      toast.error('Failed to update course status');
    }
  };

  const handleOpenRejectDialog = (course) => {
    setSelectedCourse(course);
    setRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setRejectDialogOpen(false);
    setRejectReason('');
    setSelectedCourse(null);
  };

  const handleRejectCourse = async () => {
    if (!rejectReason.trim()) {
      toast.error('Lý do từ chối không được để trống!');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/public/courses/cancelReason/${selectedCourse.id}`, null, {
        params: { reason: rejectReason },
      });

      fetchApprovedCourses();
      toast.success('Từ chối khóa học thành công!');
      handleCloseRejectDialog();
    } catch (error) {
      console.error('Failed to update cancel reason:', error);
      toast.error('Failed to update cancel reason');
    }
  };

  // const handleOpenVideoModal = (videoUrl) => {
  //   const video = `http://localhost:8080/video/${videoUrl.split('\\').pop()}`;
  //   setVideoUrl(video);
  //   setIsVideoModalOpen(true);
  // };
  const handleOpenVideoModal = (videoUrl) => {
    // Đảm bảo URL video đầy đủ và hợp lệ
    const fullVideoUrl = videoUrl.startsWith('http') 
      ? videoUrl 
      : `http://localhost:8080/video/${videoUrl.split('\\').pop()}`;
    setVideoUrl(fullVideoUrl);
    setIsVideoModalOpen(true);
  };
  

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoUrl('');
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý khóa học đã duyệt
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Tìm kiếm khóa học"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <Search />
              </IconButton>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20px', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ width: '150px', fontWeight: 'bold' }}>Tiêu đề</TableCell>
              <TableCell sx={{ width: '300px', fontWeight: 'bold' }}>Mô tả</TableCell>
              <TableCell sx={{ width: '100px', fontWeight: 'bold' }}>Giá</TableCell>
              <TableCell sx={{ width: '50px', fontWeight: 'bold' }}>Trạng thái</TableCell>
              <TableCell sx={{ width: '200px', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{`${course.price.toLocaleString('vi-VN')} VND`}</TableCell>
                <TableCell
                  sx={{
                    color:
                      course.status === 0
                        ? 'green' // Màu xanh cho Đã duyệt
                        : course.status === 1
                          ? 'orange' // Màu cam cho Chờ duyệt
                          : 'red', // Màu đỏ cho Đã hủy
                    fontWeight: 'bold', // Tô đậm chữ
                  }}
                >
                  {course.status === 0
                    ? 'Đã duyệt'
                    : course.status === 1
                      ? 'Chờ duyệt'
                      : 'Đã hủy'}
                </TableCell>


                <TableCell>
                  <IconButton color="secondary" onClick={() => handleDeleteCourse(course.id)}>
                    <Delete />
                  </IconButton>
                  {course.status === 1 && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateStatus(course.id)}
                        sx={{ mx: 1, width: '60px',height: '30px' }}
                      >
                        Duyệt
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenRejectDialog(course)}
                        sx={{ width: '60px',height: '30px' }}
                      >
                        Hủy
                      </Button>
                    </>
                  )}

                  <IconButton
                    color="info"
                    onClick={() => handleOpenVideoModal(course.videoUrl)}
                  >
                    <Visibility />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog để nhập lý do từ chối */}
      <Dialog open={rejectDialogOpen} onClose={handleCloseRejectDialog}>
        <DialogTitle>Nhập lý do từ chối</DialogTitle>
        <DialogContent>
          <TextField
            label="Lý do từ chối"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleRejectCourse} color="error" variant="contained">
            Từ chối
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal hiển thị video */}
      <VideoModal open={isVideoModalOpen} onClose={handleCloseVideoModal} videoUrl={videoUrl} />

      <ToastContainer />
    </Box>
  );
};

export default TeacherCoursePage;
