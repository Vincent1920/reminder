import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/axios"; // Pastikan path axios kamu benar

export const useTugasStore = defineStore("tugas", () => {
    // ---------------- STATE ----------------
    
    const tugasList = ref([]);      // Menampung semua daftar tugas dari database
    const isLoading = ref(false);   // Loading state untuk spinner/indikator
    const errors = ref({});         // Menampung detail error validasi dari Laravel

    // ---------------- ACTIONS ----------------

    // 1. Ambil semua tugas (Fetch)
   const fetchTugas = async () => {
        isLoading.value = true;
        try {
            const response = await api.get('/get-Tugas');
            if (response.data.success) {
                tugasList.value = response.data.data;
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            isLoading.value = false;
        }
    }

    // 2. Buat tugas baru (Create)
    const createTugas = async (formData) => {
        isLoading.value = true;
        errors.value = {}; 

        try {
            const response = await api.post('/Create_Tugas', formData);
            
            if (response.data.success) {
                // Refresh daftar tugas setelah berhasil membuat yang baru
                await fetchTugas(); 
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            if (error.response?.status === 422) {
                // Tangkap error validasi dari Laravel
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

    // 3. Update status checklist (Optional - untuk toggleCheck)
    const updateStatus = async (id, status) => {
        try {
            // Asumsi kamu punya API untuk update status (misal patch atau put)
            await api.patch(`/update-status-tugas/${id}`, { isChecked: status });
        } catch (error) {
            console.error("Gagal memperbarui status tugas:", error);
        }
    };

    return {
        // State
        tugasList,
        isLoading,
        errors,
        // Actions
        fetchTugas,
        createTugas,
        updateStatus
    };
});