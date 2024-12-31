import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useCartItems = (userID) => {
  const [cartItems, setCartItems] = useState([]);

  const loadCartItems = useCallback(async () => {
    if (!userID) return;

    try {
      const response = await axios.get(`http://localhost:8080/public/carts/user/${userID}`);
      const carts = response.data;

      const allCartDetails = await Promise.all(
        carts.map(async (cart) => {
          const cartDetailsResponse = await axios.get(`http://localhost:8080/public/carts/details/${cart.cartID}`);
          return cartDetailsResponse.data.map(item => ({
            cartDetailID: item.cartDetailID,
            cartID: item.cartID,
            courseID: item.courseID,
            title: item.courseTitle,
            description: item.courseDescription,
            quantity: item.quantity,
            price: item.price,
          }));
        })
      );
      
      const flatCartDetails = allCartDetails.flat();
      setCartItems(flatCartDetails);
    } catch (error) {
      console.error('Failed to load cart items:', error);
    }
  }, [userID]);

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  return { cartItems, setCartItems, loadCartItems };
};