import { Component, Vue, Prop } from "vue-property-decorator";

import _ from "lodash";

import { Configuration } from "@/models/configuration";

import RadarChart from "@/components/charts/radar.vue";
import StructureChart from "@/components/charts/structure.vue";

/**
 * Configuration panel showing details of the selected configuration
 * @export
 * @class ConfigurationBox
 * @extends {Vue}
 */
@Component({
  components: {
    RadarChart,
    StructureChart
  }
})
export default class ConfigurationBox extends Vue {
  /**
   * Configuration to display
   * @type {Configuration}
   * @memberof ConfigurationBox
   */
  @Prop(Object) public readonly configuration!: Configuration;

  /**
   * Reference to possible attributes of configuration
   * @readonly
   * @memberof ConfigurationBox
   */
  get attributes() {
    return this.$store.getters.attributes;
  }
}
