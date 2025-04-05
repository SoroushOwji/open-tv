<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useThemeStore } from "./stores/useThemeStore";
import { onMounted } from "vue";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initializeTheme();
});
</script>
<template>
  <div>
    <Navbar @toggleTheme="themeStore.toggleTheme" />
    <router-view />
  </div>
</template>
