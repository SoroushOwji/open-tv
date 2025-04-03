import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { debounce } from "../utils";
import type { Show } from "../types";
import { useFetch } from "../hooks";

// async function fetchData<T>(url: string, options?: RequestInit) {}

export const useShowStore = defineStore("showStore", () => {
  const router = useRouter();
  const route = useRoute();

  // State
  const searchParam = (route.query.search as string) || "";
  const searchInput = ref(searchParam);
  const searchDebounced = ref(searchParam);

  const { data, error, isLoading } = useFetch<Show[]>(
    "http://api.tvmaze.com/shows"
  );

  // Getter function to find a show by ID
  const getShowById = (id: number) => {
    let show;
    if (!id) return { error: "No ID provided" };
    if (data.value) {
      show = data.value.find((show) => show.id === id);
      if (show) return { data: show };
    }

    if (!data.value) {
      return useFetch<Show>(`http://api.tvmaze.com/shows/${id}`);
    }

    return { error: "Show not found" };
  };

  // Debounced search update
  const updateSearchDebounced = debounce((value: string) => {
    searchDebounced.value = value;
    router.replace({ query: { ...route.query, search: value || undefined } });
  }, 300);

  watch(searchInput, (newValue) => {
    updateSearchDebounced(newValue);
  });

  // Computed properties
  const filteredShows = computed(() => {
    if (!searchDebounced.value || !data.value) return [] as Show[];
    return data.value.filter((show) =>
      show.name.toLowerCase().includes(searchDebounced.value.toLowerCase())
    );
  });

  const genres = computed(() => {
    const allGenres = data.value?.flatMap((show) => show.genres) || [];
    return Array.from(new Set(allGenres));
  });

  const filteredGenres = computed(() => {
    if (!searchDebounced.value) return genres.value;
    return genres.value.filter((genre) =>
      genre.toLowerCase().includes(searchDebounced.value.toLowerCase())
    );
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

  // Expose state and computed properties
  return {
    searchInput,
    searchDebounced,
    data,
    error,
    isLoading,
    filteredShows,
    genres,
    filteredGenres,
    showsByGenre,
  };
});
