<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  text: string;
}>();
</script>

<template>
  <span
    class="bg-black text-xs font-bold rounded px-2 dark:bg-white text-white dark:text-black"
  >
    {{ text }}
  </span>
</template>
