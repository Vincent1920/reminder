<template>
  <Navbar />
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-cyan-400 w-80 rounded-lg p-8 flex flex-col items-center shadow-lg">
      
      <div class="mb-8">
        <div class="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center border-2 border-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      <div class="w-full space-y-4 mb-10">
        <div>
          <input 
            v-model="form.name"
            type="text" 
            placeholder="Nama" 
            class="w-full px-3 py-2 text-gray-800 bg-white border-none focus:outline-none focus:ring-2 focus:ring-cyan-600 placeholder-gray-800 rounded"
          />
          <p v-if="authStore.errors.name" class="text-xs text-red-600 mt-1">{{ authStore.errors.name[0] }}</p>
        </div>

        <div>
          <input 
            v-model="form.email"
            type="email" 
            placeholder="Email" 
            class="w-full px-3 py-2 text-gray-800 bg-white border-none focus:outline-none focus:ring-2 focus:ring-cyan-600 placeholder-gray-800 rounded"
          />
          <p v-if="authStore.errors.email" class="text-xs text-red-600 mt-1">{{ authStore.errors.email[0] }}</p>
        </div>
      </div>

      <div class="w-full flex flex-col items-center gap-2">
        <button 
          @click="handleSave"
          :disabled="authStore.isLoading"
          class="w-32 bg-pink-100 hover:bg-pink-200 text-gray-800 text-sm font-medium py-1 px-4 shadow-sm transition-colors rounded"
        >
          {{ authStore.isLoading ? 'Memproses...' : 'Simpan Profil' }}
        </button>
        
        <button 
          @click="handleCancel"
          class="w-32 bg-pink-100 hover:bg-pink-200 text-gray-800 text-sm font-medium py-1 px-4 shadow-sm transition-colors rounded"
        >
          Cancel
        </button>
      </div>
    </div>

    <AlertModal 
      :show="alert.show"
      :type="alert.type"
      :title="alert.title"
      :message="alert.message"
      @confirm="alert.show = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/Stores/authStore'
import Navbar from '../Components/Navbar.vue';
import AlertModal from '../Components/AlertModal.vue';

const authStore = useAuthStore()

const form = ref({
  name: '',
  email: ''
})

const alert = reactive({
  show: false,
  type: 'success',
  title: '',
  message: ''
})

// Muat data saat halaman dibuka
onMounted(() => {
  form.value.name = localStorage.getItem("name") || ''
  form.value.email = localStorage.getItem("email") || ''
})

const handleSave = async () => {
  const result = await authStore.updateProfile(form.value)
  
  alert.type = result.success ? 'success' : 'error'
  alert.title = result.success ? 'Berhasil!' : 'Gagal!'
  alert.message = result.message
  alert.show = true
}

const handleCancel = () => {
  // Reset ke data awal (yang ada di localStorage)
  form.value.name = localStorage.getItem("name") || ''
  form.value.email = localStorage.getItem("email") || ''
}
</script>