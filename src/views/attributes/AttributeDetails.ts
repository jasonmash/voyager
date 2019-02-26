import Vue from "vue";
import Component from "vue-class-component";
import _ from "lodash";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

@Component
export default class AttributesComponent extends Vue {
  get attribute(): Attribute {
    return this.$store.getters.attributes.find((a: Attribute) => a.key === this.$route.params.pathMatch);
  }

  public configurationsFor(attribute: Attribute) {
    const configurations: Configuration[] = this.$store.getters.configurations;

    let result: any = [];
    configurations.forEach((c: Configuration) => {
      const attr = c.attributes.find((a) => a.key === attribute.key);
      if (attr) {
        result.push({ id: c.id, value: attr.value });
      }
    });

    result = _.sortBy(result, ["value"]);

    const bestValue = attribute.isHigherBetter ? result[result.length - 1].value : result[0].value;
    const bestConfigurations = result.filter((r: any) => r.value === bestValue);

    return {
      data: result,
      bestConfigurations,
      bestValue
    };
  }

  public change(attribute: Attribute, value: boolean) {
    this.$store.commit("updateAttribute", { key: attribute.key, isHigherBetter: value });
  }

  public barData(attribute: Attribute): any {
    const result = this.configurationsFor(attribute);
    return {
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
      },
      xAxis: {
        type: "category",
        data: result.data.map((c: any) => c.id)
      },
      yAxis: {
        type: "value",
        min: attribute.scaleMin,
        max: attribute.scaleMax
      },
      series: [{
        data: result.data.map((c: any) => c.value),
        type: "line",
        showAllSymbol: true
      }],
      tooltip: {
          trigger: "axis",
          position: (pt: any) => [pt[0], "10%"]
      }
    };
  }

  get tableData() {
    const data = this.configurationsFor(this.attribute);
    return {
      sortBy: "value",
      sortDesc: false,
      fields: [
        { key: "id", sortable: true },
        { key: "value", sortable: true }
      ],
      items: data.data
    };
  }
}
