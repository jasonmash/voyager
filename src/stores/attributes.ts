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
    if (index === -1) {
      state.data.push({
        key: attribute.key,
        maxValue: attribute.value,
        minValue: attribute.value,
        scaleMax: Math.ceil(attribute.value),
        scaleMin: Math.floor(attribute.value),
        friendlyName: _.startCase(attribute.key)
      });
    } else {
      const attrInfo = state.data[index];
      if (attrInfo.maxValue < attribute.value) {
        attrInfo.maxValue = attribute.value;
        attrInfo.scaleMax = Math.ceil(attrInfo.maxValue);
      }
      if (attrInfo.minValue > attribute.value) {
        attrInfo.minValue = attribute.value;
        attrInfo.scaleMin = Math.floor(attrInfo.minValue);
      }
      Vue.set(state.data, index, attrInfo);
    }
  }
} as MutationTree<State>;

const actions = {} as ActionTree<State, any>;

export const attributes = {
  actions,
  getters,
  mutations,
  state: new State()
};
