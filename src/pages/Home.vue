<script setup lang="ts">
import ShowList from "../components/ShowList.vue";
import { useShowStore } from "../stores/useShowStore";
import { storeToRefs } from "pinia";

const showStore = useShowStore();
const {
  searchInput,
  filteredShows,
  genres,
  filteredGenres,
  showsByGenre,
  isLoading,
  error,
} = storeToRefs(showStore);
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
