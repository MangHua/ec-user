import { defineStore } from 'pinia';
import { ref } from 'vue';
import { addToCart as apiAddToCart, getCartItems as apiGetCartItems, clearCart as apiClearCart } from '@/api/cart.js';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);
  const initCart = async() => {
    const { data: { data: responseCartItems} } = await apiGetCartItems();
    cartItems.value = [];
    responseCartItems.forEach((cartItem) => {
      cartItems.value.push({
        id: cartItem.id,
        image: cartItem.image,
        sku_id: cartItem.sku_id,
        sku_name: cartItem.sku_name,
        quantity: cartItem.quantity,
        unit_price: cartItem.unit_price,
      });
    });
  }

  const addToCart = async(newCartItem) => {
    try {
      await apiAddToCart(newCartItem);
      await initCart();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const clearCart = async() => {
    try {
      await apiClearCart();
      cartItems.value = [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    initCart,
    addToCart,
    clearCart,
    cartItems,
  }
});
