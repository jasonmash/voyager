<template>
  <div>
    <b-dropdown right class="float-right chart-dd" size="sm" variant="outline-secondary">
      <b-dropdown-item @click="exportChart">Export (.svg)</b-dropdown-item>
    </b-dropdown>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="chart" ref="chart" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { Attribute } from "@/models/Attribute";
import { ChartType, ChartData } from "@/models/chart-data";

import { Optimality } from "@/utils/optimality";

import { ExportSvg } from "./shared";

import "./charts.css";

interface Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
}

@Component
export default class MapChart extends Vue {
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
    grid: {
      top: 30,
      left: 70,
      bottom: 60
    },
    xAxis: {
      type: "value",
      nameLocation: "middle",
      nameGap: 35
    },
    yAxis: {
      type: "value",
      nameLocation: "middle",
      nameGap: 40
    },
    tooltip: {
      show: true
    },
    series: [{
      type: "custom",
      renderItem: this.renderItem,
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      data: []
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

  public renderItem(params: any, api: any) {
    const xStep = (this.data.attributes[0].scaleMax - this.data.attributes[0].scaleMin) / 20;
    const yStep = (this.data.attributes[1].scaleMax - this.data.attributes[1].scaleMin) / 20;

    const start = api.coord([api.value(0), api.value(1)]);
    const size = api.size([xStep, yStep]);
    const style = api.style();

    return {
      type: "rect",
      shape: {
        x: start[0],
        y: start[1] - size[1],
        width: size[0],
        height: size[1]
      },
      style
    };
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
    }, 200);
  }

  /**
   * Refreshes chart data, performs all necessary calculations
   */
  public updateChartData() {
    if (!this.data) { return; }
    const data: ChartData = this.data;

    // Update axis
    if (this.chartData.xAxis.name !== data.attributes[0].friendlyName) {
      this.chartData.xAxis.min = data.attributes[0].scaleMin;
      this.chartData.xAxis.max = data.attributes[0].scaleMax;
      this.chartData.xAxis.name = data.attributes[0].friendlyName;
    }

    if (this.chartData.yAxis.name !== data.attributes[1].friendlyName) {
      this.chartData.yAxis.min = data.attributes[1].scaleMin;
      this.chartData.yAxis.max = data.attributes[1].scaleMax;
      this.chartData.yAxis.name = data.attributes[1].friendlyName;
    }

    if (!data.configs) { return; }

    // Function for calculating data point colour scales
    const colours = [[220, 53, 69], [255, 193, 7], [124, 224, 147], [30, 60, 230]];
    const interpolateColor = (factor: number) => {
      if (factor < 0.33) {
        const result = colours[0].slice();
        for (let i = 0; i < 3; i++) {
          result[i] = Math.round(result[i] + (factor * 3) * (colours[1][i] - colours[0][i]));
        }
        return result;
      } else if (factor < 0.66) {
        const result = colours[1].slice();
        for (let i = 0; i < 3; i++) {
          result[i] = Math.round(result[i] + (factor * 1.5) * (colours[2][i] - colours[1][i]));
        }
        return result;
      } else {
        const result = colours[2].slice();
        for (let i = 0; i < 3; i++) {
          result[i] = Math.round(result[i] + ((factor - 0.66) * 3) * (colours[3][i] - colours[2][i]));
        }
        return result;
      }
    };

    // Calculate data points
    const shapes = [];
    const xAttr = data.attributes[0];
    const yAttr = data.attributes[1];

    const normalisationFactor = (data.attributes[2].maxValue - data.attributes[2].minValue);

    const xStep = (data.attributes[0].scaleMax - data.attributes[0].scaleMin) / 20;
    const yStep = (data.attributes[1].scaleMax - data.attributes[1].scaleMin) / 20;

    // Calculate data points
    for (let x = xAttr.scaleMin; x < xAttr.scaleMax; x += xStep) {
      for (let y = yAttr.scaleMin; y < yAttr.scaleMax; y += yStep) {
        const z = Optimality.getAttrValAtPoint([
          { attribute: xAttr, value: x },
          { attribute: yAttr, value: y }],
          data.configs, data.attributes[2]);

        if (z) {
          // Get data point colour in scale
          const intensity = ((z.attributes[data.attributes[2].key] - data.attributes[2].minValue)
            / normalisationFactor);
          const colour = interpolateColor(intensity);

          // Add point to list
          shapes.push({
            itemStyle: {
              normal: {
                color: `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`
              }
            },
            value: [x, y, z.attributes[data.attributes[2].key], z.id]
          });
        }
      }
    }

    // Update data
    this.chartData.series[0].data = shapes;
    this.chartData.series[0].dimensions = [
      data.attributes[0].friendlyName,
      data.attributes[1].friendlyName,
      data.attributes[2].friendlyName
    ];
  }

  /**
   * Downloads the chart as a png file
   */
  public exportChart() {
    ExportSvg(this.$refs.chart, "Chart.svg");
  }
}
</script>
