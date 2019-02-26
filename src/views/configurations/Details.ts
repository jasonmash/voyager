import Vue from "vue";
import Component from "vue-class-component";

import { AttributeValue, Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

@Component
export default class DetailsComponent extends Vue {

  get value(): Configuration {
    return this.$store.getters.configurations.find((v: Configuration) => v.id === this.$route.params.pathMatch);
  }

  get attributeInfo(): Attribute[] {
    return this.$store.getters.attributes;
  }

  public deleteConfiguration(): void {
    if (confirm("Are you sure you wish to delete this configuration?")) {
      this.$store.commit("deleteConfiguration", this.value);
    }
  }

  public getAttrFriendlyName(key: string): string {
    const info = this.attributeInfo.find((i) => i.key === key);
    return info ? info.friendlyName : key;
  }

  get radarData() {
    const configuration = this.value;
    const data: any[] = [];

    configuration.attributes.forEach((a: AttributeValue) => {
      const info = this.attributeInfo.find((i) => i.key === a.key);
      if (info) {
        data.push({ name: info.friendlyName, min: info.minValue, max: info.maxValue, value: a.value });
      }
    });

    return {
      tooltip: {},
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        color: "black"
      },
      radar: {
        indicator: data.map(({ name, min, max }) => {
          return { name, min, max };
        })
      },
      series: [
        {
          name: configuration.id,
          type: "radar",
          data: [{ value: data.map(({ value }) => value) }]
        }
      ]
    };
  }


  get graphData() {

    const data = this.value.structure.components.map((c) => {
      return { name: c, x: 300, y: 300 };
    });

    const links = this.value.structure.connections.map((c) => {
      return { source: c.from, target: c.to, label: { formatter: c.label, show: true, fontSize: 10 } };
    });

    return {
      tooltip: {},
      series: [
        {
          type: "graph",
          layout: "force",
          symbolSize: 55,
          symbol: "circle",
          animation: false,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',sans-serif",
              }
            }
          },
          edgeLabel: {
            normal: {
              textStyle: {
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',sans-serif",
                color: "black",
                fontSize: 20
              }
            }
          },
          force: {
            initLayout: "circular",
            repulsion: 0.15,
            edgeLength: 0.3,
            layoutAnimation: false
          },
          edgeSymbol: ["arrow"],
          edgeSymbolSize: 9,
          data,
          links,
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 2,
              curveness: 0.2
            }
          }
        }
      ]
    };
  }
}
