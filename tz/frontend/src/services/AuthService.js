// // src/authService.js
// import axios from 'axios';

// // Укажите ваш API URL для аутентификации
// const API_URL = 'http://localhost:8080/auth'; // Замените на ваш URL

// // Функция для проверки аутентификации пользователя
// export const checkAuthentication = async () => {
//     try {
//         const token = localStorage.getItem('token'); // Получаем токен из локального хранилища
//         if (!token) return false; // Если токен отсутствует, пользователь не аутентифицирован
        
//         // Отправляем запрос на сервер для проверки токена
//         const response = await axios.get(`${API_URL}/check`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
        
//         return response.data.isAuthenticated; // Предполагается, что сервер возвращает объект с полем isAuthenticated
//     } catch (error) {
//         console.error('Authentication check failed:', error);
//         return false; // Если произошла ошибка, считаем пользователя неаутентифицированным
//     }
// };

// // Функция для входа
// export const login = async (username, password) => {
//     const response = await axios.post(`${API_URL}/login`, { username, password });
//     const { token } = response.data; // Получаем токен из ответа
//     localStorage.setItem('token', token); // Сохраняем токен в локальном хранилище
// };

// // Функция для выхода
// export const logout = () => {
//     localStorage.removeItem('token'); // Удаляем токен из локального хранилища
// };
