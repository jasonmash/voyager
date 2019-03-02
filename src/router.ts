import Vue from "vue";
import Router from "vue-router";

import Page from "./views/layouts/Explorer.vue";
import Layout from "./layouts/Layout.vue";

Vue.use(Router);

// Initialise route list (determines what each URL does)
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: () => import("./views/About.vue") },
    { path: "/overview", component: () => import("./views/overview/Overview.vue") },
    { path: "/attributes", component: () => import("./views/attributes/Attributes.vue") },
    { path: "/attributes/:id", component: () => import("./views/attributes/Attributes.vue") },
    { path: "/configurations", component: () => import("./views/configurations/Configurations.vue") },
    { path: "/configurations/:id", component: () => import("./views/configurations/Configurations.vue") },
    { path: "/solutions", component: () => import("./views/Demo.vue") },
    { path: "*", component: () => import("./views/404.vue") }
  ]
});
