import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// Initialise route list (determines what each URL does)
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: () => import("./views/About.vue") },
    { path: "/data", component: () => import("./views/data-management/DataManagement.vue") },
    { path: "/attributes", component: () => import("./views/attributes/Attributes.vue") },
    { path: "/attributes/:id", component: () => import("./views/attributes/Attributes.vue") },
    { path: "/configurations", component: () => import("./views/configurations/Configurations.vue") },
    { path: "/configurations/:id", component: () => import("./views/configurations/Configurations.vue") },
    { path: "/reports/:id", component: () => import("./views/reports/Report.vue") },
    { path: "/solutions", component: () => import("./views/solution-explorer/SolutionExplorer.vue") },
    { path: "*", component: () => import("./views/404.vue") }
  ]
});
