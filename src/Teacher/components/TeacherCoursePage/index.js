
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


  const formatVideoUrl = (url) => {
    if (!url) return "";
    const fileIdMatch = url.match(/(?:\/d\/|id=)([^\/&]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return url;
  };
  useEffect(() => {
    fetchApprovedCourses();
  }, []);

  const fetchApprovedCourses = async () => {
    try {
      const response = await axios.get('https://newcoursesbackend.onrender.com/public/courses');
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
      await axios.delete(`https://newcoursesbackend.onrender.com/public/courses/${courseId}`);
      fetchApprovedCourses();
      toast.success('Xóa khóa học thành công!');
    } catch (error) {
      console.error('Failed to delete course:', error);
      toast.error('Failed to delete course');
    }
  };

  const handleUpdateStatus = async (courseId) => {
    try {
      await axios.put(`https://newcoursesbackend.onrender.com/public/courses/${courseId}/status`, { status: 2 });
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
      await axios.put(`https://newcoursesbackend.onrender.com/public/courses/cancelReason/${selectedCourse.id}`, null, {
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
  //   const video = `https://newcoursesbackend.onrender.com/video/${videoUrl.split('\\').pop()}`;
  //   setVideoUrl(video);
  //   setIsVideoModalOpen(true);
  // };
  const handleOpenVideoModal = (videoUrl) => {
    // Đảm bảo URL video đầy đủ và hợp lệ
    const video = formatVideoUrl(videoUrl);
    setVideoUrl(video);
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
