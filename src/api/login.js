import api from './api'

export const login = async(loginData) => {
  try {
    const login = await api.post('/auth/login', loginData)
    return login.data
  } catch (error) {
    return Promise.reject(error);
  }
}
