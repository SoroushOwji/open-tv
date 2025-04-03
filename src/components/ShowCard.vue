<script setup lang="ts">
import type { Show } from "../types";

defineProps<{
  show: Show;
}>();
</script>

<template>
  <router-link
    :to="`/${show.id}`"
    class="w-60 rounded-xl overflow-clip relative group cursor-pointer"
  >
    <img width="240px" :src="show.image?.medium" :alt="show.name" />

    <div
      class="absolute p-4 inset-0 bg-black/80 bg-opacity-75 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <h2 class="text-lg font-bold">{{ show.name }}</h2>
      <div
        class="absolute text-xs font-bold top-4 right-4 rounded-full bg-red-500 text-white h-8 w-8 flex justify-center items-center"
      >
        {{ show.rating.average }}
      </div>
      <div class="flex flex-wrap gap-2 mt-2 justify-center">
        <div
          class="bg-white text-black text-xs font-bold rounded px-2"
          v-for="genre in show.genres"
          :key="genre"
        >
          {{ genre }}
        </div>
      </div>
      <p class="text-sm mt-2">
        {{
          show.summary
            ? show.summary
                .replace(/<[^>]+>/g, "")
                .split(" ")
                .slice(0, 15)
                .join(" ") + "..."
            : ""
        }}
      </p>
    </div>
  </router-link>
</template>

<style scoped></style>
