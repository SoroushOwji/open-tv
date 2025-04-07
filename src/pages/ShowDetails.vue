<script setup lang="ts">
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useShowStore } from "../stores/useShowStore";
import Rating from "../components/Rating.vue";
import TagLabel from "../components/TagLabel.vue";

const route = useRoute();
const id = route.params.id;

const showStore = useShowStore();
const { showDetail: show, showDetailError: error } = storeToRefs(showStore);

onMounted(() => {
  showStore.getShowById(id as string);
});
</script>

<template>
  <main class="min-h-screen">
    <div v-if="error" aria-live="polite">{{ error }}</div>
    <div v-else-if="!show" aria-live="polite">Loading...</div>
    <div v-else class="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <div
        class="fixed inset-0 bg-cover bg-center -z-1"
        :style="
          show.image
            ? `background-image: url(${show.image.original}); background-position: 0% 25%;`
            : 'background-image: url(https://via.placeholder.com/210x295?text=No+Image+Available)'
        "
        aria-label="Show Image"
      ></div>
      <article
        class="relative col-start-2 col-span-1 md:col-start-2 md:col-span-2 lg:col-start-2 lg:col-span-3 mx-4 p-8 bg-white/85 rounded-3xl dark:bg-black/85 dark:text-white top-[30vh]"
        aria-live="polite"
      >
        <div>
          <button
            @click="$router.back()"
            class="mb-4 cursor-pointer text-gray-500"
            aria-label="Back to previous page"
          >
            ← Back
          </button>
          <h1 class="text-3xl font-bold mb-2">
            {{ show.name }}
          </h1>
          <p class="text-gray-400 mb-4">
            {{ show.schedule.time }} - {{ show.schedule.days.join(", ") }}
          </p>
          <div class="absolute top-4 right-4">
            <rating
              v-if="show.rating.average"
              :value="show.rating.average"
              size="large"
              class="mb-4"
              aria-label="Show rating"
            ></rating>
          </div>
        </div>
        <p>Language: {{ show.language }}</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <tag-label v-for="genre in show.genres" :key="genre" :text="genre" />
        </div>
        <p class="my-4" v-html="show.summary"></p>
      </article>
    </div>
  </main>
</template>
