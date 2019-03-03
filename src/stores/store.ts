import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "./persisted-state";

import { attributes } from "./attributes";
import { configurations } from "./configurations";
import { reports } from "./reports";

Vue.use(Vuex);

/**
 * Initialise vuex store, used to manage internal app data
 */
export default new Vuex.Store({
  modules: {
    attributes,
    configurations,
    reports
  },
  // Use createPersistedState to store data in localStorage across browser sessions
  plugins: [createPersistedState()],
  strict: true
});
