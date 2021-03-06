<template>
  <div>
    <b-dropdown right class="float-right chart-dd" size="sm" variant="outline-secondary">
      <b-dropdown-item @click="exportChart">Export (.svg)</b-dropdown-item>
      <b-dropdown-divider />
      <report-dropdown :section-index="this.sectionIndex" @addToReport="addToReport"/>
    </b-dropdown>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="chart" ref="chart" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from "vue-property-decorator";
import { Attribute } from "@/models/attribute";
import { Section } from "@/models/report";
import { ChartType, ChartData } from "@/models/chart-data";

import ReportDropdown from "../ReportDropdown.vue";

import { ExportSvg } from "./shared";
import { GetTooltipContent } from "./tooltip";

import "./charts.css";

@Component({
  components: {
    ReportDropdown
  }
})
export default class ScatterChart extends Vue {
  // ChartData object, with all info required to render chart
  @Prop(Object) public readonly data!: ChartData;

  // Index of section if chart exists within a report (optional)
  @Prop(Number) public readonly sectionIndex?: number;

  // Flag indicating if chart is currently updating, used for limiting update rate
  public isUpdating = false;

  // Chart data in echarts object format
  public chartData: any = {
    animation: false,
    textStyle: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      fontSize: 12
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
      triggerOn: "click"
    },
    series: [{
      data: [],
      type: "scatter",
      symbolSize: 4,
      showAllSymbol: true,
      tooltip: {
        show: true,
        backgroundColor: "rgba(255,255,255,0.8)",
        extraCssText: "width: 300px;overflow-y: hidden;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)",
        position: (pos: any, params: any, dom: any, rect: any, size: any) => {
          const obj: any = {top: 30};
          obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        },
        borderColor: "#ddd",
        borderWidth: 1,
        textStyle: {
          color: "#000"
        },
        padding: 8,
        triggerOn: "click",
        formatter: (params: any) => {
          return GetTooltipContent(this.$store, params.data[params.data.length - 1]);
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

    let sizeAttribute: Attribute | undefined;
    let colourAttribute: Attribute | undefined;
    let normalisationFactor = 0;

    // Detect if additional dimensions need to be represented
    if (data.attributes.length > 2 && !!data.attributes[2]) {
      sizeAttribute = data.attributes[2];
      normalisationFactor = (sizeAttribute.maxValue - sizeAttribute.minValue);
    }
    if (data.attributes.length > 3 && !!data.attributes[3]) {
      colourAttribute = data.attributes[3];
    }


    // Load visual maps if necessary (colour/size scales)
    const visualMaps = [];
    if (sizeAttribute) {
      visualMaps.push({
        top: "5%",
        right: "0",
        dimension: 2,
        min: sizeAttribute.scaleMin,
        max: sizeAttribute.scaleMax,
        realtime: false,
        itemWidth: 30,
        itemHeight: 120,
        calculable: true,
        precision: sizeAttribute.step,
        text: [sizeAttribute.friendlyName],
        textGap: 30,
        textStyle: { color: "#000" },
        inRange: { symbolSize: [3, 25] },
        outOfRange: { symbolSize: [3, 25] },
        controller: {
          inRange: { color: ["#c23531"] },
          outOfRange: { color: ["#444"] }
        }
      });
    }

    if (colourAttribute) {
      visualMaps.push({
        right: "0",
        top: "50%",
        dimension: 3,
        min: colourAttribute.scaleMin,
        max: colourAttribute.scaleMax,
        itemHeight: 120,
        calculable: true,
        realtime: false,
        precision: colourAttribute.step,
        text: [colourAttribute.friendlyName],
        textGap: 30,
        textStyle: { color: "#000" },
        inRange: {
          color: colourAttribute.isHigherBetter ?
            ["#dc3545", "#ffc107", "#28a745"] : ["#28a745", "#ffc107", "#dc3545"]
        },
        outOfRange: { color: ["rgba(0,0,0,.2)"] },
        controller: {
          inRange: {
            color: colourAttribute.isHigherBetter ?
              ["#dc3545", "#ffc107", "#28a745"] : ["#28a745", "#ffc107", "#dc3545"]
          },
          outOfRange: { color: ["#ccc"] }
        }
      });
    }

    // Update layout
    this.chartData.grid.right = visualMaps.length > 0 ? 120 : 50;
    this.chartData.visualMap = visualMaps.length > 0 ? visualMaps : undefined;

    // Update data
    this.chartData.series[0].data = data.values;
  }

  /**
   * Downloads the chart as a svg file
   */
  public exportChart() {
    ExportSvg(this.$refs.chart, "Chart.svg");
  }

  /**
   * Add current chart to report with given ID with provided section title
   */
  public addToReport(title: string, reportId: number) {
    const section: Section = {
      title,
      type: ChartType.Scatter2D,
      data: this.data
    };
    this.$store.commit("addReportSection", { id: reportId, section});
  }
}
</script>
