import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// Initialise route list (determines what each URL does)
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: () => import("./views/solution-explorer/SolutionExplorer.vue") },
    { path: "/help", component: () => import("./views/About.vue") },
    { path: "*", component: () => import("./views/404.vue") }
  ]
});
