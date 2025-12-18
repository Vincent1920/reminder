<template>
    <Navbar />
    <div class="min-h-screen flex flex-col items-center justify-center bg-white py-10">

        <h1 class="font-kaushan text-4xl text-black mb-8">Buat Tugas</h1>

        <div class="w-full max-w-md bg-[#D0C9FF] rounded-[40px] p-8 shadow-xl flex flex-col items-center gap-5">
            <!-- Tanggal -->
            <div class="w-full">
                <input type="date" v-model="form.date"
                    class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 shadow-sm bg-white" />
            </div>

            <!-- Kategori -->
            <div class="w-full">
                <select v-model="form.id_kategori"
                    class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 shadow-sm bg-white">
                    <option value="" disabled selected>Pilih Kategori</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.nama_kategori }}
                    </option>
                </select>
            </div>

            <!-- Tugas -->
            <div class="w-full">
                <textarea v-model="form.task" placeholder="Tugas" rows="5"
                    class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 placeholder-gray-400 shadow-sm resize-none"></textarea>
            </div>

            <!-- Prioritas -->
            <div @click="togglePriority"
                class="flex items-center gap-3 bg-[#D1FAE5] px-2 py-1.5 rounded-full cursor-pointer shadow-sm hover:bg-green-200 transition-colors select-none w-fit">
                <div class="w-6 h-6 bg-white rounded flex items-center justify-center shadow-sm">
                    <div v-if="form.isPriority" class="w-3 h-3 bg-green-500 rounded-sm"></div>
                </div>
                <span class="text-gray-700 font-semibold pr-2 text-sm">Prioritas</span>
            </div>

            
            <button @click="submitTask"
                class="mt-4 flex items-center gap-2 bg-[#FFD6D6] px-8 py-2 rounded-full shadow-md hover:bg-pink-200 hover:scale-105 transform transition-all duration-300">
                <PlusCircleIcon class="w-7 h-7 text-black" stroke-width="1.5" />
                <span class="font-kaushan text-2xl text-black pt-1">Buat Tugas</span>
            </button>

        </div>
    </div>
</template>

<script setup>
import Navbar from '../Components/Navbar.vue'
import { ref, onMounted } from 'vue'
import { useKategoriStore } from '@/stores/Kategori' // Store Kategori
import { useTugasStore } from '@/stores/Tugas'       // Store Tugas yang baru
import { storeToRefs } from 'pinia'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'

// Inisialisasi Store
const kategoriStore = useKategoriStore()
const tugasStore = useTugasStore()

// State dari Store
const { kategoriList, isLoading: loadingKategori } = storeToRefs(kategoriStore)
const { isLoading: loadingTugas, errors } = storeToRefs(tugasStore)

const form = ref({
    date: '',
    id_kategori: '',
    task: '',
    isPriority: false
})

onMounted(() => {
    kategoriStore.fetchKategori()
})

const togglePriority = () => {
    form.value.isPriority = !form.value.isPriority
}

const submitTask = async () => {
    const payload = {
        id_kategori: form.value.id_kategori,
        tanggal: form.value.date,
        tugas: form.value.task,
        prioritas: form.value.isPriority ? 'ya' : 'tidak'
    };

    const result = await tugasStore.createTugas(payload);

    if (result.success) {
        alert(result.message);
        // Reset Form
        form.value = { date: '', id_kategori: '', task: '', isPriority: false };
    } else {
        alert(result.message);
    }
}
</script>

<style scoped>
    /* Import Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Kaushan+Script&family=Poppins:wght@400;600&display=swap');

    .font-kaushan {
        font-family: 'Kaushan Script', cursive;
    }

    .font-poppins {
        font-family: 'Poppins', sans-serif;
    }
</style>