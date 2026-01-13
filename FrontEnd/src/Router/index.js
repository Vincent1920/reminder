import { createRouter, createWebHistory } from 'vue-router'

// 1. Import komponen halaman kamu

import Home from '../Pages/home.vue';
import Login from '../Auth/Login.vue'
import LupaPassword from '../Auth/ForgotPassword.vue'
import ResetPassword from '../Auth/ResetPassword.vue'
import Register from '../Auth/Register.vue'
import history from '../Pages/history.vue'
import Profil from '../Pages/profil.vue'


// kategori
import CreateKategoriPage from '../Public/CreateKategoriPage.vue'
import Kategori from '../Pages/Kategori.vue'
import ShowKategori from '../Public/ShowKategori.vue'
import EditKategori from '../Public/EditKategori.vue' 

// tugas
import CreateTugasPage from '../Public/CreateTugasPage.vue'
import tugas from '../Pages/tugas.vue'
import ShowTugas from '../Public/ShowTugas.vue'
import EditTugas from '../Public/EditTugas.vue'


// 2. Definisikan rute
const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
    { 
      path: '/profil', 
      name: 'profil', // Tambahkan name
      component: Profil 
    },
  {
    path: '/login',
    name: 'login', // Tambahkan name
    component: Login,
    meta: {
      requiresGuest: true
    } // Hanya boleh diakses jika BELUM login
  },
  {
    path: '/lupa_password',
    name: 'lupa_password',
    component: LupaPassword,
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPassword
  },
  {
    path: '/registrasi',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },

  //  tugas router
  {
    path: '/tugas',
    name: 'tugas',
    component: tugas,
    meta: {
      requiresAuth: true
    } // <---  Wajib Login
  },

  {
    path: '/Show_Tugas/:id',
    name: 'show-tugas',
    component: ShowTugas,
    meta: {
      requiresAuth: true
    } // <---  Wajib Login
  },

  {
    path: '/Edit_tugas/:id',
    name: 'edit-tugas',
    component: EditTugas,
    meta: {
      requiresAuth: true
    } // <---  Wajib Login
  },
  {
    path: '/Create_Tugas',
    name: 'create-tugas',
    component: CreateTugasPage,
    meta: {
      requiresAuth: true
    } // <--- KUNCI HALAMAN INI
  },

  // kategori router
{ 
    path: '/kategori', 
    name: 'kategori',
    component: Kategori,
    meta: { requiresAuth: true } // <--- KUNCI HALAMAN INI
  },

  {
    path: '/Create_kategori', 
    name: 'create-kategori',
    component: CreateKategoriPage,
    meta: { requiresAuth: true } // <--- KUNCI HALAMAN INI
  },

  {
    path:'/Edit_Kategori/:id',
    name:'edit-kategori',
    component: EditKategori,
    meta: { requiresAuth: true } // <--- KUNCI HALAMAN INI
  },

 {
    path: '/Show_Kategori/:id', // Pastikan ada tanda "/" di awal
    name: 'show_kategori',
    component: ShowKategori,
    meta: { requiresAuth: true }
},

  {
    path: '/history',
    name: 'history',
    component: history,
    meta: {
      requiresAuth: true
    } // <---  Wajib Login

  },
];

// 3. Buat instance router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 4. Export agar bisa dipakai di main.js
export default router;