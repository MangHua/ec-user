import api from './api'

export const register = async(registerData) => {
  try {
    const response = await api.post('/auth/register',registerData)
    return response.data
  } catch (error) {
    return Promise.reject(error);
  }
}

export const login = async(loginData) => {
  try {
    const login = await api.post('/auth/login', loginData)
    return login.data
  } catch (error) {
    return Promise.reject(error);
  }
}
