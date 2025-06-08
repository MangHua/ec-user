import api from './api.js';

const APIs = {
  createOrder: '/order/create',
}
export const createOrder = async(orderData) => {
  try {
    const response = await api.post(APIs.createOrder, orderData);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
