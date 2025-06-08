import api from './api.js';

const APIs = {
  getCartItems: '/cart/overview',
  addToCart: '/cart',
  clearCart: '/cart/clear',
};

export const addToCart = async(cartItem) => {
  try {
    const response = await api.post(APIs.addToCart, cartItem);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getCartItems = async() => {
  try {
    const response = await api.get(APIs.getCartItems);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const clearCart = async() => {
  try {
    const response = await api.delete(APIs.clearCart);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
