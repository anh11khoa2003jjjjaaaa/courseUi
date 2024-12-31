import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/public/accounts');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewRole(user.roleId);
    setOpen(true);
  };

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleSaveRole = async () => {
    try {
      await axios.put(`http://localhost:8080/public/accounts/${editingUser.accountID}/role`, { roleId: newRole });
      fetchUsers();
      setEditingUser(null);
      setOpen(false);
      toast.success('Cập nhật quyền thành công!');
    } catch (error) {
      console.error('Failed to update user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return 'Quản trị viên';
      case 2:
        return 'Giáo viên';
      case 3:
        return 'Học sinh';
      default:
        return 'Không xác định';
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý tài khoản người dùng
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Mật khẩu</TableCell>
              <TableCell>Quyền</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.accountID}>
                <TableCell>{user.accountID}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>
  {"*".repeat(user.passWord.length > 10 ? 10 : user.passWord.length)}
  {user.passWord.length > 10 ? "..." : ""}
</TableCell>

                <TableCell>{getRoleName(user.roleId)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditUser(user)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cập nhật quyền</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng chọn quyền mới cho người dùng.
          </DialogContentText>
          <Select value={newRole} onChange={handleRoleChange} fullWidth>
            <MenuItem value={1}>Quản trị viên</MenuItem>
            <MenuItem value={2}>Giáo viên</MenuItem>
            <MenuItem value={3}>Học sinh</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSaveRole} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

     
    </Box>
  );
};

export default AccountPage;