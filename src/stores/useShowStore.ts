import { defineStore } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { debounce } from "../utils";
import type { Show } from "../types";

export const useShowStore = defineStore("useShowStore", {
  state: () => {
    const route = useRoute();
    const router = useRouter();
    const searchParam = (route.query.search as string) || "";

    const state = {
      searchInput: searchParam,
      debouncedSearchInput: searchParam,
      route,
      router,
      shows: [] as Show[],
      error: null as Error | null,
      isLoading: false,
      genres: [] as string[],
      showsByGenre: {} as Record<string, Show[]>,
      isShowDetailLoading: false,
      showDetailError: null as Error | null,
      showDetail: null as Show | null,
    };

    return state;
  },
  actions: {
    async fetchShows() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch("http://api.tvmaze.com/shows");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        this.shows = await response.json();
        this.genres = Array.from(
          new Set(this.shows.flatMap((show) => show.genres))
        );
        const sortedShows = this.shows.sort(
          (a, b) => (b.rating.average || 0) - (a.rating.average || 0)
        );
        this.showsByGenre = this.genres.reduce((acc, genre) => {
          acc[genre] = sortedShows.filter((show) =>
            show.genres.includes(genre)
          );
          return acc;
        }, {} as Record<string, Show[]>);
      } catch (err) {
        this.error = err as Error;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchShowDetail(id: string) {
      this.isShowDetailLoading = true;
      this.showDetailError = null;

      try {
        const response = await fetch(`http://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        this.showDetail = await response.json();
      } catch (err) {
        this.showDetailError = err as Error;
      } finally {
        this.isShowDetailLoading = false;
      }
    },
    updateSearchInput(value: string) {
      this.$state.router.replace({
        query: { ...this.$state.route.query, search: value },
      });
      const handleDebounceInput = debounce((newValue: string) => {
        this.debouncedSearchInput = newValue;
      }, 300);
      handleDebounceInput(value);
    },
    resetSearchInput() {
      this.searchInput = "";
      this.updateSearchInput("");
    },
    getShowById(id: string) {
      if (!this.shows.length) {
        this.fetchShowDetail(id);
        this.fetchShows();
        return;
      }
      const show = this.shows.find((show) => show.id === Number(id));
      if (!show) {
        this.fetchShowDetail(id);
        this.fetchShows();
        return;
      }
      this.showDetail =
        this.shows.find((show) => show.id === Number(id)) ?? null;
    },
  },

  getters: {
    filteredShows: (state) => {
      if (!state.debouncedSearchInput) return [] as Show[];
      return state.shows.filter((show) =>
        show.name
          .toLowerCase()
          .includes(state.debouncedSearchInput.toLowerCase())
      );
    },
    filteredGenres: (state) => {
      if (!state.debouncedSearchInput) return state.genres;
      return state.genres.filter((genre) =>
        genre.toLowerCase().includes(state.debouncedSearchInput.toLowerCase())
      );
    },
  },
});
