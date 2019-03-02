import { Component, Vue } from "vue-property-decorator";

import { Attribute, AttributeValue } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

@Component
export default class Demo extends Vue {

  get configurations(): Configuration[] {
    return this.$store.getters.configurations;
  }

  get attributeInfo(): Attribute[] {
    return this.$store.getters.attributes;
  }

  get dataSet() {
    const result: any[] = [];
    result.push(["id"]);

    this.attributeInfo.forEach((a: Attribute) => {
      result[0].push(a.key);
    });

    this.configurations.forEach((c: Configuration) => {
      const r = [0, 0, 0];
      c.attributes.forEach((a: AttributeValue) => {
        const index = result[0].findIndex((k: string) => k === a.key);
        r[index] = a.value;
      });
      result.push(r);
    });
    return result;
  }


  public data = {
    grid3D: {
      viewControl: {
        projection: "orthographic"
      }
    },
    textStyle: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    },
    xAxis3D: {
      scale: true,
      name: this.dataSet[0][1]
    },
    yAxis3D: {
      scale: true,
      name: this.dataSet[0][2]
    },
    zAxis3D: {
      scale: true,
      name: this.dataSet[0][3]
    },
    tooltip: {},
    dataset: {
        dimensions: this.dataSet[0],
        source: this.dataSet
    },
    series: [
        {
            type: "scatter3D",
            symbolSize: 2.5,
            encode: {
                x: this.dataSet[0][1],
                y: this.dataSet[0][2],
                z: this.dataSet[0][3]
            }
        }
    ]
  };

}
