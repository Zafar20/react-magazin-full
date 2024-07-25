import axios from "axios";
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(
    (config) => {
        let access_token = Cookies.get('access_token')
        if(access_token && access_token != null) {
            config.headers['Authorization'] = `Bearer ${access_token}`
        }
        return config
    }
)


// Функция для обновления токенов
async function refreshToken() {
    try {
      // Отправляем запрос на сервер для обновления токенов
      const response = await api.post('/auth/login/refresh', {
        refresh: Cookies.get('refresh_token'), // Предполагаем, что refresh token хранится в localStorage
      });
      Cookies.set('access_token', response.data.access)
      // Возвращаем новый access token
      return response.data.access;
    } catch (error) {
      console.error('Ошибка обновления токенов:', error);
      throw error; // Можно обработать ошибку по вашему усмотрению
    }
  }
  
  
  // Axios interceptor для обработки обновления токенов
  api.interceptors.response.use(
    response => response, // Просто возвращаем успешный ответ без изменений
    async error => {
      const originalRequest = error.config;
      
      // Если ответ содержит статус 401 (несанкционированный доступ) и не является запросом на обновление токена
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const accessToken = await refreshToken(); // Обновляем токены
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Устанавливаем новый access token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          
          // Повторяем оригинальный запрос с обновленным токеном
          return api(originalRequest);
        } catch (refreshError) {
          // Если возникла ошибка при обновлении токенов, перенаправляем пользователя на страницу аутентификации или обрабатываем ошибку иным способом
          console.error('Ошибка при обновлении токенов:', refreshError);
          throw refreshError; // Можно обработать ошибку по вашему усмотрению
        }
      }
      
      return Promise.reject(error); // Возвращаем оригинальную ошибку, если это не 401 или уже была попытка повторного запроса
    }
  );




export default api

