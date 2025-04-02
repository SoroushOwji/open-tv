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
      class="absolute inset-0 bg-black/80 bg-opacity-75 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <h2 class="text-lg font-bold">{{ show.name }}</h2>
      <p>Language: {{ show.language }}</p>
      <p>Genres: {{ show.genres.join(", ") }}</p>
      <p>Premiered: {{ show.premiered }}</p>
      <p>Rating: {{ show.rating.average }}</p>
      <p>Runtime: {{ show.runtime }} minutes</p>
    </div>
  </router-link>
</template>

<style scoped></style>
