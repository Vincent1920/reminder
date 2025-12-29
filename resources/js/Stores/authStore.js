import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/axios"; // axios.js yang kamu buat

export const useAuthStore = defineStore("auth", () => {

    // ---------------- STATE ----------------
    const user = ref(null);
    const token = ref(localStorage.getItem("authToken") || null);
    const errors = ref({});
    const isLoading = ref(false);
    const successMessage = ref("");

    // ---------------- GETTERS ----------------
    const isAuthenticated = computed(() => !!token.value);

    // ---------------- HELPERS ----------------
    // Pasang Authorization Header jika token ada
    const setAxiosHeader = () => {
        if (token.value) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    };

    // Pertama kali store dipanggil → pasang token ke axios
    setAxiosHeader();

    // ---------------- REGISTER ----------------
    const register = async (formData) => {
        isLoading.value = true;
        errors.value = {};
        successMessage.value = "";

        try {
            const response = await api.post("/register", formData);

            successMessage.value = response.data.message;
            return true;

        } catch (error) {

            if (error.response?.status === 422) {
                errors.value = error.response.data.errors;
            } else {
                errors.value = { general: ["Server error."] };
            }

            return false;

        } finally {
            isLoading.value = false;
        }
    };

    // ---------------- LOGIN ----------------
const login = async (credentials) => {
    isLoading.value = true;
    errors.value = {};

    try {
        const response = await api.post("/login", credentials);

        token.value = response.data.token;
        user.value = response.data.user;
        console.log(user); 
        console.log(response);
        localStorage.setItem("authToken", token.value);
        localStorage.setItem("name",response.data.user.name)
        localStorage.setItem("email",response.data.user.email)
        setAxiosHeader();

        return true;

    } catch (error) {
        if (error.response?.status === 401) {
            errors.value = { general: ["Email atau password salah"] };
        } else if (error.response?.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            errors.value = { general: ["Terjadi kesalahan server"] };
        }
        return false;

    } finally {
        isLoading.value = false;
    }
};

    // ---------------- LOGOUT ----------------
    const logout = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem("authToken");
        setAxiosHeader();
    };


    // ---------------- FORGOT PASSWORD ----------------
    const forgotPassword = async (email) => {
        isLoading.value = true;
        errors.value = {};
        successMessage.value = "";

        try {
            // Menggunakan instance 'api' yang sudah kamu import di atas
            const response = await api.post("/forgot-password", { email });

            successMessage.value = response.data.message;
            return { success: true, message: response.data.message };

        } catch (error) {
            let msg = "Terjadi kesalahan.";
            
            if (error.response?.status === 404) {
                msg = "Email tidak ditemukan.";
                errors.value = { general: [msg] };
            } else if (error.response?.status === 422) {
                errors.value = error.response.data.errors;
                msg = "Data tidak valid.";
            } else {
                errors.value = { general: ["Server error."] };
            }

            return { success: false, message: msg };

        } finally {
            isLoading.value = false;
        }
    };

    return {
        // STATE
        user,
        token,
        errors,
        isLoading,
        successMessage,
        isAuthenticated,

        // ACTIONS
        forgotPassword,
        register,
        login,
        logout,
    };

});
