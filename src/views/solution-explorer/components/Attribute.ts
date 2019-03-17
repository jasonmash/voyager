import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";

import { Attribute } from "@/models/attribute";
import RangeSlider from "@/components/RangeSlider.vue";

/**
 * AttributeFilter represents user applied limits to an attribute
 * @export
 * @interface AttributeFilter
 */
export interface AttributeFilter {
  /**
   * Attribute to apply filter to
   * @type {Attribute}
   * @memberof AttributeFilter
   */
  attribute: Attribute;

  /**
   * Minimum acceptable value of attribute
   * @type {number}
   * @memberof AttributeFilter
   */
  minValue: number;

  /**
   * Maximum acceptable value of attribute
   * @type {number}
   * @memberof AttributeFilter
   */
  maxValue: number;

  /**
   * Is filter enabled?
   * @type {boolean}
   * @memberof AttributeFilter
   */
  isFiltered: boolean;
}

/**
 * Attribute filter component, allows users to limit acceptable values
 * @export
 * @class AttributeComponent
 * @extends {Vue}
 */
@Component({
  components: {
    "range-slider": RangeSlider
  }
})
export default class AttributeComponent extends Vue {
  /**
   * Input filter to display and modify
   * @type {AttributeFilter}
   * @memberof AttributeComponent
   */
  @Prop(Object) public readonly filter!: AttributeFilter;

  /**
   * Index of filter in the list
   * @type {number}
   * @memberof AttributeComponent
   */
  @Prop(Number) public readonly index!: number;

  /**
   * Event handler for when user changes acceptable range of filter
   */
  public onRangeChange(attr: any, event: any) {
    attr.minValue = parseFloat(event.min);
    attr.maxValue = parseFloat(event.max);
  }

  /**
   * Event handler for when user changes optimality aim of filter
   * E.g. higher is better, lower is better
   * @param {Attribute} attribute
   * @param {boolean} isHigherBetter
   * @memberof AttributeComponent
   */
  public setAttributeOptimality(attribute: Attribute, isHigherBetter: boolean) {
    this.$store.commit("updateAttribute", { key: attribute.key, isHigherBetter });
  }
}
