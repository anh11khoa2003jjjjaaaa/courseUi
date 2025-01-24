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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://newcoursesbackend.onrender.com/public/categories');
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
      await axios.delete(`https://newcoursesbackend.onrender.com/public/categories/${categoryId}`);
      fetchCategories();
      toast.success('Xóa danh mục thành công!');
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleSaveCategory = async () => {
    try {
      if (currentCategory.id) {
        await axios.put(`https://newcoursesbackend.onrender.com/public/categories/${currentCategory.id}`, currentCategory);
        toast.success('Cập nhật danh mục thành công!');
      } else {
        await axios.post('https://newcoursesbackend.onrender.com/public/categories', currentCategory);
        toast.success('Thêm danh mục thành công!');
      }
      setOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý danh mục
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Tìm kiếm danh mục"
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
          Thêm danh mục
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên danh mục</TableCell>
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
        <DialogTitle>{currentCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng nhập thông tin danh mục.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Tên danh mục"
            type="text"
            fullWidth
            name="name"
            value={currentCategory?.name || ''}
            onChange={handleChange}
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