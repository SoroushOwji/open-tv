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
    class="flex items-center h-15 fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md"
  >
    <label for="theme-toggle" class="flex items-center cursor-pointer">
      <span class="mr-3 text-sm"> </span>
      <div class="relative">
        <input
          type="checkbox"
          id="theme-toggle"
          class="sr-only"
          :checked="theme === 'dark'"
          @change="toggleTheme"
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
