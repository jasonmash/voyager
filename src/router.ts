import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// Initialise route list (determines what each URL does)
export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: () => import("./views/solution-explorer/SolutionExplorer.vue") },
    { path: "/about", component: () => import("./views/About.vue") },
    { path: "/reports/:id", component: () => import("./views/reports/Report.vue"), name: "Report" },
    { path: "*", component: () => import("./views/404.vue") }
  ]
});
