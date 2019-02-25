import _ from "lodash";
import Vue from "vue";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";

import { Attribute, AttributeInfo } from "@/models/attribute";

export class State {
  public data: AttributeInfo[] = [];
}

const getters = {
  attributes: (state: State): AttributeInfo[] => {
    return state.data;
  }
} as GetterTree<State, any>;

const mutations = {
  processAttribute: (state: State, attribute: Attribute) => {
    const index = _.findIndex(state.data, (f: AttributeInfo) => f.key === attribute.key);

    const ceil = Math.ceil(attribute.value * Math.pow(10, 2)) / Math.pow(10, 2);
    const floor = Math.floor(attribute.value * Math.pow(10, 2)) / Math.pow(10, 2);

    if (index === -1) {
      state.data.push({
        key: attribute.key,
        maxValue: attribute.value,
        minValue: attribute.value,
        scaleMax: ceil,
        scaleMin: floor,
        isHigherBetter: true,
        friendlyName: _.startCase(attribute.key)
      });
    } else {
      const attrInfo = state.data[index];
      if (attrInfo.maxValue < attribute.value) {
        attrInfo.maxValue = attribute.value;
        attrInfo.scaleMax = ceil;
      }
      if (attrInfo.minValue > attribute.value) {
        attrInfo.minValue = attribute.value;
        attrInfo.scaleMin = floor;
      }
      Vue.set(state.data, index, attrInfo);
    }
  },
  updateAttribute: (state: State, attribute: Attribute) => {
    const index = _.findIndex(state.data, (f: AttributeInfo) => f.key === attribute.key);
    Vue.set(state.data, index, _.merge(state.data[index], attribute));
  }
} as MutationTree<State>;

const actions = {} as ActionTree<State, any>;

export const attributes = {
  actions,
  getters,
  mutations,
  state: new State()
};

