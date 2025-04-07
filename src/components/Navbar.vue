<script setup lang="ts">
import { useThemeStore } from "../stores/useThemeStore";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();

const { theme } = storeToRefs(themeStore);

const toggleTheme = () => {
  themeStore.toggleTheme();
};

onMounted(() => {
  themeStore.initializeTheme();
});
</script>

<template>
  <div
    class="flex items-center h-15 justify-between fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-10"
  >
    <router-link to="/" class="flex items-center">
      <img src="../assets/icon.svg" alt="Logo" class="h-10 w-10 ml-4" />
      <h1 class="text-xl font-bold text-gray-800 dark:text-white ml-2">
        Open TV
      </h1>
    </router-link>
    <label for="theme-toggle" class="flex items-center cursor-pointer px-4">
      <div class="relative">
        <input
          type="checkbox"
          id="theme-toggle"
          class="sr-only"
          :checked="theme === 'dark'"
          @change="toggleTheme"
          aria-label="Toggle between light and dark mode"
        />
        <div
          class="block bg-blue-200 dark:bg-blue-900 w-14 h-8 rounded-full"
        ></div>
        <div
          class="absolute left-1 top-1 bg-transparent w-6 h-6 rounded-full transition transform duration-300 ease-in-out flex items-center justify-center"
          :class="{ 'translate-x-6': theme === 'dark' }"
        >
          <span v-if="theme === 'dark'">🌙</span>
          <span v-else>☀️</span>
        </div>
      </div>
    </label>
  </div>
</template>
