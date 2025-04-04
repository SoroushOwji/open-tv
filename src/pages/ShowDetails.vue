<script setup lang="ts">
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useShowStore } from "../stores/useShowStore";
import Rating from "../components/Rating.vue";

const route = useRoute();
const id = route.params.id;

const showStore = useShowStore();
const { showDetail: show, showDetailError: error } = storeToRefs(showStore);

onMounted(() => {
  showStore.getShowById(id as string);
});
</script>

<template>
  <main class="min-h-screen flex flex-col justify-center">
    <div v-if="error">{{ error }}</div>
    <div v-else-if="!show">Loading...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      <div class="col-span-1">
        <div
          class="w-full h-screen bg-cover bg-center fixed top-0 left-0 -z-1"
          :style="
            show.image
              ? `background-image: url(${show.image.original}); background-position: 0% 25%;`
              : 'background-image: url(https://via.placeholder.com/210x295?text=No+Image+Available)'
          "
          aria-label="Show Image"
        ></div>
      </div>
      <article
        class="col-span-1 sm:col-span-2 lg:col-span-3 p-8 bg-white/85 rounded-3xl dark:bg-black/85 dark:text-white relative top-[30vh] m-4 sm:top-0"
      >
        <div>
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
            ></rating>
          </div>
        </div>
        <span
          class="bg-white text-black text-xs font-bold rounded px-2 mr-2"
          v-for="genre in show.genres"
          :key="genre"
        >
          {{ genre }}
        </span>

        <p class="my-4" v-html="show.summary"></p>

        <p>Language: {{ show.language }}</p>
        <p>Premiered: {{ show.premiered }}</p>
        <p v-if="show.officialSite">
          Official Site:
          <a :href="show.officialSite" target="_blank">{{
            show.officialSite
          }}</a>
        </p>
      </article>
    </div>
  </main>
</template>
