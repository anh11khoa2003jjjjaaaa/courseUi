// import React, { useState } from 'react';
// import { Drawer, List, ListItem, ListItemText, Divider, Button, Typography, Avatar } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
// import { Home, School, Category, AccountCircle, ExitToApp } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../../../../User/UserImg/logo1.png';

// const useStyles = makeStyles((theme) => ({
//     drawer: {
//         width: 260,
//         flexShrink: 0,
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100vh',
//     },
//     drawerPaper: {
//         width: 260,
//         backgroundColor: theme.palette.background.paper,
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100vh',
//     },
//     logo: {
//         display: 'flex',
//         justifyContent: 'center',
//         padding: theme.spacing(2),
//     },
//     menuItem: {
//         width: 240,
//         display: 'flex',
//         alignItems: 'center',
//         margin: theme.spacing(0.5, 1),
//         borderRadius: 12,
//         '&:hover': {
//             backgroundColor: theme.palette.action.hover,
//         },
//     },
//     menuIcon: {
//         marginRight: theme.spacing(2),
//     },
//     activeMenuItem: {
//         backgroundColor: '#1976d2',
//         color: '#fff',
//         borderRadius: 12,
//         '&:hover': {
//             backgroundColor: '#1976d2',
//         },
//     },
//     logoutButtonContainer: {
//         marginTop: 'auto',
//         padding: theme.spacing(2),
//     },
//     logoutButton: {
//         backgroundColor: '#f44336 !important',
//         width: '100%',
//         color: '#fff',
//         borderRadius: 12,
//     },
// }));

// const Sidebar = () => {
//     const classes = useStyles();
//     const navigate = useNavigate();
//     const [activeItem, setActiveItem] = useState('/home');

//     const handleItemClick = (path) => {
//         setActiveItem(path);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('authToken');
//         window.location.href = '/login';
//     };

//     const handleClickLogo = () => {
//         navigate('/home');
//     };

//     return (
//         <Drawer
//             className={classes.drawer}
//             variant="permanent"
//             anchor="left"
//             classes={{
//                 paper: classes.drawerPaper,
//             }}
//         >
//             {/* Logo as a Link to /home */}
//             <Avatar
//       sx={{
//         width: 50,
//         height: 50,
//         backgroundColor: 'blue', // Màu nền xanh
//         color: 'white', // Chữ màu trắng
//         fontSize: '24px', // Kích thước chữ
//         fontWeight: 'bold', // Độ đậm của chữ
//       }}
//     >
//       K
//     </Avatar>
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 'bold'
//             }}
//           >
//             Kurge
//           </Typography> 

//             <Divider />

//             <List>
                
//                 <ListItem
//                     component={Link}
//                     to="/admin/courses"
//                     className={`${classes.menuItem} ${activeItem === '/admin/courses' ? classes.activeMenuItem : ''}`}
//                     onClick={() => handleItemClick('/admin/courses')}
//                 >
//                     <School className={classes.menuIcon} />
//                     <ListItemText primary="Khóa học" />
//                 </ListItem>


              
//                 <ListItem
//                     component={Link}
//                     to="/account"
//                     className={`${classes.menuItem} ${activeItem === '/account' ? classes.activeMenuItem : ''}`}
//                     onClick={() => handleItemClick('/account')}
//                 >
//                     <AccountCircle className={classes.menuIcon} />
//                     <ListItemText primary="Tài khoản" />
//                 </ListItem>
//             </List>

//             <div className={classes.logoutButtonContainer}>
//                 <Button
//                     className={classes.logoutButton}
//                     variant="contained"
//                     startIcon={<ExitToApp />}
//                     onClick={handleLogout}
//                 >
//                     Đăng xuất
//                 </Button>
//             </div>
//         </Drawer>
//     );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Button, Typography, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { School, AccountCircle, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 260,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    drawerPaper: {
        width: 260,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
    },
    menuItem: {
        width: 240,
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(0.5, 1),
        borderRadius: 12,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    activeMenuItem: {
        backgroundColor: '#1976d2',
        color: '#fff',
        borderRadius: 12,
        '&:hover': {
            backgroundColor: '#1976d2',
        },
    },
    logoutButtonContainer: {
        marginTop: 'auto',
        padding: theme.spacing(2),
    },
    logoutButton: {
        backgroundColor: '#f44336 !important',
        width: '100%',
        color: '#fff',
        borderRadius: 12,
    },
}));

const Sidebar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('/home');

    const handleItemClick = (path) => {
        setActiveItem(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            {/* Logo và chữ Kurge căn giữa */}
            <Box className={classes.logoContainer}>
                <Avatar sx={{ width: 60, height: 60, backgroundColor: 'blue', color: 'white', fontSize: 30, fontWeight: 'bold' }}>
                    K
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                    Kurge
                </Typography>
            </Box>

            <Divider />

            <List>
                <ListItem
                    component={Link}
                    to="/admin/courses"
                    className={`${classes.menuItem} ${activeItem === '/admin/courses' ? classes.activeMenuItem : ''}`}
                    onClick={() => handleItemClick('/admin/courses')}
                >
                    <School />
                    <ListItemText primary="Khóa học" />
                </ListItem>

                <ListItem
                    component={Link}
                    to="/account"
                    className={`${classes.menuItem} ${activeItem === '/account' ? classes.activeMenuItem : ''}`}
                    onClick={() => handleItemClick('/account')}
                >
                    <AccountCircle />
                    <ListItemText primary="Tài khoản" />
                </ListItem>
            </List>

            <div className={classes.logoutButtonContainer}>
                <Button className={classes.logoutButton} variant="contained" startIcon={<ExitToApp />} onClick={handleLogout}>
                    Đăng xuất
                </Button>
            </div>
        </Drawer>
    );
};

export default Sidebar;
