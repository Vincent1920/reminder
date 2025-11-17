<template>
    <navbar />
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="flex bg-white shadow-xl rounded-lg overflow-hidden w-[90%] lg:w-[70%]">

            <!-- LEFT FORM -->
            <div class="w-full lg:w-1/2 bg-[#FFFCE7] p-10 flex flex-col justify-center">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Register to Your Account</h2>
                <p class="text-gray-600 mb-8">
                    Please enter your credentials to access your dashboard.
                </p>

                <form @submit.prevent="register">
                    <input v-model="name" type="text" placeholder="Nama Lengkap"
                        class="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-yellow-400 mb-4" />

                    <input v-model="email" type="email" placeholder="email"
                        class="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-yellow-400 mb-4" />

                    <input v-model="password" type="password" placeholder="Password"
                        class="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-yellow-400 mb-4" />

                    <input v-model="confirmPassword" type="password" placeholder="Konfirmasi Password"
                        class="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-yellow-400 mb-6" />

                    <button type="submit"
                        class="w-full bg-gray-800 hover:bg-black text-white py-2 rounded-md transition">
                        Register
                    </button>
                </form>
            </div>

            <!-- RIGHT IMAGE PART -->
            <div class="hidden lg:flex w-1/2 bg-[#8EC6DF] items-center justify-center p-6">
                <img src="https://i.ibb.co/fYjxzPW/cat-study.png" alt="Cat Illustration" class="w-64" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from "@/Stores/authStore";
import Navbar from "@/Components/Navbar.vue";
import { ref } from "vue";
import router from "../Router";

const auth = useAuthStore(); // <-- PENTING!!!

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const register = async () => {
    if (password.value !== confirmPassword.value) {
        alert("Password dan Konfirmasi Password tidak cocok");
        return;
    }

    const success = await auth.register({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
    });

    if (success) {
        alert("Register berhasil!");
        router.push("/login")
    } else {
        console.log("Error:", auth.errors);
        alert("Register gagal");
    }
};
</script>
