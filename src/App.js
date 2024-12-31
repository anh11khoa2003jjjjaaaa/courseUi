// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import AdminRoutes from '~/admin/AdminRoutes';
// import UserRoutes from '~/user/UserRoutes';
// import PrivateRoute from './PrivateRoute';
// import Layout from '~/admin/components/Layout/DefaultLayout';
// import DefaultLayout from './user/components/Layout/DefaultLayout';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
         
//         <Route path="/" element={<Navigate to="/home" />} />
        
//           {AdminRoutes.map((route, index) => {
//             const Page = route.component;
//             return (
//               <Route 
//                 key={index}
//                 path={route.path}
//                 element={
//                   <PrivateRoute 
//                     element={<Layout><Page /></Layout>} 
//                     isAdminRequired={true}
//                   />
//                 }
//               />
//             );
//           })}

//           {/* {UserRoutes.map((route, index) => {
//             const Page = route.component;
//             return (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={<Page />}
//               />
//             );
//           })} */}
//           {/* User Routes */}
//           {UserRoutes.map((route, index) => {
//             const Page = route.component;
//             return (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={
//                   <DefaultLayout>
//                     <Page />
//                   </DefaultLayout>
//                 }
//               />
//             );
//           })}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;











// App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AdminRoutes from "~/admin/AdminRoutes";
// import UserRoutes from "~/user/UserRoutes";
// import PrivateRoute from "./PrivateRoute";
// import Layout from "~/admin/components/Layout/DefaultLayout";
// import DefaultLayout from "./user/components/Layout/DefaultLayout";
// import { UserProvider } from "~/user/components/Context/UserContext";

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/" element={<Navigate to="/home" />} />

//             {AdminRoutes.map((route, index) => {
//               const Page = route.component;
//               return (
//                 <Route
//                   key={index}
//                   path={route.path}
//                   element={
//                     <PrivateRoute
//                       element={<Layout><Page /></Layout>}
//                       isAdminRequired={true}
//                     />
//                   }
//                 />
//               );
//             })}

//             {UserRoutes.map((route, index) => {
//               const Page = route.component;
//               return (
//                 <Route
//                   key={index}
//                   path={route.path}
//                   element={
//                     <DefaultLayout>
//                       <Page />
//                     </DefaultLayout>
//                   }
//                 />
//               );
//             })}
//           </Routes>
//         </div>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TeacherRoutes from "./Teacher/TeacherRoutes";
import UserRoutes from "./User/UserRoutes";
import PrivateRoute from "./PrivateRoute";
import { CartProvider } from "./User/components/CartContext";
import DefaultLayout from './User/components/Layout/DefaultLayout';
import Layout from './Teacher/components/Layout/DefaultLayout';
import AdminRoutes from "./Admin/AdminRoutes";
function App() {
  return (
    <Router>
    <CartProvider>
      
        <div className="App">
          <Routes>
            {/* Điều hướng mặc định tới "/home" */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Các route dành cho admin */}
            {TeacherRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute
                      element={<Layout><Page /></Layout>}
                      // isAdminRequired={true}
                    />
                  }
                />
              );
            })}
            {/* Các route dành cho admin */}
            {/* {AdminRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute
                      element={<Layout><Page /></Layout>}
                      isAdminRequired={true}
                    />
                  }
                />
              );
            })} */}

            {/* Các route dành cho user */}
            {UserRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  }
                />
              );
            })}


            {/* <Route path="*" element={<Error404 />} /> */}
          </Routes>
        </div>
     
      </CartProvider>
      </Router>
  );
}

export default App;
