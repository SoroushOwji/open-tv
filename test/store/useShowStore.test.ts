import { setActivePinia, createPinia } from "pinia";
import { useShowStore } from "../../src/stores/useShowStore";
import { beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";

describe("useShowStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with correct state", () => {
    const store = useShowStore();
    expect(store.searchInput).toBe("");
    expect(store.debouncedSearchInput).toBe("");
    expect(store.shows).toEqual([]);
    expect(store.error).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(store.genres).toEqual([]);
    expect(store.showsByGenre).toEqual({});
    expect(store.isShowDetailLoading).toBe(false);
    expect(store.showDetailError).toBeNull();
    expect(store.showDetail).toBeNull();
  });

  it("fetchShows updates state correctly on success", async () => {
    const mockShows = [
      { id: 1, name: "Show 1", genres: ["Drama"], rating: { average: 8 } },
      { id: 2, name: "Show 2", genres: ["Comedy"], rating: { average: 7 } },
    ];
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockShows),
      })
    ) as unknown as typeof fetch;

    const store = useShowStore();
    await store.fetchShows();

    expect(store.shows).toEqual(mockShows);
    expect(store.genres).toEqual(["Drama", "Comedy"]);
    expect(store.showsByGenre).toHaveProperty("Drama");
    expect(store.showsByGenre).toHaveProperty("Comedy");
    expect(store.error).toBeNull();
    expect(store.isLoading).toBe(false);
  });

  it("fetchShows handles errors correctly", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      })
    ) as unknown as typeof fetch;

    const store = useShowStore();
    await store.fetchShows();

    expect(store.error).toBeInstanceOf(Error);
    expect(store.isLoading).toBe(false);
  });

  it("filteredShows returns correct filtered results", () => {
    const store = useShowStore();
    store.shows = [
      { id: 1, name: "Breaking Bad" },
      { id: 2, name: "Better Call Saul" },
    ] as any;

    store.debouncedSearchInput = "breaking";
    expect(store.filteredShows).toEqual([{ id: 1, name: "Breaking Bad" }]);

    store.debouncedSearchInput = "";
    expect(store.filteredShows).toEqual([]);
  });

  it("filteredGenres returns correct filtered results", () => {
    const store = useShowStore();
    store.genres = ["Drama", "Comedy", "Action"];

    store.debouncedSearchInput = "c";
    expect(store.filteredGenres).toEqual(["Comedy", "Action"]);

    store.debouncedSearchInput = "";
    expect(store.filteredGenres).toEqual(["Drama", "Comedy", "Action"]);
  });
});
