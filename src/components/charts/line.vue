<template>
  <b-card no-body>
    <div slot="header" class="chart-header">
      <b-dropdown right class="float-right" size="sm" variant="outline-secondary">
        <b-dropdown-item @click="exportChart">Export (.svg)</b-dropdown-item>
      </b-dropdown>
      <span v-if="title">{{title}}</span>
      <span v-else>Line Chart</span>
    </div>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="line-chart" ref="chart"/>
  </b-card>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { ChartType, ChartData } from "@/models/chart-data";

import { ExportSvg } from "./shared";

import "./charts.css";

@Component
export default class LineChart extends Vue {
  @Prop(Object) public readonly data!: ChartData;
  @Prop(String) public readonly title!: string | undefined;

  get chartData() {
    if (!this.data) { return; }
    const data: ChartData = this.data;

    const chartData = {
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
      },
      grid: {
        top: 30,
        left: 50,
        right: 30,
        bottom: 60
      },
      tooltip: {
        trigger: "axis",
        position: (pt: any) => [pt[0], "10%"]
      },
      xAxis: {
        type: "category",
        data: data.categories,
        name: data.attributes[0].friendlyName,
        nameLocation: "middle",
        nameGap: 35
      },
      yAxis: {
        type: "value",
        min: data.attributes[0].scaleMin,
        max: data.attributes[0].scaleMax
      },
      series: [{
        data: data.values,
        type: "line",
        showAllSymbol: true
      }]
    };
    return chartData;
  }

  public exportChart() {
    ExportSvg(this.$refs.chart, "Chart.svg");
  }
}
</script>
