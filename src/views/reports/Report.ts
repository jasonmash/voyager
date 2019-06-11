import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";

import { Report, Section } from "@/models/report";
import { ChartType, ChartData } from "@/models/chart-data";
import { Configuration } from "@/models/configuration";
import { Attribute } from "@/models/attribute";

import Chart1D from "@/components/charts/1d.vue";
import RadarChart from "@/components/charts/radar.vue";
import ScatterChart from "@/components/charts/scatter.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";
import SurfaceChart from "@/components/charts/surface.vue";
import MapChart from "@/components/charts/map.vue";
import StructureChart from "@/components/charts/structure.vue";

@Component({
  components: {
    "scatter3d-chart": Scatter3DChart,
    "chart-1d": Chart1D,
    RadarChart, ScatterChart, SurfaceChart, MapChart, StructureChart }
})
export default class ReportComponent extends Vue {
  get report() {
    return this.$store.getters.reports.find((r: Report) => r.id.toString() === this.$route.params.id);
  }

  public deleteReport() {
    if (!this.report) { return; }

    const result = confirm("Are you sure you wish to delete this report?");

    if (result) {
      this.$store.commit("deleteReport", this.report);
      this.$router.replace("/");
    }
  }
}
