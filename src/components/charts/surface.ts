import { Prop, Component, Vue, Watch } from "vue-property-decorator";

import { ChartType, ChartData } from "@/models/chart-data";
import { Section } from "@/models/report";
import { Optimality } from "@/utils/optimality";

import ReportDropdown from "../ReportDropdown.vue";
import { ExportCanvas } from "./shared";
import { GetTooltipContent } from "./tooltip";

import "./charts.css";

@Component({
  components: {
    ReportDropdown
  }
})
export default class SurfaceChart extends Vue {
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
      show: true,
      backgroundColor: "rgba(255,255,255,0.8)",
      borderColor: "#ddd",
      borderWidth: 1,
      textStyle: {
        color: "#000"
      },
      padding: 8,
      extraCssText: "width: 300px;overflow-y: hidden;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)",
      position: (pos: any, params: any, dom: any, rect: any, size: any) => {
        const obj: any = {top: 30};
        obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
      triggerOn: "click",
      formatter: (data: any) => {
        return GetTooltipContent(this.$store, data.name);
      }
    },
    series: [{
      wireframe: {
        show: true
      },
      shading: "color",
      type: "surface",
      data: []
    }]
  };

  public configAtPoint: string[] = [];
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


    const xOpts = {
      step: (data.attributes[0].scaleMax - data.attributes[0].scaleMin) / 20,
      min: data.attributes[0].scaleMin,
      max: data.attributes[0].scaleMax
    };
    const yOpts = {
      step: (data.attributes[1].scaleMax - data.attributes[1].scaleMin) / 20,
      min: data.attributes[1].scaleMin,
      max: data.attributes[1].scaleMax
    };
    const xCount = Math.floor((xOpts.max + xOpts.step - xOpts.min) / xOpts.step);
    const yCount = Math.floor((yOpts.max + yOpts.step - yOpts.min) / yOpts.step);
    const points = [];

    const getPrecisionSafe = (val: number) => {
      const str = val.toString(); // Consider scientific notation: '3.4e-12' '3.4e+12'
      const eIndex = str.indexOf("e");
      if (eIndex > 0) {
        const precision = +str.slice(eIndex + 1);
        return precision < 0 ? -precision : 0;
      } else {
        const dotIndex = str.indexOf(".");
        return dotIndex < 0 ? 0 : str.length - 1 - dotIndex;
      }
    };

    const getPrecision = (opts: any) => {
      return Math.max(getPrecisionSafe(opts.min), getPrecisionSafe(opts.max), getPrecisionSafe(opts.step)) + 1;
    };

    const roundToPrecision = (x: any, precision: number) => {
      if (precision == null) { precision = 10; }
      precision = Math.min(Math.max(0, precision), 20);
      x = (+x).toFixed(precision);
      return +x;
    };

    const xPrecision = getPrecision(xOpts);
    const yPrecision = getPrecision(yOpts);

    const getConfig = (x: number, y: number) => {
      // Get z value for point
      const z = Optimality.getAttrValAtPoint([{
        attribute: data.attributes[0],
        value: x
      }, {
        attribute: data.attributes[1],
        value: y
      }], data.configs, data.attributes[2]);
      return z ? z : undefined;
    };

    let off = 0;
    this.configAtPoint = [];
    for (let j = 0; j < yCount; j++) {
      for (let i = 0; i < xCount; i++) {
        const x = i * xOpts.step + xOpts.min;
        const y = j * yOpts.step + yOpts.min;
        const x2 = roundToPrecision(Math.min(x, xOpts.max), xPrecision);
        const y2 = roundToPrecision(Math.min(y, yOpts.max), yPrecision);
        const config = getConfig(x2, y2);
        points[off++] = {
          name: config,
          value: [x2, y2, config ? config.attributes[data.attributes[2].key] : NaN]
        };
      }
    }

    this.chartData.series[0].data = points;
  }

  /**
   * Downloads the chart as a png file
   */
  public exportChart() {
    ExportCanvas(this.$refs.chart, "Chart.png");
  }

  /**
   * Add current chart to report with given ID with provided section title
   */
  public addToReport(title: string, reportId: number) {
    const section: Section = {
      title,
      type: ChartType.Surface,
      data: this.data
    };
    this.$store.commit("addReportSection", { id: reportId, section});
  }
}
