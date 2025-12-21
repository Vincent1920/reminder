<template>
    <Navbar />
    <div class="min-h-screen bg-white">
        <div class="container mx-auto px-4 py-12">
            <div class="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-20">

                <div class="w-full lg:w-1/2 flex flex-col items-center lg:sticky lg:top-24">
                    <h1 class="text-4xl md:text-5xl font-bold text-blue-700 mb-8 font-poppins drop-shadow-sm">
                        Never Forget Again!
                    </h1>
                    <div class="relative">
                        <img src="../assets/logo.png" alt="Cat Reminder"
                            class="w-72 md:w-96 lg:w-[450px] object-contain drop-shadow-2xl" />

                        <div
                            class="absolute -top-4 right-12 w-10 h-10 bg-blue-100 rounded-full opacity-40 animate-bounce">
                        </div>
                        <div
                            class="absolute -top-10 right-6 w-5 h-5 bg-blue-300 rounded-full opacity-40 animate-bounce">
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-1/2 max-w-xl">
                    <div class="flex items-center justify-between mb-8">
                        <h2 class="text-3xl font-kaushan text-gray-800">Tugas Aktif</h2>
                        <div v-if="isLoading"
                            class="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full">
                        </div>
                    </div>

                    <div class="space-y-8">
                        <TransitionGroup name="list" tag="div" class="flex flex-col gap-8">
                            <div v-for="(task, index) in filteredTasks" :key="task.id" :class="[
                                    getColor(index).bg,
                                    'relative w-full h-52 rounded-[45px] shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300'
                                ]">

                                <div class="absolute top-0 left-0 w-full flex items-start z-10">
                                    <div class="backdrop-blur-sm px-6 py-3 rounded-br-[35px] flex items-center gap-3 shadow-sm min-w-[140px]"
                                        :style="task.prioritas === 'ya' ? 'background-color: #FFDF5E' : 'background-color: rgba(255, 255, 255, 0.9)'">
                                        <CalendarDaysIcon class="w-5 h-5"
                                            :class="task.prioritas === 'ya' ? 'text-black' : 'text-gray-600'" />
                                        <span
                                            class="font-bold font-sans text-xs text-gray-700">{{ task.tanggal }}</span>
                                    </div>
                                    <div class="px-6 py-3 flex-grow text-right">
                                        <span class="font-dancing text-2xl text-gray-800 opacity-60 italic">
                                            {{ task.kategori?.nama_kategori || 'Kategori' }}
                                        </span>
                                    </div>
                                </div>

                                <div class="absolute top-5 right-8 z-20">
                                    <div class="cursor-pointer transition-transform active:scale-90"
                                        @click="toggleCheck(task)">
                                        <div v-if="!task.is_done"
                                            class="w-9 h-9 bg-white border-2 border-gray-800 rounded-2xl shadow-sm flex items-center justify-center">
                                            <XMarkIcon
                                                v-if="new Date(task.tanggal).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)"
                                                class="w-7 h-7 text-red-600 font-bold" />
                                        </div>
                                        <CheckIcon v-else class="w-12 h-12 text-blue-600 drop-shadow-md" />
                                    </div>
                                </div>

                                <div class="flex flex-col items-center justify-center h-full w-full p-8 pt-12">
                                    <h2
                                        :class="[getColor(index).text, 'font-kaushan text-5xl text-center leading-tight drop-shadow-sm']">
                                        {{ task.tugas }}
                                    </h2>
                                </div>
                            </div>
                        </TransitionGroup>

                        <div v-if="!isLoading && filteredTasks.length === 0"
                            class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[40px] py-16 text-center">
                            <p class="font-kaushan text-3xl text-gray-400">Semua tugas selesai!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        ref,
        computed,
        onMounted
    } from 'vue';
    import {
        FunnelIcon,
        XMarkIcon,
        PlusCircleIcon,
        CalendarDaysIcon,
        CheckIcon
    } from '@heroicons/vue/24/solid';
    import Navbar from '../Components/Navbar.vue';
    import {
        useTugasStore
    } from '@/stores/Tugas';
    import {
        useKategoriStore
    } from '@/stores/Kategori';
    import {
        storeToRefs
    } from 'pinia';

    const tugasStore = useTugasStore();
    const kategoriStore = useKategoriStore();

    const {
        tugasList,
        isLoading
    } = storeToRefs(tugasStore);
    const {
        kategoriList
    } = storeToRefs(kategoriStore);
    onMounted(async () => {
        await tugasStore.fetchTugas();
        console.log("Data Tugas dari Store:", tugasList.value);
    });
    const filterDropdownOpen = ref(false);
    const selectedCategories = ref([]);
    const filterDate = ref({
        start: '',
        end: ''
    });

    const colorPalette = [{
            bg: 'bg-green-100',
            text: 'text-green-800',
            accent: 'text-green-700'
        },
        {
            bg: 'bg-pink-100',
            text: 'text-pink-800',
            accent: 'text-pink-700'
        },
        {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            accent: 'text-blue-700'
        },
        {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            accent: 'text-yellow-700'
        }
    ];

    const getColor = (index) => colorPalette[index % colorPalette.length];

    onMounted(async () => {
        await tugasStore.fetchTugas();
        await kategoriStore.fetchKategori();
    });


    const toggleFilterDropdown = () => {
        filterDropdownOpen.value = !filterDropdownOpen.value;
    };
    const resetDateFilter = () => {
        filterDate.value = {
            start: '',
            end: ''
        };
    };

    // Perbarui fungsi toggleCheck di script setup Anda
    const toggleCheck = async (task) => {
        // 1. Ubah status secara lokal untuk kecepatan UI
        task.is_done = !task.is_done;

        // 2. Kirim perubahan ke database melalui Store
        // Pastikan Anda sudah membuat fungsi updateStatus di Pinia Store
        const success = await tugasStore.updateStatus(task.id, task.is_done);

        if (!success) {
            // Jika gagal di server, kembalikan status ke semula (rollback)
            task.is_done = !task.is_done;
            alert("Gagal memperbarui status tugas.");
        }
    };
    const filteredTasks = computed(() => {
        // 1. Pastikan data adalah array
        let list = Array.isArray(tugasList.value) ? [...tugasList.value] : [];

        // --- PERBAIKAN LOGIKA DISINI ---
        // Jangan tampilkan tugas yang SUDAH diceklis (is_done === true)
        // Halaman ini hanya untuk tugas yang BELUM selesai.
        list = list.filter(t => !t.is_done);
        // -------------------------------

        // Filter Kategori (Logika lama Anda)
        if (selectedCategories.value.length > 0) {
            list = list.filter(t => selectedCategories.value.includes(t.id_kategori));
        }

        // Filter Rentang Tanggal (Logika lama Anda)
        if (filterDate.value.start) {
            list = list.filter(t => t.tanggal >= filterDate.value.start);
        }
        if (filterDate.value.end) {
            list = list.filter(t => t.tanggal <= filterDate.value.end);
        }

        // Urutkan: Prioritas 'ya' di atas, lalu tanggal terbaru
        return list.sort((a, b) => {
            if (a.prioritas === 'ya' && b.prioritas !== 'ya') return -1;
            if (a.prioritas !== 'ya' && b.prioritas === 'ya') return 1;
            return new Date(b.tanggal) - new Date(a.tanggal);
        });
    });
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Dancing+Script:wght@600;700&family=Kaushan+Script&display=swap');

    .font-poppins {
        font-family: 'Poppins', sans-serif;
    }

    .font-kaushan {
        font-family: 'Kaushan Script', cursive;
    }

    .font-dancing {
        font-family: 'Dancing Script', cursive;
    }

    /* Di bagian <style scoped> tambahkan animasi list khusus layout vertikal */
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px) scale(0.95);
    }

    /* Memastikan konten di bawahnya naik dengan mulus */
    .list-move {
        transition: transform 0.5s ease;
    }
</style>