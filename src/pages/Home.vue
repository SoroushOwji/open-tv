<script setup lang="ts">
import ShowCard from "../components/ShowCard.vue";
import ShowList from "../components/ShowList.vue";
import { useFetch } from "../hooks";
import type { Show } from "../types";
import { computed, ref, watch } from "vue";
import { debounce } from "../utils";
import { useRouter, useRoute } from "vue-router";

const { data, error, isLoading } = useFetch<Show[]>(
  "http://api.tvmaze.com/shows"
);

const router = useRouter();
const route = useRoute();

const searchParam = (route.query.search as string) || "";
const searchInput = ref(searchParam);
const searchDebounced = ref(searchParam);

const updateSearchDebounced = debounce((value: string) => {
  searchDebounced.value = value;
  router.replace({ query: { ...route.query, search: value || undefined } });
}, 300);

watch(searchInput, (newValue) => {
  updateSearchDebounced(newValue);
});

const filteredShows = computed(() => {
  if (!searchDebounced || !data.value) return [] as Show[];
  return data.value.filter((show) =>
    show.name.toLowerCase().includes(searchDebounced.value.toLowerCase())
  );
});

const filteredGenres = computed(() => {
  if (!searchDebounced) return genres.value;
  return genres.value.filter((genre) =>
    genre.toLowerCase().includes(searchDebounced.value.toLowerCase())
  );
});

const genres = computed(() => {
  const allGenres = data.value?.flatMap((show) => show.genres) || [];
  return Array.from(new Set(allGenres));
});

const showsByGenre = computed(() => {
  return genres.value.reduce((acc, genre) => {
    if (!data.value) return acc;
    acc[genre] = data.value
      .filter((show) => show.genres.includes(genre))
      .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
    return acc;
  }, {} as Record<string, Show[]>);
});
</script>

<template>
  <main class="bg-black text-white min-h-screen">
    <h1 class="text-5xl font-extrabold p-4">TV Shows</h1>
    <div class="p-4">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search for a show..."
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="searchInput">
        <section class="p-4">
          <h2 class="text-3xl font-bold">Search Results</h2>
          <div class="w-full overflow-x-auto">
            <div class="flex gap-4 w-max">
              <show-card
                v-if="filteredShows?.length"
                v-for="show in filteredShows"
                :key="show.id"
                :show="show"
              />
              <div
                v-else
                class="text-gray-500 w-60 h-84 border border-gray-500 rounded-xl flex justify-center items-center"
              >
                No results found
              </div>
            </div>
          </div>
        </section>
        <show-list title="Search Results" :list="filteredShows" />

        <show-list
          v-for="genre in filteredGenres"
          :key="genre"
          :list="showsByGenre[genre]"
          :title="genre"
        />
      </div>
      <div v-else>
        <show-list
          v-for="genre in genres"
          :key="genre"
          :list="showsByGenre[genre]"
          :title="genre"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
