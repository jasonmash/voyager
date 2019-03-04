<template>
  <div>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="scatter3d-chart" ref="chart" />
    <b-button @click="switchPerspective">Change projection</b-button>
  </div>
</template>

<style scoped>
  .scatter3d-chart {
    width:auto;
    height: 400px;
  }
</style>

<script lang="ts">
import { Prop, Component, Vue, Watch } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { ChartType, Scatter3DChartData } from "@/models/chart-data";

@Component
export default class Scatter3DChart extends Vue {
  @Prop(Object) public readonly data!: Scatter3DChartData;

  public chartData: any = {
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
      },
      grid3D: {
        viewControl: {
          projection: "perspective"
        }
      },
      xAxis3D: {
        scale: true,
        nameLocation: "middle"
      },
      yAxis3D: {
        scale: true,
        nameLocation: "middle"
      },
      zAxis3D: {
        scale: true,
        nameLocation: "middle"
      },
      tooltip: {},
      series: [{
        data: [],
        symbolSize: 2.5,
        encode: {
            tooltip: [0, 1, 2]
        },
        tooltip: {
          formatter: (params: any) => params.value[3]
        },
        type: "scatter3D"
      }],
      dataset: {}
    };

  public mounted() {
    this.updateChartData();
  }

  public unmounted() {
    const chart: any = this.$refs.chart;
    chart.dispose();
  }

  public switchPerspective() {
    if (this.chartData.grid3D.viewControl.projection === "perspective") {
      this.chartData.grid3D.viewControl.projection = "orthographic";
    } else {
      this.chartData.grid3D.viewControl.projection = "perspective";
    }
  }

  @Watch("data")
  public updateChartData() {
    if (!this.data) { return; }
    const data: Scatter3DChartData = this.data;

    if (this.chartData.xAxis3D.name !== data.attributes[0].friendlyName) {
      this.chartData.xAxis3D.min = data.attributes[0].scaleMin;
      this.chartData.xAxis3D.max = data.attributes[0].scaleMax;
      this.chartData.xAxis3D.name = data.attributes[0].friendlyName;
      this.chartData.series[0].encode.x = data.attributes[0].friendlyName;
    }

    if (this.chartData.yAxis3D.name !== data.attributes[1].friendlyName) {
      this.chartData.yAxis3D.min = data.attributes[1].scaleMin;
      this.chartData.yAxis3D.max = data.attributes[1].scaleMax;
      this.chartData.yAxis3D.name = data.attributes[1].friendlyName;
      this.chartData.series[0].encode.y = data.attributes[1].friendlyName;
    }

    if (this.chartData.zAxis3D.name !== data.attributes[2].friendlyName) {
      this.chartData.zAxis3D.min = data.attributes[2].scaleMin;
      this.chartData.zAxis3D.max = data.attributes[2].scaleMax;
      this.chartData.zAxis3D.name = data.attributes[2].friendlyName;
      this.chartData.series[0].encode.z = data.attributes[2].friendlyName;
    }

    this.chartData.dataset.dimensions = [data.attributes[0].key, data.attributes[1].key, data.attributes[2].key];
    this.chartData.series[0].data = data.values;

    this.chartData.dataset.source = data.values;
  }
}
</script>
