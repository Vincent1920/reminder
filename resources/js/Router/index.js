import { createRouter, createWebHistory } from 'vue-router'
import Login from '../Pages/Login.vue'
import Register from '../Pages/Register.vue'
import Kategori from '../Pages/Kategori.vue'
const routes = [
  { path: '/login', component: Login },
  { path: '/registrasi', component: Register },
  { path: '/kategori', component: Kategori },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
