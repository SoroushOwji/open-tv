import { defineStore } from "pinia";
import { debounce } from "../utils";
import type { Show } from "../types";
import { type RouteLocationNormalizedLoaded, type Router } from "vue-router";
import { fetchShowsAPI, fetchShowDetailAPI } from "../service";

export const useShowStore = defineStore("useShowStore", {
  state: () => ({
    searchInput: "",
    debouncedSearchInput: "",
    shows: [] as Show[],
    error: null as Error | null,
    isLoading: false,
    genres: [] as string[],
    showsByGenre: {} as Record<string, Show[]>,
    isShowDetailLoading: false,
    showDetailError: null as Error | null,
    showDetail: null as Show | null,
  }),
  actions: {
    initializeSearchInput(route: RouteLocationNormalizedLoaded) {
      const searchParam = (route?.query?.search as string) || "";
      this.searchInput = searchParam;
      this.debouncedSearchInput = searchParam;
    },
    async fetchShows() {
      this.isLoading = true;
      this.error = null;

      try {
        const shows = await fetchShowsAPI();
        this.shows = shows;
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
        this.showDetail = await fetchShowDetailAPI(id);
      } catch (err) {
        this.showDetailError = err as Error;
      } finally {
        this.isShowDetailLoading = false;
      }
    },
    updateSearchInput(value: string, router: Router) {
      router.replace({
        query: { ...router.currentRoute.value.query, search: value },
      });
      const handleDebounceInput = debounce((newValue: string) => {
        this.debouncedSearchInput = newValue;
      }, 300);
      handleDebounceInput(value);
    },
    resetSearchInput(router: Router) {
      this.searchInput = "";
      this.updateSearchInput("", router);
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
