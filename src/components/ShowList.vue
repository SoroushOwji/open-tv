<script setup lang="ts">
import type { Show } from "../types";
import ShowCard from "./ShowCard.vue";
import { defineProps } from "vue";

defineProps<{
  list: Show[];
  title: string;
  loading?: boolean;
}>();
</script>

<template>
  <section class="">
    <h2 class="text-3xl font-bold p-4">
      <span
        v-if="loading"
        class="animate-pulse bg-gray-200 rounded w-1/3 h-8 inline-block"
      ></span>
      <span v-else>{{ title }}</span>
    </h2>
    <div class="w-full overflow-x-auto">
      <div class="flex gap-4 w-max px-4">
        <div
          v-if="loading"
          v-for="i in 5"
          :key="i"
          class="animate-pulse w-60 h-84 border bg-gray-200 border-gray-300 rounded-xl flex flex-col justify-between p-4"
        >
          <div class="w-full h-40 bg-gray-300 rounded"></div>
          <div class="w-3/4 h-4 bg-gray-300 rounded mt-4"></div>
          <div class="w-1/2 h-4 bg-gray-300 rounded mt-2"></div>
        </div>
        <show-card
          v-else-if="list.length"
          v-for="show in list"
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
</template>
