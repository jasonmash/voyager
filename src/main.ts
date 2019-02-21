import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import "echarts";
import "zrender";
import "echarts-gl";
import ECharts from "vue-echarts";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.css";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component("e-chart", ECharts);

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
