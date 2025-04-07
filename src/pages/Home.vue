<script setup lang="ts">
import ShowList from "../components/ShowList.vue";
import { useShowStore } from "../stores/useShowStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const showStore = useShowStore();
const {
  filteredGenres,
  filteredShows,
  showsByGenre,
  isLoading,
  error,
  searchInput,
} = storeToRefs(showStore);

const route = useRoute();
const router = useRouter();

onMounted(() => {
  showStore.initializeSearchInput(route);
  if (showStore.shows.length === 0) {
    showStore.fetchShows();
  }
});

const handleSearchInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  showStore.updateSearchInput(input.value, router);
};
const handleResetSearchInput = () => {
  showStore.resetSearchInput(router);
};
</script>

<template>
  <main class="dark:bg-gray-800 bg-gray-100 dark:text-white min-h-screen pt-15">
    <div class="p-2 m-4 flex gap-2 border border-gray-300 rounded-xl">
      <input
        v-model="searchInput"
        @input="handleSearchInput"
        type="text"
        placeholder="Search based on name or genre..."
        class="grow-1 outline-none border-none bg-transparent pl-1"
        aria-label="Search TV shows by name or genre"
      />
      <button
        v-if="searchInput"
        @click="handleResetSearchInput"
        type="button"
        aria-label="Clear search input"
        class="w-6 h-6 cursor-pointer hover:bg-black/10 rounded-full"
      >
        &#x2715;
      </button>
    </div>
    <div v-if="isLoading" aria-live="polite">
      <show-list loading title="Loading..." :list="[]" />
      <show-list loading title="Loading..." :list="[]" />
    </div>
    <div v-else-if="error" aria-live="polite">{{ error }}</div>
    <div v-else>
      <div v-if="filteredShows.length" aria-live="polite">
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
      <div
        v-if="filteredGenres.length === 0 && filteredShows.length === 0"
        class="px-4"
      >
        <div
          class="text-center text-gray-500 w-60 border border-gray-500 rounded-xl h-84 p-4 flex items-center justify-center"
        >
          No shows found. Please try a different search.
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
