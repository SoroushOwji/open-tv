<script setup lang="ts">
import Show from "../components/Show.vue";
import { useFetch } from "../hooks";
import type { Show as ShowType } from "../types";
import { computed } from "vue";

const { data, error, isLoading } = useFetch<ShowType[]>(
  "http://api.tvmaze.com/shows"
);

const genres = computed(() => {
  const allGenres = data.value?.flatMap((show) => show.genres) || [];
  return Array.from(new Set(allGenres));
});

const showsByGenre = computed(() => {
  if (!data.value) return {};
  return genres.value.reduce((acc, genre) => {
    acc[genre] = data.value
      .filter((show) => show.genres.includes(genre))
      .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
    return acc;
  }, {} as Record<string, ShowType[]>);
});

console.log({ genres, showsByGenre });
</script>

<template>
  <main class="bg-black text-white min-h-screen">
    <h1 class="text-5xl font-extrabold p-4">TV Shows</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <section class="p-4" v-for="genre in genres" :key="genre">
        <h2 class="text-3xl font-bold">{{ genre }}</h2>
        <div class="w-full overflow-x-auto">
          <div class="flex gap-4 w-max">
            <Show
              v-for="show in showsByGenre[genre]"
              :key="show.id"
              :show="show"
            />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
