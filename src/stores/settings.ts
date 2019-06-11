import { ActionTree, GetterTree, MutationTree } from "vuex";

export class SettingsState {
  public configurationURL: string = "";
  public visualisationURL: string = "";
}

const getters = {
  /**
   * Get list of all reports, sorted by name
   */
  settings: (state: SettingsState): SettingsState => {
    return state;
  }
} as GetterTree<SettingsState, any>;

const mutations = {
  updateSettings: (state: SettingsState, payload: SettingsState) => {
    state.configurationURL = payload.configurationURL;
    state.visualisationURL = payload.visualisationURL;
  }
} as MutationTree<SettingsState>;

const actions = {} as ActionTree<SettingsState, any>;

export const settings = {
  actions,
  getters,
  mutations,
  state: new SettingsState()
};
