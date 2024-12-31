
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useCartItems } from '../../../Hook/useCartItems';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();
const token = localStorage.getItem("authToken");

export const CartProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    userID: "",
    createdDate: new Date().toISOString(),
  });
  
  const navigate = useNavigate();
  const { cartItems, setCartItems, loadCartItems } = useCartItems(formData.userID);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const accountID = decodedToken.AccountID;

      axios.get(`http://localhost:8080/public/users/account/${accountID}`)
        .then(response => {
          setFormData(prevFormData => ({
            ...prevFormData,
            userID: response.data.userID
          }));
        })
        .catch(error => {
          console.error('Failed to fetch user ID:', error);
        });
    }
  }, [token]);

  const addToCart = async (course) => {
    const updatedFormData = {
      userID: formData.userID,
      createdDate: new Date().toISOString(),
      courseID: course.id,
      quantity: 1,
      price: course.price
    };

    try {
      const response = await axios.post('http://localhost:8080/public/carts', updatedFormData);
      const cartDetail = response.data.cartDetails[0];
      const newCartItem = {
        cartDetailID: cartDetail.cartDetailID,
        cartID: response.data.cartID,
        courseID: cartDetail.courseID,
        title: course.title,
        description: course.description,
        quantity: cartDetail.quantity,
        price: cartDetail.price,
      };
      
      setCartItems(prevItems => [...prevItems, newCartItem]);
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error('Failed to save cart item to database:', error);
      toast.error("Thêm vào giỏ hàng thất bại!");
    }
  };
  // const addToCart = async (course) => {
  //   try {
  //     // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
  //     const existingItem = cartItems.find((item) => item.courseID === course.id);
  
  //     if (existingItem) {
  //       // Nếu sản phẩm đã tồn tại, tăng số lượng sản phẩm
  //       const updatedQuantity = existingItem.quantity + 1;
       
  
  //       // Không cần thêm sản phẩm mới vào giỏ hàng, chỉ cập nhật số lượng
  //       setCartItems((prevItems) =>
  //         prevItems.map((item) =>
  //           item.cartDetailID === existingItem.cartDetailID
  //             ? { ...item, quantity: updatedQuantity }
  //             : item
  //         )
  //       );
  
  //       toast.success(`Đã tăng số lượng sản phẩm "${course.title}"!`);
  //     } else {
  //       // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
  //       const updatedFormData = {
  //         userID: formData.userID,
  //         createdDate: new Date().toISOString(),
  //         courseID: course.id,
  //         quantity: 1,
  //         price: course.price,
  //       };
  
  //       const response = await axios.post('http://localhost:8080/public/carts', updatedFormData);
  //       const cartDetail = response.data.cartDetails[0];
  //       const newCartItem = {
  //         cartDetailID: cartDetail.cartDetailID,
  //         cartID: response.data.cartID,
  //         courseID: cartDetail.courseID,
  //         title: course.title,
  //         description: course.description,
  //         quantity: cartDetail.quantity,
  //         price: cartDetail.price,
  //       };
  
  //       // Thêm sản phẩm mới vào giỏ hàng
  //       setCartItems((prevItems) => [...prevItems, newCartItem]);
  //       toast.success(`Đã thêm sản phẩm "${course.title}" vào giỏ hàng!`);
  //     }
  //   } catch (error) {
  //     console.error('Failed to update cart item:', error);
  //     toast.error('Cập nhật giỏ hàng thất bại!');
  //   }
  // };
  
  
  
  const removeFromCart = async (cartDetailID) => {
    try {
      await axios.delete(`http://localhost:8080/public/carts/details/${cartDetailID}`);
      setCartItems(prevItems => prevItems.filter(item => item.cartDetailID !== cartDetailID));
      toast.success("Đã xóa khỏi giỏ hàng!");
    } catch (error) {
      console.error('Failed to remove cart item from database:', error);
      toast.error("Xóa khỏi giỏ hàng thất bại!");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:8080/public/carts/user/${formData.userID}`);
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart in database:', error);
    }
  };

  const checkout = async () => {
    try {
      const orderPayload = {
        userId: formData.userID,
        totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        statusId: 2,
        orderItems: cartItems.map(item => ({
          courseId: item.courseID,
          quantity: item.quantity
        }))
      };

      const response = await axios.post('http://localhost:8080/public/orders', orderPayload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      await clearCart();
      navigate(`/order/${response.data.id}`);
    } catch (error) {
      console.error('Checkout failed:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      checkout, 
      loadCartItems 
    }}>
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};