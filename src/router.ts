import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import(/* webpackChunkName: "demo" */ "./views/Main.vue")
    },
    {
      path: "/demo",
      name: "demo",
      component: () => import(/* webpackChunkName: "demo" */ "./views/Demo.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
