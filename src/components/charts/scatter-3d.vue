<template>
  <b-card no-body>
    <div slot="header" class="chart-header">
      <b-dropdown right class="float-right" size="sm" variant="outline-secondary">
        <b-dropdown-header>Projection</b-dropdown-header>
        <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'perspective'" @click="switchPerspective('perspective')">Perspective</b-dropdown-item>
        <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'orthographic'" @click="switchPerspective('orthographic')">Orthographic</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item @click="exportChart">Export (.png)</b-dropdown-item>
      </b-dropdown>
      <span v-if="title">{{title}}</span>
      <span v-else>3D Scatter Chart</span>
    </div>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas', pixelRatio: 2}" autoresize class="scatter3d-chart" ref="chart" />
  </b-card>
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
  @Prop(Object) public readonly data!: ChartData;
  @Prop(String) public readonly title!: string | undefined;

  public isUpdating = false;

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
    }, 100);
  }

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


    this.chartData.dataset.dimensions = data.attributes.map((a: Attribute) => { if (!!a) { return a.key; } });
    this.chartData.series[0].data = data.values;

    this.chartData.visualMap = visualMaps.length > 0 ? visualMaps : undefined;

    this.chartData.dataset.source = data.values;
  }

  public exportChart() {
    ExportCanvas(this.$refs.chart, "Chart.png");
  }
}
</script>
