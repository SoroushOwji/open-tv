import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useThemeStore } from "./stores/useThemeStore";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");

// Initialize theme
const themeStore = useThemeStore();
themeStore.initializeTheme();
