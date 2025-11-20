<template>
    <nav class="bg-yellow-50 shadow px-6 py-4 flex items-center justify-between">
        <router-link to="/" class="text-xl font-bold text-gray-800">
            Remember<span class="text-yellow-600">ME</span>
        </router-link>

        <div class="hidden md:flex items-center space-x-6">
            <router-link to="/" class="hover:text-black">Home</router-link>
            <router-link to="/tugas" class="hover:text-black">Tugas</router-link>
            <router-link to="/history" class="hover:text-black">History</router-link>

            <!-- Dropdown -->
            <div class="relative">
                <button @click="toggleDropdown"
                    class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                    <div class="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-gray-700">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z" />
                        </svg>
                        <svg :class="{'rotate-180': dropdownOpen}" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            class="w-4 h-4 transition-transform">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                </button>

                <div v-if="dropdownOpen" class="absolute right-0 mt-5 min-w-[170px] z-50">
                    <div class="bg-white dropdown-box rounded-lg shadow border p-2 text-gray-800">

                        <router-link v-if="!isAuthenticated" to="/login"
                            class="block px-4 py-2 text-center bg-gray-900 text-white rounded hover:bg-black text-sm">
                            Login
                        </router-link>

                        <div v-else class="py-1 min-w-[200px]">
                            <div class="px-4 py-3 border-b border-gray-100">
                                <p class="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Akun</p>
                                <p class="text-sm font-bold text-gray-900 truncate">{{ name }}</p>
                                <p class="text-xs text-gray-500 truncate mt-0.5">{{ email }}</p>
                            </div>

                            <div class="py-1">
                                <router-link to="/profil"
                                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z" />
                                    </svg>

                                    <span>Profil Saya</span>
                                </router-link>
                            </div>

                            <div class="border-t border-gray-100 pt-1">
                                <button @click="logout"
                                    class="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>

                                    <span class="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>


        <button @click="toggleMenu" class="md:hidden text-gray-700">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </nav>

    <div v-if="menuOpen" class="md:hidden bg-yellow-50 w-full px-6 py-4 space-y-4 text-gray-800 shadow">
        <router-link to="/" class="block hover:text-black">Home</router-link>
        <router-link to="/tugas" class="block hover:text-black">Tugas</router-link>
        <router-link to="/history" class="block hover:text-black">History</router-link>

        <router-link v-if="!isAuthenticated" to="/login"
            class="block text-center py-2 bg-gray-900 text-white rounded hover:bg-black">
            Login
        </router-link>

        <div v-else class="mt-4 p-3 bg-white rounded shadow space-y-2">
            <p class="font-semibold text-gray-700">Nama: {{ name }}</p>
            <p class="text-sm text-gray-500">Email: {{ email }}</p>

            <button @click="logout" class="mt-3 text-red-600 hover:text-red-700">
                Logout
            </button>
        </div>
    </div>
</template>


<script setup>
    import {
        ref
    } from "vue";
    import {
        useAuthStore
    } from "@/Stores/authStore";
    import {
        storeToRefs
    } from "pinia";

    const menuOpen = ref(false);
    const dropdownOpen = ref(false);

    const auth = useAuthStore();
    const {
        user,
        isAuthenticated
    } = storeToRefs(auth);

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value;
    };

    const toggleDropdown = () => {
        dropdownOpen.value = !dropdownOpen.value;
    };

    const logout = () => {
        auth.logout();
        menuOpen.value = false;
        dropdownOpen.value = false;
    };

    // Ambil data dari localStorage (sesuai kode Anda)
    const name = localStorage.getItem("name") || "Nama Pengguna";
    const email = localStorage.getItem("email") || "email@example.com";
</script>