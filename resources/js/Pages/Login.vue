<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Masuk ke MyApp</h2>
      
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Masukkan email kamu"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Masukkan password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Masuk
        </button>
      </form>

      <p class="text-center text-gray-600 mt-6">
        Belum punya akun?
        <router-link to="/register" class="text-blue-600 hover:underline font-semibold">
          Daftar sekarang
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      alert(`Login dengan email: ${this.email}`);
      // nanti ganti dengan request ke backend
    },
  },
};
</script>

<style scoped>
/* Animasi ringan */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
div {
  animation: fadeIn 0.6s ease-in-out;
}
</style>
