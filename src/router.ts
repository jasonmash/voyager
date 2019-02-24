import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: () => import("./views/About.vue")},
    { path: "/demo", component: () => import("./views/Demo.vue")},
    { path: "/overview", component: () => import("./views/configurations/Page.vue")},
    { path: "/configurations/:id", component: () => import("./views/configurations/Page.vue")},
    { path: "/attributes", component: () => import("./views/configurations/Page.vue")},
    { path: "/compare", component: () => import("./views/configurations/Page.vue")},
    { path: "/solutions", component: () => import("./views/configurations/Page.vue")},
    { path: "/reports", component: () => import("./views/configurations/Page.vue")}
  ]
});
