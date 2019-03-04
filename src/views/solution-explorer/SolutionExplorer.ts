import { Component, Vue } from "vue-property-decorator";

import _ from "lodash";
import draggable from "vuedraggable";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";
import RangeSlider from "@/components/RangeSlider.vue";
import { ChartType } from "@/models/chart-data";

import BarChart from "@/components/charts/bar.vue";
import LineChart from "@/components/charts/line.vue";
import RadarChart from "@/components/charts/radar.vue";
import Scatter2DChart from "@/components/charts/scatter-2d.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";
import StructureChart from "@/components/charts/structure.vue";

@Component({
  components: {
    BarChart,
    LineChart,
    RadarChart,
    StructureChart,
    "scatter2d-chart": Scatter2DChart,
    "scatter3d-chart": Scatter3DChart,
    "range-slider": RangeSlider,
    draggable
  }
})
export default class SolutionExplorerComponent extends Vue {
  public drag: boolean = false;
  public attributes: any = [];
  public chartType: ChartType = ChartType.Line;
  public selectedConfiguration: Configuration | null = null;

  public created() {
    const data: Attribute[] = this.$store.getters.attributes;
    this.attributes =  data.map((attr: Attribute) => {
      return { attribute: attr, minValue: attr.scaleMin, maxValue: attr.scaleMax, filtered: false };
    });
  }

  get list() {
    const data: Configuration[] = this.$store.getters.configurations;
    this.attributes = _.orderBy(this.attributes, ["filtered"], ["desc"]);
    const attributes = _.clone(this.attributes);
    _.reverse(attributes);

    // Filter list based on searchQuery, look in email and name fields
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
    switch (attributes.length) {
      case 1: {
        this.chartType = ChartType.Line;
        break;
      }
      case 2: {
        this.chartType = ChartType.Scatter2D;
        break;
      }
      case 3: {
        this.chartType = ChartType.Scatter3D;
        break;
      }
      default: {
        return;
      }
    }

    let data;
    switch (this.chartType) {
      case ChartType.Line: {
        data = {
          categories: this.list.map((c: Configuration) => c.id),
          values: this.list.map((c: Configuration) => c.attributes[attributes[0].key]),
          attributes: [attributes[0]]
        };
        break;
      }

      case ChartType.Scatter2D: {
        data = {
          configurations: this.list.map((c: Configuration) => c.id),
          values: this.list.map(
            (c: Configuration) => [c.attributes[attributes[0].key], c.attributes[attributes[1].key], c.id]),
          attributes: [attributes[0], attributes[1]]
        };
        break;
      }

      case ChartType.Scatter3D: {
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
    }
    return data;
  }
}
