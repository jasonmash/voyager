import { Component, Vue } from "vue-property-decorator";

import _ from "lodash";
import draggable from "vuedraggable";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";
import { Report, Section } from "@/models/report";
import { ChartType } from "@/models/chart-data";

import RangeSlider from "@/components/RangeSlider.vue";

import LineChart from "@/components/charts/line.vue";
import RadarChart from "@/components/charts/radar.vue";
import ScatterChart from "@/components/charts/scatter.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";
import StructureChart from "@/components/charts/structure.vue";

@Component({
  components: {
    LineChart,
    RadarChart,
    StructureChart,
    ScatterChart,
    "scatter3d-chart": Scatter3DChart,
    "range-slider": RangeSlider,
    draggable
  }
})
export default class SolutionExplorerComponent extends Vue {
  public drag: boolean = false;
  public attributes: any = [];
  public chartDimensions: number = 0;
  public selectedConfiguration: Configuration | null = null;
  public newReportName: string = "";

  public created() {
    const data: Attribute[] = this.$store.getters.attributes;
    this.attributes =  data.map((attr: Attribute) => {
      return { attribute: attr, minValue: attr.scaleMin, maxValue: attr.scaleMax, filtered: false };
    });

    this.findOptimal();
  }

  get list() {
    const data: Configuration[] = this.$store.getters.configurations;
    this.attributes = _.orderBy(this.attributes, ["filtered"], ["desc"]);
    const attributes = _.clone(this.attributes);
    _.reverse(attributes);

    // Filter list based on searchQuery
    let result: Configuration[] = data.filter((item) => {
      let validAttributes = true;
      attributes.forEach((a: any) => {
        if (a.filtered) {
          const val = item.attributes[a.attribute.key];
          if (val && (val > a.maxValue || val < a.minValue)) { validAttributes = false; }
        }
      });
      return validAttributes;
    });

    attributes.forEach((a: any) => {
      if (a.filtered) {
        result = _.orderBy(result,
          [((c: Configuration) => c.attributes[a.attribute.key])],
          [(a.attribute.isHigherBetter ? "desc" : "asc")]);
      }
    });

    return result;
  }

  get totalCount() {
    return this.$store.getters.configurations.length;
  }

  get configurations() {
    return this.$store.getters.configurations;
  }

  public onRangeChange(attr: any, event: any) {
    attr.minValue = parseFloat(event.min);
    attr.maxValue = parseFloat(event.max);
  }

  get chartData() {
    const attributes = _.filter(this.attributes, "filtered").map((a) => a.attribute);
    this.chartDimensions = attributes.length;

    let data;
    switch (this.chartDimensions) {
      case 1: {
        data = {
          categories: this.list.map((c: Configuration) => c.id),
          values: this.list.map((c: Configuration) => c.attributes[attributes[0].key]),
          attributes: [attributes[0]]
        };
        break;
      }

      case 2: {
        data = {
          values: this.list.map(
            (c: Configuration) => [c.attributes[attributes[0].key], c.attributes[attributes[1].key], c.id]),
          attributes: [attributes[0], attributes[1]]
        };
        break;
      }

      case 3: {
        data = {
          values: this.list.map((c: Configuration) => [
              c.attributes[attributes[0].key],
              c.attributes[attributes[1].key],
              c.attributes[attributes[2].key],
              c.id
          ]),
          attributes: [attributes[0], attributes[1], attributes[2]]
        };
        break;
      }

      case 4: {
        data = {
          values: this.list.map((c: Configuration) => [
              c.attributes[attributes[0].key],
              c.attributes[attributes[1].key],
              c.attributes[attributes[2].key],
              c.attributes[attributes[3].key],
              c.id
          ]),
          attributes: [attributes[0], attributes[1], attributes[2], attributes[3]]
        };
        break;
      }

      case 5: {
        data = {
          values: this.list.map((c: Configuration) => [
              c.attributes[attributes[0].key],
              c.attributes[attributes[1].key],
              c.attributes[attributes[2].key],
              c.attributes[attributes[3].key],
              c.attributes[attributes[4].key],
              c.id
          ]),
          attributes: [attributes[0], attributes[1], attributes[2], attributes[3], attributes[4]]
        };
        break;
      }
    }
    return data;
  }

