<template>
  <div>
    <b-dropdown right class="float-right chart-dd" size="sm" variant="outline-secondary">
      <b-dropdown-item @click="exportChart">Export (.png)</b-dropdown-item>
    </b-dropdown>
    <e-chart :options="chartData" ref="chart" :init-options="{renderer: 'canvas'}" autoresize class="chart" :style="height ? 'height: ' + height + 'px' : ''" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { ConfigurationStructure } from "@/models/configuration";

import { ExportCanvas } from "./shared";

import "./charts.css";

/**
 * Structure chart, used to show how architecture components are linked for a configuration
 */
@Component
export default class StructureChart extends Vue {
  // ChartData object, with all info required to render chart
  @Prop(Object) public readonly data!: ConfigurationStructure;

  // Height of the chart in pixels, optional
  @Prop(String) public readonly height!: string | undefined;

  /**
   * Getter for chartData object in echarts format
   */
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
          symbolSize: 40,
          symbol: "circle",
          animation: false,
          focusNodeAdjacency: true,
          draggable: true,
          roam: true,
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
              position: "middle",
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
            gravity: 0.9,
            repulsion: 0.3,
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

  /**
   * Downloads the chart as a png file
   */
  public exportChart() {
    ExportCanvas(this.$refs.chart, "Structure.png");
  }
}
</script>
