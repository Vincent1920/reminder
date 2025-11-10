<template>
    <router-view v-slot="{ Component, route }">
        <div :key="route.name">
            <Component :is="Component" />
        </div>
    </router-view>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./Components/Navbar.vue";
// import ContactSection from "./Components/ContactSection.vue";

const route = useRoute();
const isAuthPage = computed(() =>
    ["login", "register"].includes(route.name)
);

const mainClasses = computed(() =>
    isAuthPage.value
        ? "max-w-screen-xl mx-auto min-h-screen"
        : "max-w-screen-xl mx-auto p-4 pt-15 min-h-screen"
);
</script>
