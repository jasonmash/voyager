import { Component, Vue, Prop } from "vue-property-decorator";

import _ from "lodash";

import { Configuration } from "@/models/configuration";

import RadarChart from "@/components/charts/radar.vue";
import StructureChart from "@/components/charts/structure.vue";

@Component({
  components: {
    RadarChart,
    StructureChart
  }
})
export default class ConfigurationBox extends Vue {
  @Prop(Object) public readonly configuration!: Configuration;

  get attributes() {
    return this.$store.getters.attributes;
  }
}
