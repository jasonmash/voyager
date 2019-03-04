<template>
  <div>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="scatter2d-chart" />
  </div>
</template>

<style scoped>
  .scatter2d-chart {
    width:auto;
    height: 400px;
  }
</style>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { ChartType, Scatter2DChartData } from "@/models/chart-data";

@Component
export default class Scatter2DChart extends Vue {
  @Prop(Object) public readonly data!: Scatter2DChartData;

  get chartData() {
    if (!this.data) { return; }
    const data: Scatter2DChartData = this.data;

    const chartData = {
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
      },
      xAxis: {
        type: "value",
        min: data.attributes[0].scaleMin,
        max: data.attributes[0].scaleMax,
        name: data.attributes[0].friendlyName,
        nameLocation: "middle"
      },
      yAxis: {
        type: "value",
        min: data.attributes[1].scaleMin,
        max: data.attributes[1].scaleMax,
        name: data.attributes[1].friendlyName,
        nameLocation: "middle"
      },
      tooltip: {},
      series: [{
        symbolSize: 5,
        data: data.values,
        type: "scatter",
        showAllSymbol: true,
        tooltip: {
          formatter: (params: any) => params.value[2]
        }
      }]
    };
    return chartData;
  }
}
</script>
