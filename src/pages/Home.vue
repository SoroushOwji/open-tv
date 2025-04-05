<script setup lang="ts">
import ShowList from "../components/ShowList.vue";
import { useShowStore } from "../stores/useShowStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const showStore = useShowStore();
const {
  filteredGenres,
  filteredShows,
  showsByGenre,
  isLoading,
  error,
  searchInput,
} = storeToRefs(showStore);

onMounted(() => {
  if (showStore.shows.length === 0) {
    showStore.fetchShows();
  }
});
</script>

<template>
  <main class="dark:bg-gray-900 dark:text-white min-h-screen mt-15">
    <div class="p-4">
      <input
        v-model="searchInput"
        @input="(event) => showStore.updateSearchInput((event.target as HTMLInputElement)?.value)"
        type="text"
        placeholder="Search based on name or genre..."
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="filteredShows.length">
        <show-list title="Search Results" :list="filteredShows" />
      </div>
      <div>
        <show-list
          v-for="genre in filteredGenres"
          :key="genre"
          :list="showsByGenre[genre]"
          :title="genre"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
