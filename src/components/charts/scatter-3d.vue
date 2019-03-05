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
import { Attribute } from "@/models/Attribute";
import { ChartType, ChartData } from "@/models/chart-data";

@Component
export default class Scatter3DChart extends Vue {
  @Prop(Object) public readonly data!: ChartData;

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
        symbol: "circle",
        encode: {
          tooltip: []
        },
        tooltip: {
          formatter: (params: any) => params.value[params.value.length - 1]
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
    const data: ChartData = this.data;

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

    if (data.attributes.length > 3) {
      const normalisationFactor = (data.attributes[3].maxValue - data.attributes[3].minValue);
      this.chartData.series[0].symbolSize = (value: any) => {
        return 3 + 15 * ((value[3] - data.attributes[3].minValue) / normalisationFactor);
      };
    } else {
      this.chartData.series[0].symbolSize = 4;
    }
    this.chartData.series[0].symbol = "circle";

    if (data.attributes.length > 4) {
      const colourMap = {
        left: "right",
        bottom: "20%",
        dimension: 4,
        min: data.attributes[4].scaleMin,
        max: data.attributes[4].scaleMax,
        itemHeight: 120,
        calculable: true,
        precision: data.attributes[4].step,
        text: [data.attributes[4].friendlyName],
        textGap: 30,
        textStyle: { color: "#000" },
        inRange: {
          color: data.attributes[4].isHigherBetter ?
            ["#dc3545", "#ffc107", "#28a745"] : ["#28a745", "#ffc107", "#dc3545"]
        },
        outOfRange: { color: ["rgba(0,0,0,.2)"] },
        controller: {
          inRange: {
            color: data.attributes[3].isHigherBetter ?
              ["#dc3545", "#ffc107", "#28a745"] : ["#28a745", "#ffc107", "#dc3545"]
          },
          outOfRange: { color: ["#ccc"] }
        }
      };
      this.chartData.visualMap = [colourMap];
    } else {
      this.chartData.visualMap = undefined;
    }

    this.chartData.dataset.dimensions = data.attributes.map((a: Attribute) => a.key);
    this.chartData.series[0].data = data.values;

    this.chartData.dataset.source = data.values;
  }
}
</script>
