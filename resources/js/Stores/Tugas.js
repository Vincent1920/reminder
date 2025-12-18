import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/axios"; // Pastikan path axios kamu benar

export const useTugasStore = defineStore("tugas", () => {
    const isLoading = ref(false);
    const errors = ref({});

    const createTugas = async (formData) => {
        isLoading.value = true;
        errors.value = {}; 

        try {
            const response = await api.post('/Create_Tugas', formData);
            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            if (error.response?.status === 422) {
                errors.value = error.response.data.errors;
            }
            return { 
                success: false, 
                message: error.response?.data?.message || "Gagal membuat tugas" 
            };
        } finally {
            isLoading.value = false;
        }
    };

    return {
        createTugas,
        isLoading,
        errors
    };
});