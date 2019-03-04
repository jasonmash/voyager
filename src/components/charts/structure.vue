<template>
  <div>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="structure-chart" />
  </div>
</template>

<style scoped>
  .structure-chart {
    width:auto;
    height: 400px;
  }
</style>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { ConfigurationStructure } from "@/models/configuration";

@Component
export default class StructureChart extends Vue {
  @Prop(Object) public readonly data!: ConfigurationStructure;

  get chartData() {

    const data = this.data.components.map((c) => {
      return { name: c, x: 300, y: 300 };
    });

    const links = this.data.connections.map((c) => {
      return { target: c.from, source: c.to, label: { formatter: c.label, show: true, fontSize: 10 } };
    });

    return {
      tooltip: {},
      series: [
        {
          type: "graph",
          layout: "force",
          symbolSize: 50,
          symbol: "circle",
          animation: true,
          animationDuration: 100,
          draggable: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',sans-serif"
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
            initLayout: "force",
            edgeLength: 0.25,
            gravity: 0.5,
            repulsion: 0.25,
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
</script>
