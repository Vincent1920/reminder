import { createRouter, createWebHistory } from 'vue-router'
import Login from '../Pages/Login.vue'
import Register from '../Pages/Register.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/registrasi', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
