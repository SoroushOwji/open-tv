// filepath: /Users/Soroush/Documents/code/open-tv/src/pages/ShowDetails.vue
<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Show } from "../types";
import { useFetch } from "../hooks";

const route = useRoute();
const id = route.params.id;

const { data, error, isLoading } = useFetch<Show>(
  `http://api.tvmaze.com/shows/${id}`
);
console.log({ data, error, isLoading });
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div v-if="error">{{ error }}</div>
    <div v-else-if="!data">Loading...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      <div class="col-span-1">
        <div
          class="w-full h-screen bg-cover bg-center fixed top-0 left-0 z-0"
          :style="
            data.image
              ? `background-image: url(${data.image.original}); background-position: 0% 25%;`
              : 'background-image: url(https://via.placeholder.com/210x295?text=No+Image+Available)'
          "
          aria-label="Show Image"
        ></div>
      </div>
      <div
        class="col-span-1 sm:col-span-2 lg:col-span-3 p-8 rounded-3xl bg-black/85 text-white relative top-1/3 m-4 sm:top-0"
      >
        <div>
          <h1 class="text-3xl font-bold mb-2">
            {{ data.name }}
          </h1>
          <p class="text-gray-400 mb-4">
            {{ data.schedule.time }} - {{ data.schedule.days.join(", ") }}
          </p>
          <div
            class="absolute w-12 h-12 font-bold flex justify-around items-center top-4 right-4 bg-red-500 rounded-full text-sm"
          >
            {{ data.rating.average }}
          </div>
        </div>
        <span
          class="bg-white text-black text-xs font-bold rounded px-2 mr-2"
          v-for="genre in data.genres"
          :key="genre"
        >
          {{ genre }}
        </span>

        <p class="my-4" v-html="data.summary"></p>
        <p>Language: {{ data.language }}</p>
        <p>Premiered: {{ data.premiered }}</p>
        <p>Rating: {{ data.rating.average }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
