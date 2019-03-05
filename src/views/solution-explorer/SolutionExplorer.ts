import { Component, Vue } from "vue-property-decorator";

import _ from "lodash";
import draggable from "vuedraggable";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";
import RangeSlider from "@/components/RangeSlider.vue";

import BarChart from "@/components/charts/bar.vue";
import LineChart from "@/components/charts/line.vue";
import RadarChart from "@/components/charts/radar.vue";
import ScatterChart from "@/components/charts/scatter.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";
import StructureChart from "@/components/charts/structure.vue";

@Component({
  components: {
    BarChart,
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
}
