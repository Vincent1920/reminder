import { createRouter, createWebHistory } from 'vue-router'
import Login from '../Pages/Login.vue'
import Register from '../Pages/Register.vue'
import Kategori from '../Pages/Kategori.vue'
import home from '../Pages/home.vue'

// import home from '../Pages/home.vue'
const routes = [
  { path: '/', component: home },
  { path: '/login', component: Login },
  { path: '/registrasi', component: Register },
  { path: '/kategori', component: Kategori },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
