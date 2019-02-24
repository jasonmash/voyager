import Vue from "vue";

import "echarts";
import "zrender";
import "echarts-gl";
import ECharts from "vue-echarts";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "@/assets/fonts/Inter/inter.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/styles/list-details.css";

import Message from "./components/messages/MessagePlugin";
import App from "./App.vue";
import router from "./router";
import store from "./stores/store";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component("e-chart", ECharts);
Vue.use(Message);

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount("#app");
