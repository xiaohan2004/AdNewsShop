// api.js
import axios from 'axios';
import router from '@/router'; // 假设您使用Vue Router

const api = axios.create({
    baseURL: 'http://10.100.164.44:8080',
});

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers['token'] = `${token}`;
        } else {
            console.warn('No JWT token found');
            // 可以在这里添加额外的逻辑，比如重定向到登录页面
            // 但要注意避免无限重定向循环
            if (!(config.url.includes('login') || config.url.includes('register'))) {
                router.push('/customer-login');
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
api.interceptors.response.use(
    (response) => {
        const {code, msg, data} = response.data;
        if (code === 0 && msg === "NOT_LOGIN") {
            localStorage.removeItem('jwt');
            router.push('/customer-login');
        }
        return response;
    },
    (error) => {
        if (error.response) {
            const {code, msg} = error.response.data;

            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized: Token may be invalid or expired');
                    localStorage.removeItem('jwt');
                    router.push('/customer-login');
                    break;
                case 403:
                    console.error('Forbidden: You do not have permission to access this resource');
                    break;
                default:
                    console.error(`Error ${error.response.status}: ${msg}`);
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;