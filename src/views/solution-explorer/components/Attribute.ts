import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";

import { Attribute } from "@/models/attribute";
import RangeSlider from "@/components/RangeSlider.vue";

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
   * Input attribute to show & filter
   * @type {Attribute}
   * @memberof AttributeComponent
   */
  @Prop(Object) public readonly attribute!: Attribute;

  /**
   * Index of filter in the list
   * @type {number}
   * @memberof AttributeComponent
   */
  @Prop(Number) public readonly index!: number;

  /**
   * Event handler for when user changes acceptable range of filter
   */
  public onRangeChange(attr: Attribute, event: any) {
    this.$store.commit("updateAttribute", {
      key: attr.key,
      filterMinValue: parseFloat(event.min),
      filterMaxValue: parseFloat(event.max)
    });
  }

  /**
   * Event handler for when user changes optimality aim of filter
   * E.g. higher is better, lower is better
   * @param {Attribute} attr
   * @param {boolean} isHigherBetter
   * @memberof AttributeComponent
   */
  public setAttributeOptimality(attr: Attribute, isHigherBetter: boolean) {
    this.$store.commit("updateAttribute", { key: attr.key, isHigherBetter });
  }

  /**
   * Toggles between whether this attribute is filtered or not
   * @param {Attribute} attr
   */
  public onFilterToggle(attr: Attribute) {
    this.$store.commit("updateAttribute", { key: attr.key, isFiltered: !attr.isFiltered });
    this.$emit("toggleFilter");
  }
}
