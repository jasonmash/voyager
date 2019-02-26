import Vue from "vue";
import Router from "vue-router";

import Page from "./views/layouts/Explorer.vue";

Vue.use(Router);

// Initialise route list (determines what each URL does)
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: () => import("./views/About.vue") },
    {
      path: "/overview", component: Page,
      children: [{ path: "", component: () => import("./views/overview/Overview.vue") }]
    },
    {
      path: "/attributes", component: Page,
      children: [
        { path: "", component: () => import("./views/attributes/SplitView.vue") },
        { path: "*", component: () => import("./views/attributes/SplitView.vue") }
      ]
    },
    {
      path: "/configurations", component: Page,
      children: [
        { path: "", component: () => import("./views/configurations/SplitView.vue") },
        { path: "*", component: () => import("./views/configurations/SplitView.vue") }
      ]
    },
    {
      path: "/compare", component: Page,
      children: [{ path: "", component: () => import("./views/compare/Compare.vue") }]
    },
    {
      path: "/solutions", component: Page,
      children: [{ path: "", component: () => import("./views/Demo.vue") }]
    },
    {
      path: "/reports", component: Page,
      children: [{ path: "", component: () => import("./views/About.vue") }]
    },
    { path: "*", component: () => import("./views/404.vue") }
  ]
});
