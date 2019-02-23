import { Component, Vue } from "vue-property-decorator";

import { AttributeInfo, Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

@Component
export default class Demo extends Vue {

  get configurations(): Configuration[] {
    return this.$store.getters.configurations;
  }

  get attributeInfo(): AttributeInfo[] {
    return this.$store.getters.attributes;
  }

  get dataSet() {
    const result: any[] = [];
    result.push(["id"]);

    this.attributeInfo.forEach((a: AttributeInfo) => {
      result[0].push(a.key);
    });

    this.configurations.forEach((c: Configuration) => {
      const r = [0, 0, 0];
      c.attributes.forEach((a: Attribute) => {
        const index = result[0].findIndex((k: string) => k === a.key);
        r[index] = a.value;
      });
      result.push(r);
    });
    return result;
  }


  public data2 = {
    grid3D: {
      viewControl: {
        projection: "orthographic"
      }
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
      max: 1,
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

  public data = {
      tooltip: {},
      backgroundColor: "#fff",
      visualMap: {
        show: false,
        dimension: 2,
        min: -1,
        max: 1,
        inRange: {
          color: [
            "#313695", "#4575b4", "#74add1", "#abd9e9",
            "#e0f3f8", "#ffffbf", "#fee090", "#fdae61",
            "#f46d43", "#d73027", "#a50026"]
        }
      },
      xAxis3D: {
        type: "value"
      },
      yAxis3D: {
        type: "value"
      },
      zAxis3D: {
        type: "value"
      },
      grid3D: {
        viewControl: {
        }
      },
      series: [{
        type: "surface",
        wireframe: {
          show: true
        },
        equation: {
          x: {
            step: 0.05
          },
          y: {
            step: 0.05
          },
          z: (x: any, y: any) => {
            if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
              return "-";
            }
            return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
          }
        }
      }]
    };
}
