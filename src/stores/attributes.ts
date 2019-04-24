import _ from "lodash";
import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { Attribute } from "@/models/attribute";

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
   * @param {{ key: string, value: number }} attribute Attribute value to process
   */
  processAttributeValue: (state: State, attribute: { key: string, value: number }) => {
    const index = _.findIndex(state.data, (f: Attribute) => f.key === attribute.key);

    if (index === -1) {
      // Insert new attribute
      state.data.push({
        key: attribute.key,
        maxValue: attribute.value,
        minValue: attribute.value,
        filterMaxValue: attribute.value,
        filterMinValue: attribute.value,
        filterPriority: 0,
        isFiltered: false,
        scaleMax: attribute.value,
        scaleMin: attribute.value,
        isHigherBetter: true,
        friendlyName: _.startCase(attribute.key),
        step: 1
      });
    } else {
      // Update existing attribute values
      const attrInfo = state.data[index];
      if (attrInfo.maxValue < attribute.value) {
        attrInfo.maxValue = attribute.value;
      }
      if (attrInfo.minValue > attribute.value) {
        attrInfo.minValue = attribute.value;
      }

      const getPrecision = (n: number) => Math.floor(Math.log(n) / Math.LN10 + 0.000000001);

      const minPrecision = getPrecision(attrInfo.minValue);
      const maxPrecision = getPrecision(attrInfo.maxValue);
      const precision = maxPrecision < minPrecision ? minPrecision : maxPrecision;

      // Calculate smallest incremental step for range sliders
      attrInfo.step = Math.pow(10, precision - 2);

      if (precision < 0) {
        // Calculate scales for attributes with small differences in values (step = 0.01 and below)
        attrInfo.scaleMax = attrInfo.maxValue + (attrInfo.step - (attrInfo.maxValue % attrInfo.step));
        attrInfo.scaleMin = attrInfo.minValue - (attrInfo.step + (attrInfo.minValue % attrInfo.step));
      } else if (precision > 2) {
        // Calculate scales for attributes with large differences in values (step = 10+)
        attrInfo.scaleMax = parseFloat(Math.ceil(attrInfo.maxValue +
          (attrInfo.step - (Math.ceil(attrInfo.maxValue) % attrInfo.step))).toPrecision(precision));
        attrInfo.scaleMin = parseFloat(Math.floor(attrInfo.minValue -
          (attrInfo.step - (Math.floor(attrInfo.minValue) % attrInfo.step))).toPrecision(precision));
      } else {
        // Calculate scales for attributes with integer differences in values (step = 1)
        attrInfo.scaleMax = Math.ceil(attrInfo.maxValue +
          (attrInfo.step - (Math.ceil(attrInfo.maxValue) % attrInfo.step)));
        attrInfo.scaleMin = Math.floor(attrInfo.minValue -
          (attrInfo.step - (Math.floor(attrInfo.minValue) % attrInfo.step)));
      }

      attrInfo.filterMinValue = attrInfo.scaleMin;
      attrInfo.filterMaxValue = attrInfo.scaleMax;

      // Update attribute in store
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
      // Check if attribute already exists, if so update it, if not add it
      const index = _.findIndex(state.data, (d) => d.key === c.key);
      if (c.isHigherBetter === undefined) { c.isHigherBetter = true; }
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

