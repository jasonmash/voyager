import Vue from "vue";
import Vuex from "vuex";

import { attributes } from "./attributes";
import { configurations } from "./configurations";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    attributes,
    configurations
  },
  strict: true
});
