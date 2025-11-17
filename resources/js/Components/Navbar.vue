<template>
    <nav class="bg-yellow-50 shadow px-6 py-4 flex items-center justify-between">
        <!-- LEFT -->
        <router-link to="/" class="text-xl font-bold text-gray-800">
            Remember<span class="text-yellow-600">ME</span>
        </router-link>

        <!-- DESKTOP MENU -->
        <div class="hidden md:flex items-center space-x-6">
            <router-link to="/" class="hover:text-black">Home</router-link>
            <router-link to="/tugas" class="hover:text-black">Tugas</router-link>
            <router-link to="/history" class="hover:text-black">History</router-link>

            <!-- Jika belum login -->
            <router-link
                v-if="!isAuthenticated"
                to="/login"
                class="py-1 px-4 bg-gray-900 text-white rounded hover:bg-black"
            >
                Login
            </router-link>

            <!-- Jika sudah login -->
            <div v-else class="relative">
                <button @click="toggleDropdown" class="flex items-center space-x-2">
                    <span class="font-semibold text-gray-700">{{ user?.name }}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                         stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <!-- DROPDOWN -->
                <div
                    v-if="dropdownOpen"
                    class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded p-3 z-50"
                >
                    <p class="text-sm text-gray-700">{{ user?.email }}</p>
                    <hr class="my-2" />
                    <button @click="logout"
                        class="w-full text-left text-red-600 hover:text-red-700">
                        Logout
                    </button>
                </div>
            </div>
        </div>

        <!-- MOBILE BURGER BUTTON -->
        <button @click="toggleMenu" class="md:hidden text-gray-700">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </nav>

    <!-- MOBILE MENU -->
    <div
        v-if="menuOpen"
        class="md:hidden bg-yellow-50 w-full px-6 py-4 space-y-4 text-gray-800 shadow"
    >
        <router-link to="/" class="block hover:text-black">Home</router-link>
        <router-link to="/tugas" class="block hover:text-black">Tugas</router-link>
        <router-link to="/history" class="block hover:text-black">History</router-link>

        <!-- Jika belum login -->
        <router-link
            v-if="!isAuthenticated"
            to="/login"
            class="block text-center py-2 bg-gray-900 text-white rounded hover:bg-black"
        >
            Login
        </router-link>

        <!-- Jika sudah login -->
        <div v-else class="mt-4 p-3 bg-white rounded shadow">
            <p class="font-semibold text-gray-700">{{ user?.name }}</p>
            <p class="text-sm text-gray-500">{{ user?.email }}</p>

            <button @click="logout" class="mt-3 text-red-600 hover:text-red-700">
                Logout
            </button>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/Stores/authStore";
import { storeToRefs } from "pinia";

const menuOpen = ref(false);
const dropdownOpen = ref(false);

const auth = useAuthStore();
const { user, isAuthenticated } = storeToRefs(auth);

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
</script>
