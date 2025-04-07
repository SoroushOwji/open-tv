import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
const ShowDetails = () => import("../pages/ShowDetails.vue");

const routes = [
  { path: "/", component: Home },
  { path: "/:id", component: ShowDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
