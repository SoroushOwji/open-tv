<template>
  <div
    :class="[
      'flex items-center justify-center rounded-full font-bold bg-amber-400',
      size === 'large' ? 'h-12 w-12 text-sm' : 'h-8 w-8 text-xs',
    ]"
  >
    {{ value }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  value: number;
  size?: "small" | "large";
}>();
</script>
