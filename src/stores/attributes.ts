import _ from "lodash";
import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { AttributeValue, Attribute } from "@/models/attribute";

export class State {
  public data: Attribute[] = [];
}

const getters = {
  /**
   * Get list of all attributes
   */
  attributes: (state: State): Attribute[] => {
    return state.data;
  }
} as GetterTree<State, any>;

const mutations = {
  /**
   * Process attribute values, updating min/max values and scales as necessary
   * @param {*} state Reference to state to update
   * @param {AttributeValue} attribute Attribute value to process
   */
  processAttributeValue: (state: State, attribute: AttributeValue) => {
    const index = _.findIndex(state.data, (f: Attribute) => f.key === attribute.key);

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

  /**
   * Update attribute info
   * @param {*} state Reference to state to update
   * @param {Attribute} attribute Attribute to update
   */
  updateAttribute: (state: State, attribute: Attribute) => {
    const index = _.findIndex(state.data, (f: Attribute) => f.key === attribute.key);
    Vue.set(state.data, index, _.merge(state.data[index], attribute));
  },

  /**
   * Clear all data from attribute store
   * @param {*} state Reference to state to update
   */
  resetAttributes: (state: State) => {
    state.data = [];
  }
} as MutationTree<State>;

const actions = {} as ActionTree<State, any>;

export const attributes = {
  actions,
  getters,
  mutations,
  state: new State()
};

