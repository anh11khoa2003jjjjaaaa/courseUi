
// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material';
// import { Add, Edit, Delete, Search } from '@mui/icons-material';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import VideoModal from '../YourOrder/VideoModal';
// import {jwtDecode} from "jwt-decode";
// const TeacherPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [open, setOpen] = useState(false);
//   const [currentCourse, setCurrentCourse] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const [teacherId, setTeacherId] = useState(null);
//   const token = localStorage.getItem('authToken');
//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const accountID = decodedToken.AccountID;

//         axios
//           .get(`http://localhost:8080/public/users/account/${accountID}`)
//           .then((response) => {
//             setTeacherId(response.data.userID);
//           })
//           .catch((error) => {
//             console.error('Failed to fetch user ID:', error);
//             toast.error('Lỗi khi lấy thông tin tài khoản. Vui lòng thử lại!');
//             navigate('/login');
//           });
//       } catch (error) {
//         console.error('Token không hợp lệ:', error);
//         toast.error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
//         navigate('/login');
//       }
//     } else {
//       toast.error('Vui lòng đăng nhập để truy cập.');
//       navigate('/login');
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     if (teacherId) {
//       fetchCourses();
//       fetchCategories();
//     }
//   }, [teacherId]);
//   // useEffect(() => {
//   //   fetchCourses();
//   //   fetchCategories();
//   //   fetchTeachers();
//   // }, []);

  
//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/public/courses');
//       setCourses(response.data);

//     } catch (error) {
//       console.error('Failed to fetch courses:', error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/public/categories');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/public/users/teachers');
//       setTeachers(response.data);
//     } catch (error) {
//       console.error('Failed to fetch teachers:', error);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleAddCourse = () => {
//     setCurrentCourse(null);
//     setThumbnail(null);
//     setVideo(null);
//     setThumbnailPreview(null);
//     setVideoPreview(null);
//     setErrors({});
//     setOpen(true);
//   };

//   const handleEditCourse = (course) => {
//     setCurrentCourse(course);
//     setThumbnail(null);
//     setVideo(null);
   
//     setThumbnailPreview(`http://localhost:8080/video/${course.thumbnailUrl.split('\\').pop()}`); // Đặt URL của hình ảnh từ máy chủ
//     setVideoPreview(`http://localhost:8080/video/${course.videoUrl.split('\\').pop()}`); // Đặt URL của video từ máy chủ
//     setErrors({});
//     setOpen(true);
//   };

//   const handleDeleteCourse = async (courseId) => {
//     try {
//       await axios.delete(`http://localhost:8080/public/courses/${courseId}`);
//       fetchCourses();
//       toast.success('Xóa khóa học thành công!');
//     } catch (error) {
//       console.error('Failed to delete course:', error);
//       toast.error('Failed to delete course');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!currentCourse.title) {
//       newErrors.title = 'Tiêu đề không được để trống';
//     }
//     if (!currentCourse.description) {
//       newErrors.description = 'Mô tả không được để trống';
//     }
//     if (!currentCourse.price || currentCourse.price <= 0) {
//       newErrors.price = 'Giá không được để trống và phải lớn hơn hơn 0';
//     }
 
//     if (!currentCourse.categoryId) {
//       newErrors.categoryId = 'Danh mục không được để trống';
//     }
//     if (!thumbnail && !currentCourse.thumbnailUrl) {
//       newErrors.thumbnail = 'Hình ảnh không được để trống';
//     }
//     if (!video && !currentCourse.videoUrl) {
//       newErrors.video = 'Video không được để trống';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveCourse = async () => {
//     if (!validateForm()) return;

//     const formData = new FormData();
//     formData.append('title', currentCourse.title);
//     formData.append('description', currentCourse.description);
//     formData.append('price', currentCourse.price);
//     formData.append('teacherId', teacherId);
//     formData.append('categoryId', currentCourse.categoryId);
//     if (thumbnail) formData.append('thumbnail', thumbnail);
//     if (video) formData.append('video', video);

//     try {
//       if (currentCourse.id) {
//         await axios.put(`http://localhost:8080/public/courses/${currentCourse.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         toast.success('Cập nhật khóa học thành công!');
//       } else {
//         await axios.post('http://localhost:8080/public/courses', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         toast.success('Thêm khóa học thành công!');
//       }
//       setOpen(false);
//       fetchCourses();
//     } catch (error) {
//       console.error('Failed to save course:', error);
//       toast.error('Failed to save course');
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentCourse({ ...currentCourse, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     const { name, files } = event.target;
//     if (name === 'thumbnail') {
//       setThumbnail(files[0]);
//       setThumbnailPreview(URL.createObjectURL(files[0]));
//     } else if (name === 'video') {
//       setVideo(files[0]);
//       setVideoPreview(URL.createObjectURL(files[0]));
//     }
//   };

//   const filteredCourses = courses.filter(course =>
//     course.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddCategory = () => {

//     navigate('/teacherAddCategory');
//   }


//   return (
//     <Box sx={{ p: 3 }}>

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
//         <Button sx={{ margin: '5px', position: 'relative', left: '30%' }} variant="contained" color="primary" startIcon={<Add />} onClick={handleAddCourse}>
//           Tạo khóa học
//         </Button>
//         <Button sx={{ margin: '5px' }} variant="contained" color="secondary" startIcon={<Add />} onClick={handleAddCategory}>
//           Tạo chủ đề
//         </Button>
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
//               <TableCell>Lý do hủy</TableCell>
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
//                 {/* Hiển thị trạng thái với màu sắc phù hợp */}
//                 {course.status === 0 ? (
//                   <TableCell
//                     sx={{ color: 'green', fontWeight: 'bold' }}
//                   >
//                     Đã duyệt
//                   </TableCell>
//                 ) : course.status === 1 ? (
//                   <TableCell
//                     sx={{ color: 'orange', fontWeight: 'bold' }}
//                   >
//                     Chưa duyệt
//                   </TableCell>
//                 ) : (
//                   <TableCell
//                     sx={{ color: 'red', fontWeight: 'bold' }}
//                   >
//                     Đã bị hủy
//                   </TableCell>
//                 )}

//                 <TableCell sx={{ color: 'red', fontWeight: 'bold' }}>{course.cancelReason}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleEditCourse(course)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={() => handleDeleteCourse(course.id)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>{currentCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Vui lòng nhập thông tin khóa học.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Tiêu đề"
//             type="text"
//             fullWidth
//             name="title"
//             value={currentCourse?.title || ''}
//             onChange={handleChange}
//             error={!!errors.title}
//             helperText={errors.title}
//           />
//           <TextField
//             margin="dense"
//             label="Mô tả"
//             type="text"
//             fullWidth
//             name="description"
//             value={currentCourse?.description || ''}
//             onChange={handleChange}
//             error={!!errors.description}
//             helperText={errors.description}
//           />
//           <TextField
//             margin="dense"
//             label="Giá"
//             type="number"
//             fullWidth
//             name="price"
//             value={currentCourse?.price || ''}
//             onChange={handleChange}
//             error={!!errors.price}
//             helperText={errors.price}
//             inputProps={{ min: 0 }}
//           />
//           {/* <TextField
//             margin="dense"
//             label="Teacher"
//             select
//             fullWidth
//             name="teacherId"
//             value={currentCourse?.teacherId || ''}
//             onChange={handleChange}
//             error={!!errors.teacherId}
//             helperText={errors.teacherId}
//           >
//             {teachers.map((teacher) => (
//               <MenuItem key={teacher.userID} value={teacher.userID}>
//                 {teacher.displayName}
//               </MenuItem>
//             ))}
//           </TextField> */}
//           <TextField
//             margin="dense"
//             label="Category"
//             select
//             fullWidth
//             name="categoryId"
//             value={currentCourse?.categoryId || ''}
//             onChange={handleChange}
//             error={!!errors.categoryId}
//             helperText={errors.categoryId}
//           >
//             {categories.map((category) => (
//               <MenuItem key={category.id} value={category.id}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </TextField>
//           <input
//             accept="image/*"
//             style={{ display: 'none' }}
//             id="thumbnail-upload"
//             type="file"
//             name="thumbnail"
//             onChange={handleFileChange}
//           />
//           <label htmlFor="thumbnail-upload">
//             <Button variant="contained" color="primary" component="span">
//               Upload Thumbnail
//             </Button>
//           </label>
//           {thumbnailPreview && (
//             <Box mt={2}>
//               <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ width: '100%' }} />
//             </Box>
//           )}
//           {errors.thumbnail && (
//             <Typography color="error" variant="body2">
//               {errors.thumbnail}
//             </Typography>
//           )}
//           <input
//             accept="video/*"
//             style={{ display: 'none' }}
//             id="video-upload"
//             type="file"
//             name="video"
//             onChange={handleFileChange}
//           />
//           <label htmlFor="video-upload">
//             <Button variant="contained" color="primary" component="span">
//               Upload Video
//             </Button>
//           </label>
//           {videoPreview && (
//             <Box mt={2}>
//               <video controls style={{ width: '100%' }}>
//                 <source src={videoPreview} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </Box>
//           )}
//           {errors.video && (
//             <Typography color="error" variant="body2">
//               {errors.video}
//             </Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="primary">
//             Hủy
//           </Button>
//           <Button onClick={handleSaveCourse} color="primary">
//             Lưu
//           </Button>
//         </DialogActions>
//       </Dialog>

//     </Box>
//   );
// };

// export default TeacherPage;

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import VideoModal from '../YourOrder/VideoModal';
import {jwtDecode} from "jwt-decode";
const TeacherPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [teacherId, setTeacherId] = useState(null);
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const accountID = decodedToken.AccountID;

        axios
          .get(`http://localhost:8080/public/users/account/${accountID}`)
          .then((response) => {
            setTeacherId(response.data.userID);
          })
          .catch((error) => {
            console.error('Failed to fetch user ID:', error);
            toast.error('Lỗi khi lấy thông tin tài khoản. Vui lòng thử lại!');
            navigate('/login');
          });
      } catch (error) {
        console.error('Token không hợp lệ:', error);
        toast.error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
        navigate('/login');
      }
    } else {
      toast.error('Vui lòng đăng nhập để truy cập.');
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (teacherId) {
      fetchCourses();
      fetchCategories();
    }
  }, [teacherId]);
  // useEffect(() => {
  //   fetchCourses();
  //   fetchCategories();
  //   fetchTeachers();
  // }, []);

  
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/public/courses');
      setCourses(response.data);

    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/public/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/public/users/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setThumbnail(null);
    setVideo(null);
    setThumbnailPreview(null);
    setVideoPreview(null);
    setErrors({});
    setOpen(true);
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setThumbnail(null);
    setVideo(null);
   
    setThumbnailPreview(`http://localhost:8080/video/${course.thumbnailUrl.split('\\').pop()}`); // Đặt URL của hình ảnh từ máy chủ
    setVideoPreview(`http://localhost:8080/video/${course.videoUrl.split('\\').pop()}`); // Đặt URL của video từ máy chủ
    setErrors({});
    setOpen(true);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/public/courses/${courseId}`);
      fetchCourses();
      toast.success('Xóa khóa học thành công!');
    } catch (error) {
      console.error('Failed to delete course:', error);
      toast.error('Failed to delete course');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentCourse?.title || currentCourse.title.trim() === '') {
      newErrors.title = 'Tiêu đề không được để trống';
    }
    if (!currentCourse?.description || currentCourse.description.trim() === '') {
      newErrors.description = 'Mô tả không được để trống';
    }
    if (!currentCourse?.price || currentCourse.price <= 0) {
      newErrors.price = 'Giá không được để trống và phải lớn hơn 0';
    }
    if (!currentCourse?.categoryId) {
      newErrors.categoryId = 'Danh mục không được để trống';
    }
    if (!thumbnail && !currentCourse?.thumbnailUrl) {
      newErrors.thumbnail = 'Hình ảnh không được để trống';
    }
    if (!video && !currentCourse?.videoUrl) {
      newErrors.video = 'Video không được để trống';
    }
    setErrors(newErrors);
    
    // Kiểm tra nếu có lỗi
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSaveCourse = async () => {
    if (!validateForm()) {
      
      return;
    }
  
    const formData = new FormData();
    formData.append('title', currentCourse.title);
    formData.append('description', currentCourse.description);
    formData.append('price', currentCourse.price);
    formData.append('teacherId', teacherId);
    formData.append('categoryId', currentCourse.categoryId);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    if (video) formData.append('video', video);
  
    try {
      if (currentCourse.id) {
        await axios.put(`http://localhost:8080/public/courses/${currentCourse.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Cập nhật khóa học thành công!');
      } else {
        await axios.post('http://localhost:8080/public/courses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Thêm khóa học thành công!');
      }
      setOpen(false);
      fetchCourses();
    } catch (error) {
      console.error('Failed to save course:', error);
      toast.error('Không thể lưu khóa học');
    }
  };
  

  const handleChange = (event) => {
   
    const { name, value } = event.target;
    setCurrentCourse({ ...currentCourse, [name]: value });
    if (!validateForm()) {
     
      return;
    }
  };

  const handleFileChange = (event) => {
    
    const { name, files } = event.target;
    if (name === 'thumbnail') {
      setThumbnail(files[0]);
      setThumbnailPreview(URL.createObjectURL(files[0]));
    } else if (name === 'video') {
      setVideo(files[0]);
      setVideoPreview(URL.createObjectURL(files[0]));
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {

    navigate('/teacherAddCategory');
  }


  return (
    <Box sx={{ p: 3 }}>

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
        <Button sx={{ margin: '5px', position: 'relative', left: '30%' }} variant="contained" color="primary" startIcon={<Add />} onClick={handleAddCourse}>
          Tạo khóa học
        </Button>
        <Button sx={{ margin: '5px' }} variant="contained" color="secondary" startIcon={<Add />} onClick={handleAddCategory}>
          Tạo chủ đề
        </Button>
      </Box>
      <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Tiêu đề</TableCell>
        <TableCell>Mô tả</TableCell>
        <TableCell>Giá</TableCell>
        <TableCell>Trạng thái</TableCell>
        <TableCell>Lý do hủy</TableCell>
        <TableCell>Hành động</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredCourses.map((course) => (
        <TableRow key={course.id}>
          <TableCell>{course.id}</TableCell>
          <TableCell>{course.title}</TableCell>
          <TableCell>{course.description}</TableCell>
          <TableCell>{`${course.price.toLocaleString('vi-VN')} VND`}</TableCell>
          {/* Hiển thị trạng thái với màu sắc phù hợp */}
          {course.status === 0 ? (
            <TableCell
              sx={{ color: 'green', fontWeight: 'bold' }}
            >
              Đã duyệt
            </TableCell>
          ) : course.status === 1 ? (
            <TableCell
              sx={{ color: 'orange', fontWeight: 'bold' }}
            >
              Chưa duyệt
            </TableCell>
          ) : (
            <TableCell
              sx={{ color: 'red', fontWeight: 'bold' }}
            >
              Đã bị hủy
            </TableCell>
          )}

          <TableCell sx={{ color: 'red', fontWeight: 'bold' }}>
            {course.cancelReason || ''}
          </TableCell>

          <TableCell>
            {/* Chỉ hiển thị nút sửa và xóa nếu trạng thái không phải "Đã duyệt" */}
            {course.status !== 0 && (
              <>
                <IconButton color="primary" onClick={() => handleEditCourse(course)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteCourse(course.id)}>
                  <Delete />
                </IconButton>
              </>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng nhập thông tin khóa học.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Tiêu đề"
            type="text"
            fullWidth
            name="title"
            value={currentCourse?.title || ''}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="dense"
            label="Mô tả"
            type="text"
            fullWidth
            name="description"
            value={currentCourse?.description || ''}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            margin="dense"
            label="Giá"
            type="number"
            fullWidth
            name="price"
            value={currentCourse?.price || ''}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            inputProps={{ min: 0 }}
          />
          {/* <TextField
            margin="dense"
            label="Teacher"
            select
            fullWidth
            name="teacherId"
            value={currentCourse?.teacherId || ''}
            onChange={handleChange}
            error={!!errors.teacherId}
            helperText={errors.teacherId}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.userID} value={teacher.userID}>
                {teacher.displayName}
              </MenuItem>
            ))}
          </TextField> */}
          <TextField
            margin="dense"
            label="Category"
            select
            fullWidth
            name="categoryId"
            value={currentCourse?.categoryId || ''}
            onChange={handleChange}
            error={!!errors.categoryId}
            helperText={errors.categoryId}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="thumbnail-upload"
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
          />
          <label htmlFor="thumbnail-upload">
            <Button variant="contained" color="primary" component="span">
              Upload Thumbnail
            </Button>
          </label>
          {thumbnailPreview && (
            <Box mt={2}>
              <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ width: '100%' }} />
            </Box>
          )}
          {errors.thumbnail && (
            <Typography color="error" variant="body2">
              {errors.thumbnail}
            </Typography>
          )}
          <input
            accept="video/*"
            style={{ display: 'none' }}
            id="video-upload"
            type="file"
            name="video"
            onChange={handleFileChange}
          />
          <label htmlFor="video-upload">
            <Button variant="contained" color="primary" component="span">
              Upload Video
            </Button>
          </label>
          {videoPreview && (
            <Box mt={2}>
              <video controls style={{ width: '100%' }}>
                <source src={videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          )}
          {errors.video && (
            <Typography color="error" variant="body2">
              {errors.video}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSaveCourse} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default TeacherPage;