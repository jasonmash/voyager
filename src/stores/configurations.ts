import _ from "lodash";
import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { Configuration } from "@/models/configuration";

export class State {
  public data: Configuration[] = [];
}

const getters = {
  /**
   * Get list of all configurations, sorted by id
   */
  configurations: (state: State): Configuration[] => {
    return state.data.map((a) => a).sort((a: Configuration, b: Configuration) => {
      return +a.id.split(/(\d+)/)[1] - +b.id.split(/(\d+)/)[1];
    });
  }
} as GetterTree<State, any>;

const mutations = {

  /**
   * Add a single configuration
   * @param {*} state Reference to state to update
   * @param {Configuration} payload Configuration to add
   */
  addConfiguration: (state: State, payload: Configuration) => {
    state.data.push(payload);
  },

  /**
   * Add a list of configurations
   * @param {*} state Reference to state to update
   * @param {Configuration[]} payload Configurations to add
   */
  addConfigurations: (state: State, payload: Configuration[]) => {
    payload.forEach((c: Configuration) => {
      const index = _.findIndex(state.data, (d) => d.id === c.id);
      if (index > -1) {
        Vue.set(state.data, index, _.merge(state.data[index], c));
      } else {
        state.data.push(c);
      }
    });
  },

  /**
   * Delete a configuration
   * @param {*} state Reference to state to update
   * @param {Configuration} payload Configuration to delete
   */
  deleteConfiguration: (state: State, payload: Configuration) => {
    const index = _.findIndex(state.data, (d) => d.id === payload.id);
    state.data.splice(index, 1);
  },

  /**
   * Update configuration
   * @param {*} state Reference to state to update
   * @param {Configuration} payload Configuration to update
   */
  updateConfiguration: (state: State, payload: Configuration) => {
    const index = _.findIndex(state.data, (d) => d.id === payload.id);
    Vue.set(state.data, index, _.merge(state.data[index], payload));
  },

  /**
   * Clear all data from configuration store
   * @param {*} state Reference to state to update
   */
  resetConfigurations: (state: State) => {
    state.data = [];
  }
} as MutationTree<State>;

const actions = {} as ActionTree<State, any>;

export const configurations = {
  actions,
  getters,
  mutations,
  state: new State()
};
