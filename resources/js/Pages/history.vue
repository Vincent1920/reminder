<template>
  <Navbar />
  <div class="container mx-auto px-4 py-8">
    <h1 class="font-kaushan text-4xl text-center mb-10 text-gray-800">History Tugas</h1>

    <div v-if="isLoading" class="text-center font-poppins text-gray-500">Memuat riwayat...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(task, index) in tugasList" :key="task.id"
        :class="[
          getColor(index).bg, 
          'relative w-full h-64 rounded-[40px] shadow-lg p-6 flex flex-col justify-center transform transition hover:scale-105 duration-300'
        ]">
        
        <div class="absolute top-0 left-0 z-10">
          <div class="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-br-[30px] flex items-center gap-3 shadow-sm">
            <CalendarDaysIcon class="w-5 h-5 text-gray-600" />
            <span class="font-bold text-xs text-gray-700">{{ task.tanggal }}</span>
          </div>
        </div>

        <div class="absolute top-5 right-6 z-20">
          <CheckIcon v-if="task.is_done" class="w-12 h-12 text-blue-600 font-bold" />
          
          <XMarkIcon v-else-if="isExpired(task.tanggal)" class="w-12 h-12 text-red-600 font-bold" />
          
          <div v-else class="w-12 h-12 border-2 border-dashed border-gray-400 rounded-full opacity-20"></div>
        </div>

        <div class="text-center" :class="{ 'opacity-40 grayscale': isExpired(task.tanggal) && !task.is_done }">
          <h2 class="font-kaushan text-4xl mb-2 leading-tight" :class="getColor(index).text">
            {{ task.tugas }}
          </h2>
          <span class="font-dancing text-2xl opacity-70 block">
            {{ task.kategori?.nama_kategori || 'Tanpa Kategori' }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="!isLoading && tugasList.length === 0" class="text-center py-20 opacity-30 font-kaushan text-3xl">
      Belum ada riwayat tugas...
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTugasStore } from '@/stores/Tugas';
import { CalendarDaysIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import Navbar from '../Components/Navbar.vue';

const tugasStore = useTugasStore();
const { tugasList, isLoading } = storeToRefs(tugasStore);

// Konfigurasi Warna Kartu
const colorPalette = [
  { bg: 'bg-green-100', text: 'text-green-800' },
  { bg: 'bg-pink-100', text: 'text-pink-800' },
  { bg: 'bg-blue-100', text: 'text-blue-800' },
  { bg: 'bg-yellow-100', text: 'text-yellow-800' }
];

const getColor = (index) => colorPalette[index % colorPalette.length];

/**
 * Fungsi untuk mengecek apakah tugas sudah jatuh tempo
 * Mengembalikan true jika tanggal tugas sudah lewat dari hari ini
 */
const isExpired = (taskDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset waktu ke jam 00:00
  return new Date(taskDate) < today;
};

onMounted(async () => {
  // Pastikan memanggil fetchTugas agar data terbaru muncul
  await tugasStore.fetchTugas();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Dancing+Script:wght@600&family=Kaushan+Script&display=swap');

.font-kaushan { font-family: 'Kaushan Script', cursive; }
.font-dancing { font-family: 'Dancing Script', cursive; }
.font-poppins { font-family: 'Poppins', sans-serif; }
</style>