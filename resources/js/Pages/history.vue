<template>
  <Navbar />
  <div class="container mx-auto px-4 py-8">
    <h1 class="font-kaushan text-4xl text-center mb-10 text-gray-800">History Tugas</h1>

    <div v-if="isLoading" class="text-center">Memuat riwayat...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(task, index) in tugasList" :key="task.id"
        :class="[getColor(index).bg, 'relative w-full h-64 rounded-[40px] shadow-lg p-6 flex flex-col justify-center transform transition hover:scale-105']">
        
        <div class="absolute top-0 left-0">
          <div class="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-br-[30px] flex items-center gap-3">
            <CalendarDaysIcon class="w-5 h-5 text-gray-600" />
            <span class="font-bold text-xs text-gray-700">{{ task.tanggal }}</span>
          </div>
        </div>

        <div class="absolute top-5 right-6">
          <CheckIcon v-if="task.isChecked" class="w-10 h-10 text-blue-600 font-bold" />
          <XMarkIcon v-else class="w-10 h-10 text-red-600 font-bold" />
        </div>

        <div class="text-center">
          <h2 class="font-kaushan text-4xl mb-2" :class="getColor(index).text">{{ task.tugas }}</h2>
          <span class="font-dancing text-2xl opacity-70">{{ task.kategori?.nama_kategori || 'Umum' }}</span>
        </div>
      </div>
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

const colorPalette = [
  { bg: 'bg-green-100', text: 'text-green-800' },
  { bg: 'bg-pink-100', text: 'text-pink-800' },
  { bg: 'bg-blue-100', text: 'text-blue-800' }
];
const getColor = (index) => colorPalette[index % colorPalette.length];

onMounted(() => {
  tugasStore.fetchTugas();
});
</script>