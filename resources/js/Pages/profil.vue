<template>
  <Navbar/>
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
            v-model="form.nama"
            type="text" 
            placeholder="Nama" 
            class="w-full px-3 py-2 text-gray-800 bg-white border-none focus:outline-none focus:ring-2 focus:ring-cyan-600 placeholder-gray-800"
          />
        </div>

        <div>
          <input 
            v-model="form.email"
            type="email" 
            placeholder="Email" 
            class="w-full px-3 py-2 text-gray-800 bg-white border-none focus:outline-none focus:ring-2 focus:ring-cyan-600 placeholder-gray-800"
          />
        </div>
      </div>

      <div class="w-full flex flex-col items-center gap-2">
        <button 
          @click="handleSave"
          class="w-32 bg-pink-100 hover:bg-pink-200 text-gray-800 text-sm font-medium py-1 px-4 shadow-sm transition-colors"
        >
          Simpan Profil
        </button>
        
        <button 
          @click="handleCancel"
          class="w-32 bg-pink-100 hover:bg-pink-200 text-gray-800 text-sm font-medium py-1 px-4 shadow-sm transition-colors"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../Components/Navbar.vue';

// State untuk data form (opsional, agar fungsional)
const form = ref({
  nama: '',
  email: ''
})

const handleSave = () => {
  alert(`Menyimpan: ${form.value.nama}`)
}

const handleCancel = () => {
  form.value.nama = ''
  form.value.email = ''
}
</script>