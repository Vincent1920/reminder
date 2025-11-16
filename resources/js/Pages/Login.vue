<template>
    <navbar />
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
    <div class="w-full max-w-5xl bg-white shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      <!-- LEFT IMAGE AREA -->
      <div class="bg-[#7EC4E3] flex flex-col items-center justify-center p-10 relative">

        <h1 class="text-4xl font-bold text-white mb-4">Halo!</h1>

        <!-- <img
          src="/images/logo.png"
          alt="Cat Mascot"
          class="h-72 drop-shadow-xl"
        /> -->

      </div>

      <!-- RIGHT LOGIN FORM -->
      <div class="bg-[#FFFCE7] p-12 flex flex-col justify-center">

        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Login to Your Account
        </h2>
        <p class="text-gray-600 text-sm mb-8">
          Please enter your credentials to access your dashboard.
        </p>

        <form @submit.prevent="handleLogin" class="space-y-4">

          <input
            v-model="email"
            type="email"
            placeholder="email"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />

          <input
            v-model="password"
            type="password"
            placeholder="email"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900"
          >
            Log In
          </button>

        </form>

        <div class="flex items-center justify-between mt-6">
          <button class="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
            Forgot Password?
          </button>

          <button
            class="bg-black text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-900"
          >
            Register
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>

// import Navbar from "@/Components/Navbar.vue";
import logo from '@/assets/logo.png';

import Navbar from "@/Components/Navbar.vue";
import { ref } from "vue"; // ⬅️ WAJIB ADA

const email = ref("");
const password = ref("");

const handleLogin = () => {
  alert("Login clicked!");
};
</script>
