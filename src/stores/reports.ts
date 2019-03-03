import _ from "lodash";
import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { Report } from "@/models/report";

export class State {
  public data: Report[] = [];
}

const getters = {
  /**
   * Get list of all reports, sorted by name
   */
  reports: (state: State): Report[] => {
    return state.data.map((a) => a).sort((a: Report, b: Report) => {
      return +a.name.split(/(\d+)/)[1] - +b.name.split(/(\d+)/)[1];
    });
  }
} as GetterTree<State, any>;

const mutations = {

  /**
   * Add a single report
   * @param {*} state Reference to state to update
   * @param {Report} payload Report to add
   */
  addReport: (state: State, payload: Report) => {
    state.data.push(payload);
  },

  /**
   * Delete a report
   * @param {*} state Reference to state to update
   * @param {Report} payload Report to delete
   */
  deleteReport: (state: State, payload: Report) => {
    const index = _.findIndex(state.data, (d) => d.id === payload.id);
    state.data.splice(index, 1);
  },

  /**
   * Update report
   * @param {*} state Reference to state to update
   * @param {Report} payload Report to update
   */
  updateReport: (state: State, payload: Report) => {
    const index = _.findIndex(state.data, (d) => d.id === payload.id);
    Vue.set(state.data, index, _.merge(state.data[index], payload));
  },

  /**
   * Clear all reports
   * @param {*} state Reference to state to update
   */
  resetReports: (state: State) => {
    state.data = [];
  }
} as MutationTree<State>;

const actions = {} as ActionTree<State, any>;

export const reports = {
  actions,
  getters,
  mutations,
  state: new State()
};
