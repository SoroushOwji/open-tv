import { setActivePinia, createPinia } from "pinia";
import { useThemeStore } from "../../src/stores/useThemeStore";
import { beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";

describe("useThemeStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("should initialize theme based on localStorage or system preference", () => {
    localStorage.setItem("theme", "dark");
    const store = useThemeStore();
    expect(store.theme).toBe("dark");

    localStorage.removeItem("theme");
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const storeWithSystemPref = useThemeStore();
    expect(storeWithSystemPref.theme).toBe("dark");
  });

  it("should toggle theme and update localStorage and document class", () => {
    const store = useThemeStore();
    store.theme = "light";

    store.toggleTheme();
    expect(store.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    store.toggleTheme();
    expect(store.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("should initialize document class based on theme", () => {
    const store = useThemeStore();
    store.theme = "dark";

    store.initializeTheme();
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    store.theme = "light";
    store.initializeTheme();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
