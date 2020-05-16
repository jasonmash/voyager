<template>
  <b-row class="pt-3">
    <b-col md="6" v-for="chart in chartData" :key="chart.configTitle">
      <b-card :title="chart.configTitle" class="mb-3">
        <e-chart
          :options="chart"
          ref="chart"
          :init-options="{renderer: 'canvas'}"
          autoresize
          class="chart"
          style="height: 300px"
        />
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Attribute } from "@/models/attribute";
import { Section } from "@/models/report";
import { Configuration } from "@/models/configuration";
import { ChartType, ChartData } from "@/models/chart-data";

import "./charts.css";

/**
 * Radar chart, renders properties for a given list of configurations
 */
@Component
export default class ConfigStructures extends Vue {
  // ChartData object, with all info required to render chart
  @Prop(Array) public readonly data!: Configuration[];

  /**
   * List of attributes from store, used for chart labels
   */
  get attributes() {
    return this.$store.getters.attributes;
  }

  /**
   * Getter for chartData object in echarts format
   */
  get chartData() {

    const result = this.data.map((config: Configuration) => {
      const data = config.structure.components.map((c) => {
        return { name: c, x: 300, y: 300 };
      });

      const links = config.structure.connections.map((c) => {
        return { target: c.from, source: c.to, label: { formatter: c.label, show: true, fontSize: 10 } };
      });

      return {
        configTitle: config.id,
        tooltip: {},
        series: [{
          type: "graph",
          layout: "force",
          symbolSize: 35,
          symbol: "circle",
          animation: false,
          focusNodeAdjacency: true,
          draggable: true,
          roam: true,
          label: {
              normal: {
              show: true,
              textStyle: {
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',sans-serif",
                  fontSize: 10
              }
              }
          },
          edgeLabel: {
              normal: {
              position: "middle",
              textStyle: {
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',sans-serif",
                  color: "black",
                  fontSize: 18
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
        }]
      };
    });
    return result;
  }
}
</script>
