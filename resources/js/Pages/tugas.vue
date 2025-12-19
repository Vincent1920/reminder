<template>
    <Navbar />
    <div class="container mx-auto px-4 py-8 md:py-12">
        <div class="flex flex-col items-center justify-center mb-10">
            <h1 class="font-kaushan text-4xl text-gray-800 mb-8">Tugas Saya</h1>

            <div class="flex items-center space-x-4">
                <router-link to="/Create_Tugas" 
                    class="flex items-center gap-3 px-6 py-3 bg-pink-100 text-pink-700 rounded-full shadow-md hover:bg-pink-200 transition-all text-xl font-kaushan">
                    <PlusCircleIcon class="w-7 h-7 text-pink-700" />
                    <span>Buat Tugas</span>
                </router-link>

                <div class="relative">
                    <button @click="toggleFilterDropdown"
                        class="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-all">
                        <FunnelIcon class="w-6 h-6 text-gray-700" />
                    </button>

                    <div v-if="filterDropdownOpen"
                        class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100 z-50">
                        <div class="mb-5">
                            <label class="block text-sm font-bold text-gray-700 mb-3">Rentang Tanggal</label>
                            <div class="flex items-center gap-2">
                                <input type="date" v-model="filterDate.start" class="w-full p-2 text-xs border border-gray-200 rounded-lg" />
                                <span class="text-gray-400">&</span>
                                <input type="date" v-model="filterDate.end" class="w-full p-2 text-xs border border-gray-200 rounded-lg" />
                            </div>
                            <button v-if="filterDate.start || filterDate.end" @click="resetDateFilter" class="text-[10px] text-red-500 mt-2 hover:underline">Hapus Filter Tanggal</button>
                        </div>

                        <hr class="mb-4 border-gray-100" />

                        <label class="block text-sm font-bold text-gray-700 mb-3">Filter Kategori</label>
                        <div class="space-y-2 max-h-40 overflow-y-auto">
                            <label v-for="cat in kategoriList" :key="cat.id" class="flex items-center cursor-pointer group">
                                <input type="checkbox" :value="cat.id" v-model="selectedCategories" class="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300" />
                                <span class="ml-3 text-sm text-gray-600 group-hover:text-purple-700">{{ cat.nama_kategori }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="text-center font-poppins text-gray-500">Memuat tugas...</div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(task, index) in filteredTasks" :key="task.id" 
                :class="[
                    getColor(index).bg,
                    'relative w-full h-64 rounded-[40px] shadow-lg overflow-hidden transform transition-all hover:scale-105 duration-300'
                ]">

                <div class="absolute top-0 left-0 z-10">
                    <div class="backdrop-blur-sm px-5 py-3 rounded-br-[30px] flex items-center gap-3 shadow-sm"
                        :style="task.prioritas === 'ya' ? 'background-color: #FFDF5E' : 'background-color: rgba(255, 255, 255, 0.9)'">
                        <CalendarDaysIcon class="w-5 h-5" :class="task.prioritas === 'ya' ? 'text-black' : 'text-gray-600'" />
                        <span class="font-bold font-sans text-xs" :class="task.prioritas === 'ya' ? 'text-black' : 'text-gray-700'">{{ task.tanggal }}</span>
                    </div>
                </div>

                <div class="absolute top-5 right-6 z-20">
                    <div @click="toggleCheck(task)"
                        class="w-8 h-8 bg-white border-2 border-gray-800 rounded-xl cursor-pointer flex items-center justify-center transition-transform active:scale-90">
                        <CheckIcon v-if="task.isChecked" class="w-6 h-6 text-green-600" stroke-width="4" />
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center h-full w-full p-8 transition-all duration-500"
                    :class="{ 'opacity-30 grayscale blur-[1px]': task.isChecked }">
                    <h2 :class="[getColor(index).text, 'font-kaushan text-4xl text-center leading-tight mb-2']">
                        {{ task.tugas }}
                    </h2>
                    <span :class="[getColor(index).accent, 'font-dancing text-2xl opacity-80']">
                        {{ task.kategori?.nama_kategori || 'Tanpa Kategori' }}
                    </span>
                </div>

                <div v-if="task.isChecked" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div class="w-4/5 h-1 bg-gray-800 rotate-[-5deg] rounded-full shadow-sm"></div>
                </div>
            </div>
        </div>

        <div v-if="!isLoading && filteredTasks.length === 0" class="text-center py-20 opacity-40 font-kaushan text-3xl">
            Belum ada tugas...
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { FunnelIcon, PlusCircleIcon, CalendarDaysIcon, CheckIcon } from '@heroicons/vue/24/solid';
import Navbar from '../Components/Navbar.vue';
import { useTugasStore } from '@/stores/Tugas';
import { useKategoriStore } from '@/stores/Kategori';
import { storeToRefs } from 'pinia';

const tugasStore = useTugasStore();
const kategoriStore = useKategoriStore();

const { tugasList, isLoading } = storeToRefs(tugasStore);
const { kategoriList } = storeToRefs(kategoriStore);
onMounted(async () => {
    await tugasStore.fetchTugas();
    console.log("Data Tugas dari Store:", tugasList.value);
});
const filterDropdownOpen = ref(false);
const selectedCategories = ref([]);
const filterDate = ref({ start: '', end: '' });

const colorPalette = [
    { bg: 'bg-green-100', text: 'text-green-800', accent: 'text-green-700' },
    { bg: 'bg-pink-100', text: 'text-pink-800', accent: 'text-pink-700' },
    { bg: 'bg-blue-100', text: 'text-blue-800', accent: 'text-blue-700' },
    { bg: 'bg-yellow-100', text: 'text-yellow-800', accent: 'text-yellow-700' }
];

const getColor = (index) => colorPalette[index % colorPalette.length];

onMounted(async () => {
    await tugasStore.fetchTugas();
    await kategoriStore.fetchKategori();
});

const toggleFilterDropdown = () => { filterDropdownOpen.value = !filterDropdownOpen.value; };
const resetDateFilter = () => { filterDate.value = { start: '', end: '' }; };

const toggleCheck = (task) => {
    task.isChecked = !task.isChecked;
    // Panggil store jika ingin simpan status ke DB: tugasStore.updateStatus(task.id)
};

const filteredTasks = computed(() => {
    let list = Array.isArray(tugasList.value) ? [...tugasList.value] : [];

    if (selectedCategories.value.length > 0) {
        list = list.filter(t => selectedCategories.value.includes(t.id_kategori));
    }
    if (filterDate.value.start) {
        list = list.filter(t => t.tanggal >= filterDate.value.start);
    }
    if (filterDate.value.end) {
        list = list.filter(t => t.tanggal <= filterDate.value.end);
    }

    return list.sort((a, b) => {
        if (a.prioritas === 'ya' && b.prioritas !== 'ya') return -1;
        if (a.prioritas !== 'ya' && b.prioritas === 'ya') return 1;
        return new Date(b.tanggal) - new Date(a.tanggal);
    });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Dancing+Script:wght@600;700&family=Kaushan+Script&display=swap');
.font-kaushan { font-family: 'Kaushan Script', cursive; }
.font-dancing { font-family: 'Dancing Script', cursive; }
.font-poppins { font-family: 'Poppins', sans-serif; }
</style>