import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";

import { Report, Section } from "@/models/report";
import { ChartType, ChartData } from "@/models/chart-data";
import { Configuration } from "@/models/configuration";
import { Attribute } from "@/models/attribute";
import Chart1D from "@/components/charts/1d.vue";
import ScatterChart from "@/components/charts/scatter.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";

@Component({
  components: {
    ScatterChart,
    "chart-1d": Chart1D,
    "scatter3d-chart": Scatter3DChart }
})
export default class ReportComponent extends Vue {
  public newSectionData: any = {};
  public newSection: Section = {
    title: "",
    type: ChartType.Bar,
    data: {
      attributes: [],
      values: []
    }
  };

  get report() {
    return this.$store.getters.reports.find((r: Report) => r.id.toString() === this.$route.params.id);
  }

  get attributes() {
    return this.$store.getters.attributes;
  }

  get attributeMap() {
    const result: any = {};
    this.$store.getters.attributes.forEach((a: Attribute) => {
      result[a.key] = a;
    });
    return result;
  }

  get configurations() {
    if (!this.report) { return []; }

    const report = this.report;
    return this.$store.getters.configurations.filter((c: Configuration) => {
      return report.configurationIds.includes(c.id);
    });
  }

  public addSection() {
    this.newSectionData = {};
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
    if (!this.newSection || !this.report) { return; }

    this.newSection.type = this.newSectionData.type;
    this.newSection.data = this.loadSectionData();
    this.$store.commit("addReportSection", { id: this.report.id, section: this.newSection});

    this.$nextTick(() => {
      // Wrapped in $nextTick to ensure DOM is rendered before closing
      const modal: any = this.$refs.addSectionModal;
      modal.hide();
    });
  }

  public loadSectionData(): ChartData | null {
    if (!this.newSection || !this.newSection.data) { return null; }

    switch (this.newSection.type) {
      case ChartType.Bar: {
        const configs: Configuration[] = _.orderBy(this.configurations, ["attributes." + this.newSectionData.x]);
        const data: ChartData = {
          categories: configs.map((c: Configuration) => c.id),
          values: configs.map((c: Configuration) => c.attributes[this.newSectionData.x]),
          attributes: [this.attributeMap[this.newSectionData.x]]
        };
        return data;
      }

      case ChartType.Line: {
        const configs: Configuration[] = _.orderBy(this.configurations, ["attributes." + this.newSectionData.x]);
        const data: ChartData = {
          categories: configs.map((c: Configuration) => c.id),
          values: configs.map((c: Configuration) => c.attributes[this.newSectionData.x]),
          attributes: [this.attributeMap[this.newSectionData.x]]
        };
        return data;
      }

      case ChartType.Scatter2D: {
        const data: ChartData = {
          values: this.configurations.map(
            (c: Configuration) => [
              c.attributes[this.newSectionData.x],
              c.attributes[this.newSectionData.y],
              c.attributes[this.newSectionData.size],
              c.attributes[this.newSectionData.colour],
              c.id]),
          attributes: [
            this.attributeMap[this.newSectionData.x],
            this.attributeMap[this.newSectionData.y],
            this.attributeMap[this.newSectionData.size],
            this.attributeMap[this.newSectionData.colour]
          ]
        };
        return data;
      }

      case ChartType.Scatter3D: {
        const data: ChartData = {
          values: this.configurations.map((c: Configuration) => [
              c.attributes[this.newSectionData.x],
              c.attributes[this.newSectionData.y],
              c.attributes[this.newSectionData.z],
              c.attributes[this.newSectionData.size],
              c.attributes[this.newSectionData.colour],
              c.id
          ]),
          attributes: [
            this.attributeMap[this.newSectionData.x],
            this.attributeMap[this.newSectionData.y],
            this.attributeMap[this.newSectionData.z],
            this.attributeMap[this.newSectionData.size],
            this.attributeMap[this.newSectionData.colour]
          ]
        };
        return data;
      }
    }

    return null;
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
