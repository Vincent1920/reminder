import { createApp } from 'vue'
import { createPinia } from 'pinia' //
import App from './App.vue'
import './style.css'
import router from './Router'
import "@fortawesome/fontawesome-free/css/all.min.css"

const app = createApp(App)
const pinia = createPinia() // Inisialisasi Pinia

app.use(pinia) // Gunakan Pinia sebelum mount
app.use(router)
app.mount('#app')