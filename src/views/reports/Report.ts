
import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";

import { Report, Section } from "@/models/report";
import { ChartType, CategoryChartData, ChartData } from "@/models/chart-data";
import { Configuration } from "@/models/configuration";
import { Attribute } from "@/models/attribute";
import BarChart from "@/components/charts/bar.vue";
import LineChart from "@/components/charts/line.vue";
import ScatterChart from "@/components/charts/scatter.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";

@Component({
  components: { BarChart, LineChart, ScatterChart, "scatter3d-chart": Scatter3DChart }
})
export default class ReportComponent extends Vue {
  public newSection: Section = {
    title: "",
    type: ChartType.Bar,
    data: {
      attributes: [],
      values: []
    }
  };

  public selectedChartType: ChartType = ChartType.Bar;

  get report(): Report {
    return this.$store.getters.reports.find((r: Report) => r.id.toString() === this.$route.params.id);
  }

  get attributes() {
    return this.$store.getters.attributes;
  }

  get configurations() {
    return this.$store.getters.configurations.filter((c: Configuration) => {
      return this.report.configurationIds.includes(c.id);
    });
  }

  public addSection() {
    this.newSection = {
      title: "",
      type: ChartType.Bar,
      data: {
        attributes: [],
        values: []
      }
    };
  }

  public saveNewSection() {
    if (!this.newSection) { return; }
    this.createSection();
    this.report.sections.push(this.newSection);

    this.$nextTick(() => {
      // Wrapped in $nextTick to ensure DOM is rendered before closing
      const modal: any = this.$refs.addSectionModal;
      modal.hide();
    });
  }

  public updateAttr(attributeKey: string) {
    if (!this.newSection || !this.newSection.data) { return; }

    const attribute = this.attributes.find((a: Attribute) => a.key === attributeKey);
    if (!attribute) { return; }

    this.newSection.data.attributes.push(attribute);
  }


  public createSection() {
    if (!this.newSection || !this.newSection.data) { return; }
    this.newSection.type = this.selectedChartType;

    const attributes = _.clone(this.newSection.data.attributes);

    switch (this.newSection.type) {
      case ChartType.Bar: {
        const data: CategoryChartData = {
          categories: this.configurations.map((c: Configuration) => c.id),
          values: this.configurations.map((c: Configuration) => c.attributes[attributes[0].key]),
          attributes: [attributes[0]]
        };
        this.newSection.data = data;
        break;
      }

      case ChartType.Line: {
        const data: CategoryChartData = {
          categories: this.configurations.map((c: Configuration) => c.id),
          values: this.configurations.map((c: Configuration) => c.attributes[attributes[0].key]),
          attributes: [attributes[0]]
        };
        this.newSection.data = data;
        break;
      }

      case ChartType.Scatter2D: {
        const data: ChartData = {
          values: this.configurations.map(
            (c: Configuration) => [c.attributes[attributes[0].key], c.attributes[attributes[1].key], c.id]),
          attributes: [attributes[0], attributes[1]]
        };
        this.newSection.data = data;
        break;
      }

      case ChartType.Scatter3D: {
        const data: ChartData = {
          values: this.configurations.map((c: Configuration) => [
              c.attributes[attributes[0].key],
              c.attributes[attributes[1].key],
              c.attributes[attributes[2].key],
              c.id
          ]),
          attributes: [attributes[0], attributes[1], attributes[2]]
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
