import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/Home"),
  },
  {
    path: "/:name",
    name: "pokemon-profile",
    component: () => import("../pages/PokemonProfile"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];

export default createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes: routes,
});
