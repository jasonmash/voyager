<template>
  <div>
    <b-dropdown right class="float-right chart-dd" size="sm" variant="outline-secondary">
      <b-dropdown-header>Projection</b-dropdown-header>
      <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'perspective'" @click="switchPerspective('perspective')">Perspective</b-dropdown-item>
      <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'orthographic'" @click="switchPerspective('orthographic')">Orthographic</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="exportChart">Export (.png)</b-dropdown-item>
    </b-dropdown>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="chart" ref="chart" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { Attribute } from "@/models/Attribute";
import { ChartType, ChartData } from "@/models/chart-data";

import { Optimality } from "@/utils/optimality";

import { ExportCanvas } from "./shared";

import "./charts.css";

@Component
export default class SurfaceChart extends Vue {
  // ChartData object, with all info required to render chart
  @Prop(Object) public readonly data!: ChartData;

  // Flag indicating if chart is currently updating, used for limiting update rate
  public isUpdating = false;

  // Chart data in echarts object format
  public chartData: any = {
    animation: false,
    textStyle: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      fontSize: 12
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
    visualMap: {
      show: false,
      dimension: 2,
      inRange: {
        color: ["#313695", "#4575b4", "#74add1", "#abd9e9",
          "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43",
          "#d73027", "#a50026"]
      }
    },
    tooltip: {
      show: false,
      trigger: "none"
    },
    series: [{
      wireframe: {
        show: true
      },
      shading: "color",
      type: "surface",
      equation: {
        x: {
          step: 1,
          min: 0,
          max: 1
        },
        y: {
          step: 1,
          min: 0,
          max: 1
        },
        z: (x: number, y: number) => {
          return;
        }
      }
    }]
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

    // Update after 200ms to reduce number of expensive ui redraws
    setTimeout(() => {
      this.updateChartData();
      this.isUpdating = false;
    }, 200);
  }

  /**
   * Refreshes chart data, performs all necessary calculations
   */
  public updateChartData() {
    if (!this.data) { return; }
    const data: any = this.data;

    if (this.chartData.xAxis3D.name !== data.attributes[0].friendlyName) {
      this.chartData.xAxis3D.min = data.attributes[0].scaleMin;
      this.chartData.xAxis3D.max = data.attributes[0].scaleMax;
      this.chartData.xAxis3D.name = data.attributes[0].friendlyName;
    }

    if (this.chartData.yAxis3D.name !== data.attributes[1].friendlyName) {
      this.chartData.yAxis3D.min = data.attributes[1].scaleMin;
      this.chartData.yAxis3D.max = data.attributes[1].scaleMax;
      this.chartData.yAxis3D.name = data.attributes[1].friendlyName;
    }

    if (this.chartData.zAxis3D.name !== data.attributes[2].friendlyName) {
      this.chartData.zAxis3D.min = data.attributes[2].scaleMin;
      this.chartData.zAxis3D.max = data.attributes[2].scaleMax;
      this.chartData.zAxis3D.name = data.attributes[2].friendlyName;

      this.chartData.visualMap.min = data.attributes[2].scaleMin;
      this.chartData.visualMap.max = data.attributes[2].scaleMax;
    }

    // Step through x and y, and calculate z value
    this.chartData.series[0].equation = {
      x: {
        step: (data.attributes[0].scaleMax - data.attributes[0].scaleMin) / 20,
        min: data.attributes[0].scaleMin,
        max: data.attributes[0].scaleMax
      },
      y: {
        step: (data.attributes[1].scaleMax - data.attributes[1].scaleMin) / 20,
        min: data.attributes[1].scaleMin,
        max: data.attributes[1].scaleMax
      },
      z: (x: number, y: number) => {
        // Get z value for point
        return Optimality.getAttrValAtPoint([{
          attribute: data.attributes[0],
          value: x
        }, {
          attribute: data.attributes[1],
          value: y
        }], data.configs, data.attributes[2]);
      },
      tooltip: { show: false }
    };
  }

  /**
   * Downloads the chart as a png file
   */
  public exportChart() {
    ExportCanvas(this.$refs.chart, "Chart.png");
  }
}
</script>
