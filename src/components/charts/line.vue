<template>
  <div>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="line-chart" />
  </div>
</template>

<style scoped>
  .line-chart {
    width:auto;
    height: 400px;
  }
</style>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { ChartType, CategoryChartData } from "@/models/chart-data";

@Component
export default class LineChart extends Vue {
  @Prop(Object) public readonly data!: CategoryChartData;

  get chartData() {
    if (!this.data) { return; }
    const data: CategoryChartData = this.data;

    const chartData = {
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
      },
      tooltip: {
          trigger: "axis",
          position: (pt: any) => [pt[0], "10%"]
      },
      xAxis: {
        type: "category",
        data: data.categories
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
}
</script>
