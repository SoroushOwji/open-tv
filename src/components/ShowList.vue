<script setup lang="ts">
import type { Show } from "../types";
import ShowCard from "./ShowCard.vue";
import { defineProps } from "vue";

defineProps<{
  list: Show[];
  title: string;
}>();
</script>

<template>
  <section class="p-4">
    <h2 class="text-3xl font-bold">{{ title }}</h2>
    <div class="w-full overflow-x-auto">
      <div class="flex gap-4 w-max">
        <show-card
          v-if="list.length"
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
