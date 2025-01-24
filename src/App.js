


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TeacherRoutes from "./Teacher/TeacherRoutes";
import UserRoutes from "./User/UserRoutes";
import PrivateRoute from "./PrivateRoute";
import { CartProvider } from "./User/components/CartContext";
import DefaultLayout from './User/components/Layout/DefaultLayout';
import Layout from './Teacher/components/Layout/DefaultLayout';
import AdminRoutes from "./Admin/AdminRoutes";
import SplashCursor from '../src/Hook/SplashCursor'
function App() {
  return (
    <Router>
    <CartProvider>
    <SplashCursor />
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
