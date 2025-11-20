<template>
    <div class="min-h-screen bg-white overflow-hidden">
        <Navbar />

        <div class="container mx-auto px-4 py-8 md:py-12">
            <div class="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20">

                <div class="w-full md:w-1/2 flex flex-col items-center text-center">
                    <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-6 font-poppins">
                        Remember ME
                    </h1>
                    <div class="relative">
                        <img src="https://i.imgur.com/1J4XJ6L.png" alt="Cat Reminder"
                            class="w-64 md:w-80 lg:w-96 object-contain drop-shadow-xl" />

                        <div class="absolute -top-4 right-10 w-8 h-8 bg-blue-100 rounded-full opacity-50 animate-pulse">
                        </div>
                        <div class="absolute -top-8 right-4 w-4 h-4 bg-blue-100 rounded-full opacity-50 animate-bounce">
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-1/2 flex flex-col gap-6 max-w-md">

                    <div v-for="(task, index) in tasks" :key="index" :class="[
              task.bgColor, 
              'relative w-full h-56 rounded-3xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 duration-300 group'
            ]">

                        <div class="absolute top-0 left-0 z-10">
                            <div class="bg-white px-5 py-3 rounded-br-[30px] flex items-center gap-3 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" class="w-6 h-6 text-black">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
                                <span class="text-black font-semibold font-sans text-sm pt-0.5 select-none">
                                    {{ task.date }}
                                </span>
                            </div>
                        </div>

                        <div class="absolute top-4 right-6 flex items-center gap-3 z-20">
                            <span class="font-dancing text-xl text-black/80 select-none">Kategori</span>

                            <div @click="toggleCheck(index)"
                                class="w-7 h-7 bg-white border-2 border-black rounded-md cursor-pointer flex items-center justify-center transition-colors hover:bg-gray-100">
                                <svg v-if="task.isChecked" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"
                                    class="w-5 h-5 text-black">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                        </div>

                        <div class="flex items-center justify-center h-full w-full transition-opacity duration-300"
                            :class="{ 'opacity-40 line-through': task.isChecked }">
                            <h1 class="font-kaushan text-5xl text-black select-none">{{ task.title }}</h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Navbar from '@/Components/Navbar.vue'
    import {
        ref
    } from 'vue'

    // Data Tugas (Sekarang property 'isChecked' ada di dalam setiap objek tugas)
    const tasks = ref([{
            date: '10-3-2025',
            title: 'Tugas',
            bgColor: 'bg-[#22C5FD]', // Cyan (seperti gambar)
            isChecked: false
        },
        {
            date: '11-3-2025',
            title: 'Ujian',
            bgColor: 'bg-[#95d026]', // Hijau
            isChecked: false
        },
        {
            date: '12-3-2025',
            title: 'Pratikum',
            bgColor: 'bg-[#22C5FD]', // Biru lagi
            isChecked: false
        }
    ])

    // Fungsi Toggle Checkbox berdasarkan Index array
    const toggleCheck = (index) => {
        tasks.value[index].isChecked = !tasks.value[index].isChecked
    }
</script>

<style scoped>
    /* Menggabungkan semua import font jadi satu tempat */
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
</style>