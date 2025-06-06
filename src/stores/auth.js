import { defineStore } from 'pinia';
import { computed, reactive } from "vue";
import {
  getUserInfo,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister
} from "@/api/auth.js";

const AUTH_TOKEN_NAME = "ec-token";
export const useAuthStore = defineStore('auth', () => {
  const isLogin = computed(() => !!localStorage.getItem(AUTH_TOKEN_NAME));
  const user = reactive({
    id: null,
    name: null,
    email: null,
  });

  const initUser = async() => {
    if (user.id) {
      return;
    }

    try {
      const { id, name, email } = await getUserInfo();
      user.id = id;
      user.name = name;
      user.email = email;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  const register = async(registerData) => {
    try {
      await apiRegister({ ...registerData })
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  const login = async(loginData) => {
    if (user.id) {
      return;
    }

    try {
      const { token } = await apiLogin({ ...loginData })
      localStorage.setItem(AUTH_TOKEN_NAME, token)
      await initUser()
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  const logout = async() => {
    try {
      await apiLogout();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    } finally {
      user.id = null;
      user.name = null;
      user.email = null;
      localStorage.removeItem(AUTH_TOKEN_NAME);
    }
  }

  return {
    user,
    initUser,
    login,
    logout,
    register,
    isLogin,
  }
})
