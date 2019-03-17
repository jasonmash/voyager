<template>
  <div>
    <b-dropdown right class="float-right chart-dd" size="sm" variant="outline-secondary">
      <b-dropdown-header>Projection</b-dropdown-header>
      <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'perspective'" @click="switchPerspective('perspective')">Perspective</b-dropdown-item>
      <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'orthographic'" @click="switchPerspective('orthographic')">Orthographic</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="exportChart">Export (.png)</b-dropdown-item>
    </b-dropdown>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas', pixelRatio: 2}" autoresize class="chart" ref="chart" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { Attribute } from "@/models/Attribute";
import { ChartType, ChartData } from "@/models/chart-data";

import { ExportCanvas } from "./shared";

import "./charts.css";

@Component
export default class Scatter3DChart extends Vue {
  // ChartData object, with all info required to render chart
  @Prop(Object) public readonly data!: ChartData;

  // Flag indicating if chart is currently updating, used for limiting update rate
  public isUpdating = false;

  // Chart data in echarts object format
  public chartData: any = {
    animation: false,
    textStyle: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    },
    grid3D: {
      viewControl: {
        projection: "perspective"
      },
      right: 50
    },
    xAxis3D: {
      scale: true,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 12
      }
    },
    yAxis3D: {
      scale: true,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 12
      }
    },
    zAxis3D: {
      scale: true,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 12
      }
    },
    tooltip: {},
    series: [{
      data: [],
      symbol: "circle",
      maxSize: 30,
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

  /**
   * Load chart data when mounted in UI
   */
  public mounted() {
    this.updateChartData();
  }

  /**
   * Dispose of chart object if this component is removed
   */
  public beforeDestroy() {
    const chart: any = this.$refs.chart;
    chart.dispose();
  }

  /**
   * Switch perspective of 3D chart (orthographic, perspective)
   */
  public switchPerspective(perspective: string) {
    this.chartData.grid3D.viewControl.projection = perspective;
  }

  /**
   * Watch for changes to the input data
   */
  @Watch("data")
  public onDataUpdate() {
    if (this.isUpdating) { return; }
    this.isUpdating = true;

    // Update after 50ms to reduce number of expensive ui redraws
    setTimeout(() => {
      this.updateChartData();
      this.isUpdating = false;
    }, 50);
  }

  /**
   * Refreshes chart data, performs all necessary calculations
   */
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

    const visualMaps = [];

    // Detect if additional dimensions need to be represented
    // Load visual maps if necessary (colour/size scales)
    if (data.attributes.length > 3 && !!data.attributes[3]) {
      const sizeMap = {
        top: "5%",
        right: "20",
        dimension: 3,
        min: data.attributes[3].scaleMin,
        max: data.attributes[3].scaleMax,
        realtime: false,
        itemWidth: 30,
        itemHeight: 120,
        calculable: true,
        precision: data.attributes[3].step,
        text: [data.attributes[3].friendlyName],
        textGap: 30,
        textStyle: { color: "#000" },
        inRange: { symbolSize: [5, 30] },
        outOfRange: { symbolSize: [5, 30] },
        controller: {
          inRange: { color: ["#c23531"] },
          outOfRange: { color: ["#444"] }
        }
      };
      visualMaps.push(sizeMap);
    } else {
      this.chartData.series[0].symbolSize = 4;
    }
    this.chartData.series[0].symbol = "circle";

    if (data.attributes.length > 4 && !!data.attributes[4]) {
      const colourMap = {
        top: "50%",
        right: "20",
        dimension: 4,
        min: data.attributes[4].scaleMin,
        max: data.attributes[4].scaleMax,
        realtime: true,
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
            color: data.attributes[4].isHigherBetter ?
              ["#dc3545", "#ffc107", "#28a745"] : ["#28a745", "#ffc107", "#dc3545"]
          },
          outOfRange: { color: ["#ccc"] }
        }
      };
      visualMaps.push(colourMap);
    }


    // Update data
    this.chartData.dataset.dimensions = data.attributes.map((a: Attribute) => { if (!!a) { return a.key; } });
    this.chartData.series[0].data = data.values;

    this.chartData.visualMap = visualMaps.length > 0 ? visualMaps : undefined;

    this.chartData.dataset.source = data.values;
  }


  /**
   * Downloads the chart as a png file
   */
  public exportChart() {
    ExportCanvas(this.$refs.chart, "Chart.png");
  }
}
</script>
