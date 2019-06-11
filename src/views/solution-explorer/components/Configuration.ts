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
    if (this.$store.getters.settings.visualisationURL) {
      const url = this.$store.getters.settings.visualisationURL.replace("{id}", this.configuration.id);
      try {
        const configurations = await axios.get(url);
        if (Array.isArray(configurations.data.content)) {
          this.content = configurations.data.content;
        } else {
          this.$message({
            content: `Unable to process visualisation data sent from provided URL`,
            type: "warning"
          });
          this.content = [];
        }
      } catch (err) {
        this.$message({
          content: `Unable to load visualisations from provided URL`,
          type: "danger"
        });
        this.content = [];
      }
    } else {
      this.content = [];
    }
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
