<template>
  <div>
    <b-dropdown right class="float-right chart-dd" size="sm" variant="outline-secondary">
      <b-dropdown-item @click="exportChart">Export (.svg)</b-dropdown-item>
      <b-dropdown-divider />
      <report-dropdown :section-index="this.sectionIndex"/>
    </b-dropdown>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="chart" ref="chart" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { ChartType, ChartData } from "@/models/chart-data";

import ReportDropdown from "../ReportDropdown.vue";

import { ExportSvg } from "./shared";

import "./charts.css";

/**
 * 1-dimensional chart, displays as a bar or line chart
 */
@Component({
  components: {
    ReportDropdown
  }
})
export default class Chart1D extends Vue {
  // ChartData object, with all info required to render chart
  @Prop(Object) public readonly data!: ChartData;

  // Type string, options: 'bar' and 'line'
  @Prop(String) public readonly type!: string;

  // Index of section if chart exists within a report (optional)
  @Prop(Number) public readonly sectionIndex?: number;

  /**
   * Getter for chartData object in echarts format
   */
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
        type: this.type,
        showAllSymbol: true
      }]
    };
    return chartData;
  }

  /**
   * Downloads the chart as a svg file
   */
  public exportChart() {
    ExportSvg(this.$refs.chart, "Chart.svg");
  }
}
</script>
