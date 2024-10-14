import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Default base URL
});

const token = localStorage.getItem('token');
console.log('Token:', token); // Add this line for debugging
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default api;
