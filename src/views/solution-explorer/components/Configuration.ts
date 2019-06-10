import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import _ from "lodash";
import axios from "axios";

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

  public content: any = [];

  public mounted() {
    this.loadApiData();
  }

  @Watch("configuration.id")
  public async loadApiData() {
    const configurations = await axios.get("https://localhost:5001/api/configurations/" + this.configuration.id);
    this.content = configurations.data.content;
  }

  /**
   * Reference to possible attributes of configuration
   * @readonly
   * @memberof ConfigurationBox
   */
  get attributes() {
    return this.$store.getters.attributes;
  }
}
