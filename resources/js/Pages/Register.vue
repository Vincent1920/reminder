<template>
  <div class="flex justify-center items-center flex-grow">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Nama Lengkap</label>
          <input v-model="name" type="text" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input v-model="email" type="email" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Password</label>
          <input v-model="password" type="password" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">Daftar</button>
      </form>
      <p class="text-center text-sm text-gray-600 mt-4">
        Sudah punya akun?
        <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const register = async () => {
  try {
    const response = await axios.post('/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    alert('Registrasi berhasil!');
    console.log(response.data);
  } catch (error) {
    alert('Registrasi gagal: ' + error.response.data.message);
  }
};
</script>
