import axios from 'axios';

const api = axios.create({
    // Ganti dengan URL Laravel kamu
    baseURL: 'http://localhost:8000/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Jika kamu pakai token (Sanctum), tambahkan interceptor di sini nanti

export default api;