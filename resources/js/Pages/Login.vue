<template>
    <div class="min-h-screen flex">
        <!-- Left Side -->
        <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white items-center justify-center">
            <div class="text-center flex items-center justify-center px-10">
                <div>
                    <div class="mt-8">
                        <h1 class="text-5xl font-extrabold mb-4 drop-shadow-lg">Selamat Datang</h1>
                        <p class="text-lg opacity-90">Mahasiswa Baru Teknik Informatika</p>
                        
                    </div>
                    <div class="flex items-center justify-center space-x-6 bg-white rounded-full px-8 py-4 mx-auto w-fit shadow-md">
                        <img :src="logo" alt="Logo" class="h-15" />
                    </div>

                </div>
            </div>
        </div>

        <!-- Right Side (Login Form) -->
        <div class="flex-1 flex items-center justify-center bg-gray-50">
            <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div class="flex justify-center">
                    <img :src="logoGamatifUrl" class="h-15" alt="Logo GAMATIF" />
                </div>

                <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
                    {{ error }}
                </div>

                <form @submit.prevent="handleLogin" class="space-y-5">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input v-model="email" type="email" id="email" required placeholder="contoh@gmail.com"
                            class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-yellow-400" />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input v-model="password" type="password" id="password" required placeholder="••••••••"
                            class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-yellow-400" />
                    </div>

                    <button type="submit" :disabled="isLoading"
                        class="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50">
                        {{ isLoading ? "Memproses..." : "Login" }}
                    </button>
                </form>

                <p class="mt-6 text-center text-sm text-gray-500">
                    Belum punya akun?
                    <a href="/registrasi-maba" class="text-yellow-600 hover:underline font-medium">Registrasi</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import logo from '@/assets/logo.png';
</script>
