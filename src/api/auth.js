import api from "./api.js";

const APIs = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  getUserInfo: '/auth/user',
};

export const register = async(registerData) => {
  try {
    const response = await api.post(APIs.register, registerData)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const login = async(loginData) => {
  try {
    const login = await api.post(APIs.login, loginData)
    return login.data
  } catch (error) {
    return Promise.reject(error);
  }
}

export const logout = async() => {
  try {
    await api.post(APIs.logout)
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getUserInfo = async() => {
  try {
    const { data } = await api.get(APIs.getUserInfo)
    return data
  } catch (error) {
    return Promise.reject(error);
  }
}
