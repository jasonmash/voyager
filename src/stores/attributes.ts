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

    if (index === -1) {
      state.data.push({
        key: attribute.key,
        maxValue: attribute.value,
        minValue: attribute.value,
        scaleMax: attribute.value,
        scaleMin: attribute.value,
        isHigherBetter: true,
        friendlyName: _.startCase(attribute.key),
        step: 1
      });
    } else {
      const attrInfo = state.data[index];
      if (attrInfo.maxValue < attribute.value) {
        attrInfo.maxValue = attribute.value;
      }
      if (attrInfo.minValue > attribute.value) {
        attrInfo.minValue = attribute.value;
      }
      const magnitude = Math.floor(Math.log((attrInfo.maxValue + attrInfo.minValue) / 2) / Math.LN10 + 0.000000001);
      attrInfo.step = Math.pow(10, magnitude - 2);

      const precision = Math.floor(Math.log(attrInfo.maxValue - attrInfo.minValue) / Math.LN10 + 0.000000001);
      if (Math.abs(precision) > 2) {
        attrInfo.scaleMax = parseFloat((attrInfo.maxValue + attrInfo.step).toPrecision(Math.abs(precision) + 1));
        attrInfo.scaleMin = parseFloat((attrInfo.minValue - attrInfo.step).toPrecision(Math.abs(precision) + 1));
      } else {
        attrInfo.scaleMax = parseFloat((attrInfo.maxValue + attrInfo.step).toPrecision(2));
        attrInfo.scaleMin = parseFloat((attrInfo.minValue - attrInfo.step).toPrecision(2));
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
   * Add list of attributes
   * @param {*} state Reference to state to update
   * @param {Attribute} attributes Attributes to add
   */
  addAttributes: (state: State, payload: Attribute[]) => {
    payload.forEach((c: Attribute) => {
      const index = _.findIndex(state.data, (d) => d.key === c.key);
      if (index > -1) {
        Vue.set(state.data, index, _.merge(state.data[index], c));
      } else {
        state.data.push(c);
      }
    });
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

