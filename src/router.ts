import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: () => import("./views/Main.vue")},
    { path: "/demo", component: () => import("./views/Demo.vue")},
    { path: "/about", component: () => import("./views/About.vue") },
    { path: "/configurations", component: () => import("./views/configurations/Page.vue")},
    { path: "/configurations/:id", component: () => import("./views/configurations/Page.vue")}
  ]
});
