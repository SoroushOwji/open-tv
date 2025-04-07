<script setup lang="ts">
import type { Show } from "../types";
import Rating from "./Rating.vue";
import TagLabel from "./TagLabel.vue";

defineProps<{
  show: Show;
}>();
</script>

<template>
  <router-link
    :to="`/${show.id}`"
    class="w-60 rounded-xl overflow-clip relative group cursor-pointer"
  >
    <img
      width="240px"
      height="337px"
      :src="show.image?.medium"
      :alt="show.name"
    />

    <div
      class="absolute p-4 inset-0 bg-white/80 dark:bg-black/80 bg-opacity-75 dark:text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <h2 class="text-lg font-bold">{{ show.name }}</h2>
      <div class="absolute top-4 right-4">
        <rating
          v-if="show.rating.average"
          :value="show.rating.average"
          size="small"
          class="mb-4"
        />
      </div>
      <div class="flex flex-wrap gap-2 mt-2 justify-center">
        <tag-label v-for="genre in show.genres" :key="genre" :text="genre" />
      </div>
      <p v-if="show.summary" class="text-sm mt-2 line-clamp-2 text-center">
        {{ show.summary.replace(/<[^>]+>/g, "") }}
      </p>
    </div>
  </router-link>
</template>
