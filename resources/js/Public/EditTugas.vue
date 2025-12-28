<template>
    <Navbar />
    <div class="container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 class="font-kaushan text-4xl text-gray-800 mb-10">Edit Tugas</h1>

        <div v-if="isLoading" class="text-xl font-kaushan">Memuat data...</div>

        <div v-else class="relative w-full max-w-2xl bg-[#DFFFEA] rounded-[30px] p-10 shadow-lg">
            <form @submit.prevent="handleUpdate" class="space-y-6">
                
                <div>
                    <label class="block font-kaushan text-xl text-gray-700 mb-2">Apa tugasnya?</label>
                    <input v-model="form.tugas" type="text"
                        class="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-green-400 font-poppins"
                        placeholder="Contoh: Belajar Vue JS">
                    <p v-if="errors.tugas" class="text-red-500 text-xs mt-1">{{ errors.tugas[0] }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block font-kaushan text-xl text-gray-700 mb-2">Kategori</label>
                        <select v-model="form.id_kategori" 
                            class="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-green-400 font-poppins">
                            <option value="" disabled>Pilih Kategori</option>
                            <option v-for="cat in kategoriList" :key="cat.id" :value="cat.id">
                                {{ cat.nama_kategori }}
                            </option>
                        </select>
                        <p v-if="errors.id_kategori" class="text-red-500 text-xs mt-1">{{ errors.id_kategori[0] }}</p>
                    </div>

                    <div>
                        <label class="block font-kaushan text-xl text-gray-700 mb-2">Kapan?</label>
                        <input v-model="form.tanggal" type="datetime-local"
                            class="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-green-400 font-poppins">
                        <p v-if="errors.tanggal" class="text-red-500 text-xs mt-1">{{ errors.tanggal[0] }}</p>
                    </div>
                </div>

                <div>
                    <label class="block font-kaushan text-xl text-gray-700 mb-2">Penting banget?</label>
                    <div class="flex gap-4">
                        <button type="button" @click="form.prioritas = 'ya'"
                            :class="form.prioritas === 'ya' ? 'bg-yellow-400 text-black' : 'bg-white text-gray-400'"
                            class="px-6 py-2 rounded-full font-bold transition-all shadow-sm">Ya</button>
                        <button type="button" @click="form.prioritas = 'tidak'"
                            :class="form.prioritas === 'tidak' ? 'bg-gray-800 text-white' : 'bg-white text-gray-400'"
                            class="px-6 py-2 rounded-full font-bold transition-all shadow-sm">Tidak</button>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-6">
                    <router-link to="/tugas" class="px-8 py-2 font-kaushan text-gray-500 hover:text-gray-700">
                        Batal
                    </router-link>
                    <button type="submit" :disabled="tugasStore.isLoading"
                        class="px-10 py-2 bg-[#8ECAFF] hover:bg-blue-300 text-blue-900 rounded-full font-kaushan text-xl shadow-md transition-all">
                        {{ tugasStore.isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
                    </button>
                </div>
            </form>
        </div>

        <AlertModal 
            :show="alertConfig.show"
            :type="alertConfig.type"
            :title="alertConfig.title"
            :message="alertConfig.message"
            @confirm="handleAlertConfirm"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Navbar from '../Components/Navbar.vue';
import AlertModal from "@/Components/AlertModal.vue"; 
import { useTugasStore } from '@/Stores/Tugas';
import { useKategoriStore } from '@/Stores/Kategori';

const route = useRoute();
const router = useRouter();
const tugasStore = useTugasStore();
const kategoriStore = useKategoriStore();

const { kategoriList } = storeToRefs(kategoriStore);
const { errors } = storeToRefs(tugasStore);

const isLoading = ref(true);
const form = ref({
    tugas: '',
    id_kategori: '',
    tanggal: '',
    prioritas: 'tidak'
});

// State untuk konfigurasi AlertModal
const alertConfig = reactive({
    show: false,
    type: 'success',
    title: '',
    message: ''
});

onMounted(async () => {
    await kategoriStore.fetchKategori(); 
    
    const id = route.params.id;
    const data = await tugasStore.showTugas(id); 
    
    if (data) {
        form.value = {
            tugas: data.tugas,
            id_kategori: data.id_kategori,
            tanggal: data.tanggal ? data.tanggal.slice(0, 16) : '',
            prioritas: data.prioritas
        };
    }
    isLoading.value = false;
});

const handleUpdate = async () => {
    const id = route.params.id;
    const result = await tugasStore.updateTugas(id, form.value); 
    
    if (result.success) {
        alertConfig.type = 'success';
        alertConfig.title = 'Berhasil!';
        alertConfig.message = 'Tugas berhasil diperbarui.';
        alertConfig.show = true;
    } else {
        // Jika ada error validasi atau server
        alertConfig.type = 'error';
        alertConfig.title = 'Gagal!';
        alertConfig.message = 'Gagal memperbarui tugas. Cek kembali inputan Anda.';
        alertConfig.show = true;
    }
};

const handleAlertConfirm = () => {
    alertConfig.show = false;
    // Jika berhasil, arahkan kembali ke daftar tugas
    if (alertConfig.type === 'success') {
        router.push('/tugas');
    }
};
</script>

<style scoped>
.font-kaushan { font-family: 'Segoe Print', cursive; }
.font-poppins { font-family: 'Poppins', sans-serif; }
</style>