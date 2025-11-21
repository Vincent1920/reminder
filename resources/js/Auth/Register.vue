<template>
    <navbar />

    <AlertModal 
        :show="showSuccessModal" 
        title="Berhasil!" 
        message="Akun Anda telah dibuat. Silakan login untuk melanjutkan."
        button-text="OK, Login"
        @confirm="goToLogin"
    />

    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <div class="flex bg-white shadow-xl rounded-lg overflow-hidden w-[90%] lg:w-[70%]">

            <div class="w-full lg:w-1/2 bg-[#FFFCE7] p-10 flex flex-col justify-center">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Register to Your Account</h2>
                <p class="text-gray-600 mb-8">
                    Please enter your credentials to access your dashboard.
                </p>

                <form @submit.prevent="register">
                    <input v-model="name" type="text" placeholder="Nama Lengkap" required
                        class="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-yellow-400 mb-4 outline-none" />

                    <input v-model="email" type="email" placeholder="Email" required
                        class="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-yellow-400 mb-4 outline-none" />

                    <input v-model="password" type="password" placeholder="Password" required
                        class="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-yellow-400 mb-4 outline-none" />

                    <input v-model="confirmPassword" type="password" placeholder="Konfirmasi Password" required
                        class="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-yellow-400 mb-6 outline-none" />

                    <p v-if="errorMessage" class="text-red-500 text-sm text-center font-medium mb-4">
                        {{ errorMessage }}
                    </p>

                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-gray-800 hover:bg-black text-white py-2 rounded-md transition disabled:opacity-50 flex justify-center items-center">
                        <span v-if="isLoading">Prosessing...</span>
                        <span v-else>Register</span>
                    </button>
                </form>

                <div class="mt-4 text-center text-sm text-gray-600">
                    Sudah punya akun? 
                    <router-link to="/login" class="font-bold text-blue-600 hover:underline">Login disini</router-link>
                </div>
            </div>

            <div class="hidden lg:flex w-1/2 bg-[#8EC6DF] items-center justify-center p-6">
                <img src="https://i.ibb.co/fYjxzPW/cat-study.png" alt="Cat Illustration" class="w-64" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "@/Components/Navbar.vue";
import AlertModal from "@/Components/AlertModal.vue"; // <--- IMPORT ALERT MODAL
import { useAuthStore } from "@/Stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// State untuk UI
const showSuccessModal = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

const register = async () => {
    // Reset error state
    errorMessage.value = "";
    
    // Validasi Password Client-side
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Password dan Konfirmasi Password tidak cocok.";
        return;
    }

    if (password.value.length < 6) {
        errorMessage.value = "Password minimal 6 karakter.";
        return;
    }

    isLoading.value = true;

    try {
        const success = await auth.register({
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmPassword.value,
        });

        if (success) {
            // Tampilkan Modal Sukses (lewat Component)
            showSuccessModal.value = true;
        } else {
            // Ambil pesan error dari store jika ada, atau default message
            errorMessage.value = "Gagal registrasi. Email mungkin sudah terdaftar.";
            console.log("Error:", auth.errors);
        }
    } catch (error) {
        errorMessage.value = "Terjadi kesalahan jaringan.";
    } finally {
        isLoading.value = false;
    }
};

// Fungsi tombol OK pada Modal -> Pindah ke Login
const goToLogin = () => {
    showSuccessModal.value = false;
    router.push("/login");
};
</script>