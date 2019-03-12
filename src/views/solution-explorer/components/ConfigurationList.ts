import { Component, Vue, Prop } from "vue-property-decorator";

import _ from "lodash";

import { Configuration } from "@/models/configuration";
import { AttributeFilter } from "./Attribute";

@Component
export default class ConfigurationList extends Vue {
  @Prop(Object) public readonly selectedConfiguration!: Configuration;
  @Prop(Object) public readonly list!: { true: Configuration[], false: Configuration[] };
  @Prop(Array) public readonly filters!: AttributeFilter;

  public selectConfiguration(c: Configuration) {
    this.$emit("select", c);
  }
}