  public createReportOk(evt: Event) {
    // Prevent modal from closing
    evt.preventDefault();

    if (!this.newReportName) {
      alert("Please enter a report name");
    } else {
      this.createReportSubmit();
    }
  }

  public createReportSubmit() {
    const chartData: any = this.chartData;
    const sections: Section[] = [];

    if (this.chartDimensions === 1) {
      sections.push({
        title: "Bar Chart",
        type: ChartType.Bar,
        data: chartData
      });
      sections.push({
        title: "Line Chart",
        type: ChartType.Line,
        data: chartData
      });
    }

    if (this.chartDimensions === 2) {
      sections.push({
        title: "2D Scatter Chart",
        type: ChartType.Scatter2D,
        data: chartData
      });
    }

    if (this.chartDimensions === 3 || this.chartDimensions === 4) {
      sections.push({
        title: "2D Scatter Chart",
        type: ChartType.Scatter2D,
        data: chartData
      });
      sections.push({
        title: "3D Scatter Chart",
        type: ChartType.Scatter3D,
        data: chartData
      });
    }

    if (this.chartDimensions === 5) {
      sections.push({
        title: "3D Scatter Chart",
        type: ChartType.Scatter3D,
        data: chartData
      });
    }

    const report: Report = {
      id: this.$store.getters.reports.length,
      name: this.newReportName,
      configurationIds: this.list.map((c: Configuration) => c.id),
      sections
    };

    this.$store.commit("addReport", report);

    this.$nextTick(() => {
      // Wrapped in $nextTick to ensure DOM is rendered before closing
      const modal: any = this.$refs.newreport;
      modal.hide();
      this.$router.push("/reports/" + report.id);
    });
  }

  public findOptimal() {
    const configs = this.configurations.map((c: Configuration) => {
      return { id: c.id, a: c.attributes.a, b: c.attributes.b, c: c.attributes.c, d: c.attributes.d };
    });

    // console.log(this.optimalAtPoint({a: 85, b: 47}, configs));
  }

  public optimalAt(attrs: Array<{key: string, isHigherBetter: boolean}>, configs: any): any {
    const optimal = configs.filter((a: any) => {
      const hasBetterVal: boolean = !_.find(configs, (b: any) => {
        let isBetter = true;
        attrs.forEach((attr: any) => {
          if (attr.isHigherBetter) {
            isBetter = isBetter && b[attr.key] > a[attr.key];
          } else {
            isBetter = isBetter && b[attr.key] < a[attr.key];
          }
        });
        return isBetter;
      });
      return hasBetterVal;
    });
    return optimal;
  }

  public optimalAtPoint(point: { a: number, b: number }, configurations: any): any {
    if (configurations.length === 0) { return []; }

    const allConfigs = configurations;

    let configs = allConfigs.filter((c: any) => c.a === point.a && c.b === point.b);
    const stepA = 1;
    const stepB = 1;

    let i = 0;
    while (configs.length === 0) {
      i++;
      configs = allConfigs.filter((c: any) => c.a <= (point.a + (i * stepA)) && c.a >= (point.a - (i * stepA)));
      configs = configs.filter((c: any) => c.b <= (point.b + (i * stepB)) && c.b >= (point.b - (i * stepB)));
    }

    const params = [{ key: "a", isHigherBetter: false }, { key: "b", isHigherBetter: false }];

    let optimalConfigs = this.optimalAt(params, configs);
    while (optimalConfigs.length === 0) {
      i++;
      configs = allConfigs.filter((c: any) => c.a <= (point.a + (i * stepA)) && c.a >= (point.a - (i * stepA)));
      configs = configs.filter((c: any) => c.b <= (point.b + (i * stepB)) && c.b >= (point.b - (i * stepB)));
      optimalConfigs = this.optimalAt(params, configs);
    }
    return optimalConfigs;
  }
}
