<template>
  <b-card no-body>
    <div slot="header" class="chart-header">
      <b-dropdown right class="float-right" size="sm" variant="outline-secondary">
        <b-dropdown-item :active="useWorstCase" @click="useWorstCase = !useWorstCase">Use worst case</b-dropdown-item>
        <b-dropdown-header>Projection</b-dropdown-header>
        <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'perspective'" @click="switchPerspective('perspective')">Perspective</b-dropdown-item>
        <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'orthographic'" @click="switchPerspective('orthographic')">Orthographic</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item @click="exportChart">Export (.png)</b-dropdown-item>
      </b-dropdown>
      <span v-if="title">{{title}}</span>
      <span v-else>Surface Chart</span>
    </div>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="surface-chart" ref="chart" />
  </b-card>
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
  @Prop(Object) public readonly data!: ChartData;
  @Prop(String) public readonly title!: string | undefined;

  public isUpdating = false;
  public useWorstCase = false;

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

  public mounted() {
    this.updateChartData();
  }

  public beforeDestroy() {
    const chart: any = this.$refs.chart;
    chart.dispose();
  }

  public switchPerspective(perspective: string) {
    this.chartData.grid3D.viewControl.projection = perspective;
  }

  @Watch("data")
  public onDataUpdate() {
    if (this.isUpdating) { return; }
    this.isUpdating = true;

    setTimeout(() => {
      this.updateChartData();
      this.isUpdating = false;
    }, 200);
  }

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

  public exportChart() {
    ExportCanvas(this.$refs.chart, "Chart.png");
  }
}
</script>
