<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";

// Detect route
const route = useRoute();

// Update title automatically
watch(
  () => route.name,
  (newName) => {
    document.title = newName
      ? `${capitalize(newName)} | RememberME`
      : "RememberME";
  },
  { immediate: true }
);

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}


</script>
<style>
/* Animasi pindah halaman */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>