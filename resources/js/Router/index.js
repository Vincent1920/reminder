import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/Stores/authStore' // <--- 1. JANGAN LUPA IMPORT INI

// Import Components
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from '../Auth/Login.vue'
import Register from '../Auth/Register.vue'
import home from '../Pages/home.vue'
import history from '../Pages/history.vue'
import CreateTugasPage from '../Public/CreateTugasPage.vue'
import CreateKategoriPage from '../Public/CreateKategoriPage.vue'
import Profil from '../Pages/profil.vue'
import LupaPassword from '../Auth/ForgotPassword.vue'
import ResetPassword from '../Auth/ResetPassword.vue'

// kategori
import Kategori from '../Pages/Kategori.vue'
import ShowKategori from '../Public/ShowKategori.vue'
import EditKategori from '../Public/EditKategori.vue' 

// tugas
import tugas from '../Pages/tugas.vue'
import ShowTugas from '../Public/ShowTugas.vue'
import EditTugas from '../Public/EditTugas.vue'

const routes = [
  { 
    path: '/', 
    name: 'home', // Tambahkan name
    component: home 
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
    meta: { requiresGuest: true } // Hanya boleh diakses jika BELUM login
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
    meta: { requiresGuest: true }
  },
  // kategori
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

  // tugas
  { 
    path: '/tugas', 
    name: 'tugas',
    component: tugas,
    meta: { requiresAuth: true } // <---  Wajib Login
  },

  {
  path: '/Show_Tugas/:id',
  name: 'show-tugas',
  component: ShowTugas,
  meta: { requiresAuth: true } // <---  Wajib Login
  },

  {
    path:'/Edit_tugas/:id',
    name:'edit-tugas',
    component: EditTugas,
    meta: { requiresAuth: true } // <---  Wajib Login
  },


  { 
    path: '/history', 
    name: 'history',
    component: history,
    meta: { requiresAuth: true } // <---  Wajib Login
    
  },
  { 
    path: '/Create_Tugas', 
    name: 'create-tugas',
    component: CreateTugasPage,
    meta: { requiresAuth: true } // <--- KUNCI HALAMAN INI
  },
 
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// NAVIGATION GUARD
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Cek status login dari Pinia
    const isAuthenticated = authStore.isAuthenticated;

    // Cek apakah rute tujuan butuh login
    if (to.meta.requiresAuth && !isAuthenticated) {
        // Kalau butuh login TAPI user belum login -> Lempar ke Login
        next({ name: 'login' });
    } 
    // Cek apakah rute khusus tamu (Login/Register)
    else if (to.meta.requiresGuest && isAuthenticated) {
        // Kalau user SUDAH login tapi mau masuk ke halaman Login -> Lempar ke Home/Tugas
        next({ name: 'home' }); 
    } 
    else {
        // Lanjut
        next();
    }
});

export default router