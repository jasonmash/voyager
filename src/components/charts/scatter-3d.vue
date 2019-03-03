<template>
  <div>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="scatter3d-chart" />
  </div>
</template>

<style scoped>
  .scatter3d-chart {
    width:auto;
    height: 300px;
  }
</style>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { ChartType, Scatter3DChartData } from "@/models/chart-data";

@Component
export default class Scatter3DChart extends Vue {
  @Prop(Object) public readonly data!: Scatter3DChartData;

  get chartData() {
    if (!this.data) { return; }
    const data: Scatter3DChartData = this.data;

    const chartData = {
      animation: true,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
      },
      grid3D: {
        viewControl: {
          // projection: "orthographic"
        }
      },
      xAxis3D: {
        scale: true,
        name: data.attributes[0].friendlyName
      },
      yAxis3D: {
        scale: true,
        name: data.attributes[1].friendlyName
      },
      zAxis3D: {
        scale: true,
        name: data.attributes[2].friendlyName
      },
      series: [{
        symbolSize: 2.5,
        data: data.values,
        encode: {
            x: data.attributes[0].friendlyName,
            y: data.attributes[1].friendlyName,
            z: data.attributes[2].friendlyName,
            tooltip: [0, 1, 2]
        },
        type: "scatter3D"
      }],
      dataset: {
        dimensions: [data.attributes[0].key, data.attributes[1].key, data.attributes[2].key],
        source: data.values
      }
    };
    return chartData;
  }
}
</script>
