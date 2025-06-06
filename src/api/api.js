import axios from 'axios';

const baseURL = import.meta.env.VITE_EC_API_BASE_URL || 'http://localhost:8080';

// 創建一個 Axios 實例
const api = axios.create({
  baseURL: baseURL, // 設定你的 API 基礎 URL
  timeout: 10000, // 請求超時時間 (例如：10 秒)
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // 如果需要，可以添加 Authorization header
  }
});

// 添加请求拦截器
api.interceptors.request.use(
  function (config) {
    const ECToken = localStorage.getItem('ec-token');
    if (ECToken) {
      config.headers.Authorization = `Bearer ${ECToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const rejectedError = {
      status: 500,
      message: error.message || 'Network Error or Unknown Error',
      errors: {},
      isValidationError: false,
    };
    if (!error.response) {
      return Promise.reject(rejectedError);
    }

    rejectedError.status = error.response.status;
    rejectedError.message = error.response.data.message;

    switch (error.response.status) {
      case 422:
        rejectedError.errors = error.response.data.errors || {}
        rejectedError.isValidationError = true;
        break;
      case 400:
      case 401:
      case 403:
      case 404:
      default:
        break;
    }

    return Promise.reject(rejectedError);
  }
);

export default api;
