<template>
    <Navbar />
    <div class="container mx-auto px-4 py-12 flex flex-col items-center min-h-screen bg-white">
        <h1 class="font-kaushan text-4xl text-gray-800 mb-10">Tugas</h1>

        <div v-if="tugasStore.isLoading" class="text-xl font-kaushan">Memuat...</div>

        <div v-else-if="tugas" class="relative w-full max-w-2xl">
            <div class="bg-[#DFFFEA] rounded-[20px] shadow-sm p-8 pt-12 min-h-[300px] relative flex flex-col justify-between">
                
                <div 
                    class="absolute -top-0 left-0 px-6 py-3 rounded-br-[25px] rounded-tl-[20px] flex items-center gap-3 shadow-sm border-b border-r border-gray-100 transition-colors duration-300"
                    :style="{ backgroundColor: tugas.prioritas === 'ya' ? '#FFDF5E' : '#FFFFFF' }"
                >
                    <CalendarDaysIcon class="w-6 h-6 text-gray-800" />
                    <span class="font-sans font-medium text-gray-700">
                        {{ formatDateTime(tugas.tanggal) }}
                    </span>
                    <span v-if="tugas.prioritas === 'ya'" class="text-xs font-bold text-orange-700">⭐</span>
                </div>

                <div class="absolute top-6 right-8">
                    <span class="font-dancing text-2xl text-gray-700">
                        {{ tugas.kategori?.nama_kategori || 'Kategori' }}
                    </span>
                </div>

                <div class="mt-8 mb-12">
                    <p class="text-gray-800 text-2xl leading-relaxed font-sans">
                        {{ tugas.tugas }}
                    </p>
                </div>

                <div class="flex justify-end gap-3">
                    <button 
                        @click="router.push({ name: 'edit-tugas', params: { id: tugas.id } })"
                        class="bg-[#89CFFFB5] hover:bg-[#89CFFF] text-gray-800 font-dancing text-xl px-8 py-1 rounded-full transition-colors shadow-sm"
                    >
                        edit
                    </button>
                    <button 
                        @click="handleDeleteRequest"
                        class="bg-[#89CFFFB5] hover:bg-red-300 text-gray-800 font-dancing text-xl px-8 py-1 rounded-full transition-colors shadow-sm"
                    >
                        hapus
                    </button>
                </div>
            </div>
        </div>
        
        <div v-else class="text-red-500 font-kaushan text-xl mt-10">
            Tugas tidak ditemukan.
        </div>

       <AlertModal 
            :show="alertConfig.show"
            :type="alertConfig.type"
            :title="alertConfig.title"
            :message="alertConfig.message"
            :show-cancel="alertConfig.showCancel"
            @confirm="handleAlertConfirm"
            @cancel="handleAlertCancel"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CalendarDaysIcon } from '@heroicons/vue/24/outline';
import Navbar from '../Components/Navbar.vue';
import AlertModal from "@/Components/AlertModal.vue"; 
import { useTugasStore } from '@/stores/Tugas';

const route = useRoute();
const router = useRouter();
const tugasStore = useTugasStore();
const tugas = ref(null);

// Alert Configuration State diperluas
const alertConfig = reactive({
    show: false,
    type: 'success',
    title: '',
    message: '',
    isConfirming: false, // Menandai apakah sedang mode tanya
    showCancel: false    // Menampilkan tombol batal
});

onMounted(async () => {
    const id = route.params.id;
    if (id) {
        const result = await tugasStore.showTugas(id);
        tugas.value = result; 
    }
});

const formatDateTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
};

// Tahap 1: Munculkan Modal Konfirmasi (Tanya)
const handleDeleteRequest = () => {
    alertConfig.type = 'error';
    alertConfig.title = 'Konfirmasi';
    alertConfig.message = 'Apakah Anda yakin ingin menghapus tugas ini?';
    alertConfig.isConfirming = true;
    alertConfig.showCancel = true;
    alertConfig.show = true;
};

// Fungsi jika user menekan "Batal"
const handleAlertCancel = () => {
    alertConfig.show = false;
    alertConfig.isConfirming = false;
    alertConfig.showCancel = false;
};

// Tahap 2: Eksekusi Hapus jika klik "OK" pada saat konfirmasi
const handleAlertConfirm = async () => {
    if (alertConfig.isConfirming) {
        alertConfig.show = false;
        alertConfig.isConfirming = false;
        alertConfig.showCancel = false;

        const success = await tugasStore.deleteTugas(tugas.value.id);
        
        // Tampilkan Modal Hasil (Notifikasi)
        if (success) {
            alertConfig.type = 'success';
            alertConfig.title = 'Terhapus!';
            alertConfig.message = 'Tugas berhasil dihapus dari daftar.';
            alertConfig.show = true;
        } else {
            alertConfig.type = 'error';
            alertConfig.title = 'Gagal!';
            alertConfig.message = 'Terjadi kesalahan saat menghapus tugas.';
            alertConfig.show = true;
        }
    } else {
        // Jika bukan mode konfirmasi, berarti ini modal hasil sukses/gagal
        alertConfig.show = false;
        if (alertConfig.type === 'success') {
            router.push('/tugas');
        }
    }
};
</script>

<style scoped>
/* Pastikan font dancing script tersedia jika digunakan */
.font-dancing { font-family: 'Dancing Script', cursive; }
.font-kaushan { font-family: 'Kaushan Script', cursive; }
</style>