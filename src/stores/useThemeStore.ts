import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme:
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", this.theme);
      document.documentElement.classList.toggle("dark", this.theme === "dark");
    },
    initializeTheme() {
      document.documentElement.classList.toggle("dark", this.theme === "dark");
    },
  },
});
