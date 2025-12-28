<template>
  <div class="container mx-auto px-4 py-12 flex flex-col items-center">
    <h1 class="font-kaushan text-4xl mb-8">Lupa Password</h1>
    <div class="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border">
      <form @submit.prevent="handleForgotPassword">
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2">Masukkan Email Anda</label>
          <input v-model="email" type="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-300 outline-none" placeholder="example@mail.com" required />
        </div>
        <button type="submit" :disabled="loading" class="w-full bg-[#87cefa] text-black font-bold py-3 rounded-full hover:bg-sky-400 transition-all shadow-md">
          {{ loading ? 'Mengirim...' : 'Kirim Link Reset' }}
        </button>
      </form>
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
import { ref, reactive } from 'vue';
import axios from 'axios';
import AlertModal from "@/Components/AlertModal.vue";

const email = ref('');
const loading = ref(false);
const alert = reactive({ show: false, type: 'success', title: '', message: '' });

const handleForgotPassword = async () => {
  loading.value = true;
  try {
    const response = await axios.post('http://localhost:8000/api/forgot-password', { email: email.value });
    alert.type = 'success';
    alert.title = 'Berhasil!';
    alert.message = response.data.message;
    alert.show = true;
  } catch (error) {
    alert.type = 'error';
    alert.title = 'Gagal!';
    alert.message = error.response?.data?.message || 'Terjadi kesalahan.';
    alert.show = true;
  } finally {
    loading.value = false;
  }
};
</script>