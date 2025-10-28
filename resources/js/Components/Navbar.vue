<template>
  <nav class="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
    <h1 class="text-xl font-bold">MyApp</h1>
    <div class="space-x-4">
      
      <router-link to="/login" class="hover:underline">Login</router-link>
      <router-link to="/register" class="hover:underline">Register</router-link>
    </div>
  </nav>
</template>
