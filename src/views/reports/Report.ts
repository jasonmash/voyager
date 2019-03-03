
import { Component, Vue } from "vue-property-decorator";

import { Report, Section } from "@/models/report";
import { ChartType, BarChartData, LineChartData, Scatter2DChartData, Scatter3DChartData } from "@/models/chart-data";
import { Configuration } from "@/models/configuration";
import { Attribute } from "@/models/attribute";
import BarChart from "@/components/charts/bar.vue";
import LineChart from "@/components/charts/line.vue";
import Scatter2DChart from "@/components/charts/scatter-2d.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";

@Component({
  components: { BarChart, LineChart, "scatter2d-chart": Scatter2DChart, "scatter3d-chart": Scatter3DChart }
})
export default class ReportComponent extends Vue {
  public newSection: Section | undefined;
  public showNewSectionBox: boolean = false;

  public report: Report = {
    id: 1,
    name: "Report 1",
    configurationIds: ["sol_1", "sol_2", "sol_3", "sol_4", "sol_5", "sol_6"],
    sections: []
  };

  get attributes() {
    return this.$store.getters.attributes;
  }

  get configurations() {
    return this.$store.getters.configurations.filter((c: Configuration) => {
      return this.report.configurationIds.includes(c.id);
    });
  }

  public addSection() {
    this.showNewSectionBox = true;
    this.newSection = {
      title: "",
      type: ChartType.Bar,
      data: null
    };
  }

  public saveNewSection() {
    if (!this.newSection) { return; }
    this.report.sections.push(this.newSection);
    this.showNewSectionBox = false;
  }

  public updateSectionData(attributeKey: string) {
    if (!this.newSection) { return; }

    const attribute = this.attributes.find((a: Attribute) => a.key === attributeKey);
    if (!attribute) { return; }
    const attribute2 = this.attributes.find((a: Attribute) => a.key === "responseTime");
    if (!attribute2) { return; }
    const attribute3 = this.attributes.find((a: Attribute) => a.key === "reliability");
    if (!attribute3) { return; }

    switch (this.newSection.type) {
      case ChartType.Bar: {
        const data: BarChartData = {
          categories: this.configurations.map((c: Configuration) => c.id),
          values: this.configurations.map((c: Configuration) => c.attributes[attributeKey]),
          attributes: [attribute]
        };
        this.newSection.data = data;
        break;
      }

      case ChartType.Line: {
        const data: LineChartData = {
          categories: this.configurations.map((c: Configuration) => c.id),
          values: this.configurations.map((c: Configuration) => c.attributes[attributeKey]),
          attributes: [attribute]
        };
        this.newSection.data = data;
        break;
      }

      case ChartType.Scatter2D: {
        const data: Scatter2DChartData = {
          configurations: this.configurations.map((c: Configuration) => c.id),
          values: this.configurations.map(
            (c: Configuration) => [c.attributes[attribute.key], c.attributes[attribute2.key]]),
          attributes: [attribute, attribute2]
        };
        this.newSection.data = data;
        break;
      }

      case ChartType.Scatter3D: {
        const data: Scatter3DChartData = {
          values: this.configurations.map((c: Configuration) => [
              c.attributes[attribute.key],
              c.attributes[attribute2.key],
              c.attributes[attribute3.key],
              c.id
          ]),
          attributes: [attribute, attribute2, attribute3]
        };
        this.newSection.data = data;
        break;
      }

      default: {
        this.newSection.data = null;
      }
    }
  }
}
