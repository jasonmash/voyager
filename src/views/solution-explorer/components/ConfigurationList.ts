import { Component, Vue, Prop } from "vue-property-decorator";

import _ from "lodash";

import { Configuration } from "@/models/configuration";
import { AttributeFilter } from "./Attribute";

/**
 * List of configurations
 * @export
 * @class ConfigurationList
 * @extends {Vue}
 */
@Component
export default class ConfigurationList extends Vue {
  /**
   * Currently selected configuration
   * @type {Configuration}
   * @memberof ConfigurationList
   */
  @Prop(Object) public readonly selectedConfiguration!: Configuration;

  /**
   * List of configurations to display
   * Seperated into true (when pareto optimal) and false lists
   * @type {{ true: Configuration[], false: Configuration[] }}
   * @memberof ConfigurationList
   */
  @Prop(Object) public readonly list!: { true: Configuration[], false: Configuration[] };

  /**
   * List of filters to apply to configuration list, determines which attributes are visible
   * @type {AttributeFilter}
   * @memberof ConfigurationList
   */
  @Prop(Array) public readonly filters!: AttributeFilter;

  /**
   * Event handler when user selects a configuration
   * @param {Configuration} c Selected configuration
   * @memberof ConfigurationList
   */
  public selectConfiguration(c: Configuration) {
    this.$emit("select", c);
  }
}
