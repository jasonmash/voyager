import { Component, Vue, Prop } from "vue-property-decorator";

import _ from "lodash";

import { Attribute } from "@/models/attribute";

import RangeSlider from "@/components/RangeSlider.vue";

export interface AttributeFilter {
  attribute: Attribute;
  minValue: number;
  maxValue: number;
  isFiltered: boolean;
}

@Component({
  components: {
    "range-slider": RangeSlider
  }
})
export default class AttributeComponent extends Vue {
  @Prop(Object) public readonly filter!: AttributeFilter;
  @Prop(Number) public readonly index!: number;

  public onRangeChange(attr: any, event: any) {
    attr.minValue = parseFloat(event.min);
    attr.maxValue = parseFloat(event.max);
  }

  public setAttributeOptimality(attribute: Attribute, isHigherBetter: boolean) {
    this.$store.commit("updateAttribute", { key: attribute.key, isHigherBetter });
  }
}
