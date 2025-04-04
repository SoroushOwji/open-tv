<script setup lang="ts">
import { useRoute } from "vue-router";

import { useShowStore } from "../stores/useShowStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const route = useRoute();
const id = route.params.id;

const showStore = useShowStore();
const { showDetail: show, showDetailError: error } = storeToRefs(showStore);

onMounted(() => {
  showStore.getShowById(id as string);
});
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div v-if="error">{{ error }}</div>
    <div v-else-if="!show">Loading...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      <div class="col-span-1">
        <div
          class="w-full h-screen bg-cover bg-center fixed top-0 left-0 z-0"
          :style="
            show.image
              ? `background-image: url(${show.image.original}); background-position: 0% 25%;`
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
            {{ show.name }}
          </h1>
          <p class="text-gray-400 mb-4">
            {{ show.schedule.time }} - {{ show.schedule.days.join(", ") }}
          </p>
          <div
            class="absolute w-12 h-12 font-bold flex justify-around items-center top-4 right-4 bg-red-500 rounded-full text-sm"
          >
            {{ show.rating.average }}
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
        <p>url {{ show.url }}</p>
        <p>type {{ show.type }}</p>
        <p>status {{ show.status }}</p>
        <p>runtime {{ show.runtime }}</p>
        <p>averageRuntime {{ show.averageRuntime }}</p>
        <p>premiered {{ show.premiered }}</p>
        <p>ended {{ show.ended }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
