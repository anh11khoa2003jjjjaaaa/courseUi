import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/public/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setOpen(true);
  };
  
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8080/public/categories/${categoryId}`);
      fetchCategories();
      toast.success('Xóa chủ đề thành công!');
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Failed to delete category');
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!currentCategory?.name || currentCategory.name.trim() === '') {
      newErrors.name = 'Tên chủ đề không được để trống!';
    }
  
    setErrors(newErrors); // Cập nhật trạng thái lỗi để hiển thị nếu cần
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };
  
  const handleSaveCategory = async () => {
    if (!validateForm()) return; // Nếu không hợp lệ, dừng lại
  
    try {
      if (currentCategory?.id) {
        await axios.put(`http://localhost:8080/public/categories/${currentCategory.id}`, currentCategory);
        toast.success('Cập nhật chủ đề thành công!');
      } else {
        await axios.post('http://localhost:8080/public/categories', currentCategory);
        toast.success('Thêm chủ đề thành công!');
      }
      setOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      toast.error('Failed to save category');
    }
  };
  
  
  // const handleSaveCategory = async () => {
  //   try {
  //     if (currentCategory.id) {
  //       await axios.put(`http://localhost:8080/public/categories/${currentCategory.id}`, currentCategory);
  //       toast.success('Cập nhật chủ đề thành công!');
  //     } else {
  //       await axios.post('http://localhost:8080/public/categories', currentCategory);
  //       toast.success('Thêm chủ đề thành công!');
  //     }
  //     setOpen(false);
  //     fetchCategories();
  //   } catch (error) {
  //     console.error('Failed to save category:', error);
  //     toast.error('Failed to save category');
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
    if (!validateForm()) return;
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
   
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Tìm kiếm chủ đề"
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
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddCategory}>
          Thêm chủ đề
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên chủ đề</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditCategory(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteCategory(category.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentCategory ? 'Chỉnh sửa chủ đề' : 'Thêm chủ đề'}</DialogTitle>
        <DialogContent>
  <DialogContentText>
    Vui lòng nhập thông tin chủ đề.
  </DialogContentText>
  <TextField
    autoFocus
    margin="dense"
    label="Tên chủ đề"
    type="text"
    fullWidth
    name="name"
    value={currentCategory?.name || ''}
    onChange={handleChange}
    error={!!errors.name} // Hiển thị lỗi nếu có
    helperText={errors.name} // Hiển thị thông báo lỗi
  />
</DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSaveCategory} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default CategoryPage;