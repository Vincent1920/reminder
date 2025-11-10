<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    
<!-- navbar  -->
<Navbar />

    <!-- Title -->
    <h2 class="text-3xl font-[cursive] text-gray-800 mt-10 mb-5">Kategori</h2>

    <!-- Button Buat Kategori -->
    <button
      class="flex items-center space-x-2 bg-pink-100 hover:bg-pink-200 text-gray-800 px-4 py-2 rounded-xl border border-pink-200 transition"
    >
      <span class="text-xl">➕</span>
      <span class="font-[cursive] text-lg">Buat Kategori</span>
    </button>

    <!-- Card Kategori -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
      <div class="w-48 h-32 bg-green-100 rounded-xl shadow-sm hover:scale-105 transition"></div>
      <div class="w-48 h-32 bg-pink-100 rounded-xl shadow-sm hover:scale-105 transition"></div>
      <div class="w-48 h-32 bg-indigo-200 rounded-xl shadow-sm hover:scale-105 transition"></div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/Components/Navbar.vue'
</script>


<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
