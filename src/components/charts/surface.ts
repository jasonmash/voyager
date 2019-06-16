import echarts from "echarts";
import { Prop, Component, Vue, Watch } from "vue-property-decorator";

import { Attribute } from "@/models/attribute";
import { ChartType, ChartData } from "@/models/chart-data";
import { ConfigurationStructure } from "@/models/configuration";
import { Section } from "@/models/report";
import { Optimality } from "@/utils/optimality";

import ReportDropdown from "../ReportDropdown.vue";
import { ExportCanvas } from "./shared";

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
      extraCssText: "max-width: 180px;overflow-y: hidden;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)",
      borderColor: "#ddd",
      borderWidth: 1,
      textStyle: {
        color: "#000"
      },
      padding: 8,
      position: ["70%", "10%"],
      triggerOn: "click",
      formatter: (data: any) => {
        let attrHtml = "";
        this.$store.getters.attributes.forEach((a: Attribute) => {
          attrHtml = `${attrHtml}<b>${a.friendlyName}</b>:<br>${data.name.attributes[a.key]}<br>`;
        });
        if (data.name.structure && data.name.structure.components.length > 0) {
          setTimeout(() => {
            const structureChart = echarts.init(document.getElementById("tooltip-canvas"));
            structureChart.setOption(this.getStructureChartData(data.name.structure));
          });
          return `<h5 class="mb-1">${data.name.id}</h5>${attrHtml}` +
           `<div id="tooltip-canvas" style="width: 150px; height:150px"></div>`;
        }
        return `<h5 class="mb-1">${data.name.id}</h5>${attrHtml}`;
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

    const getPrecision = (opts: any) => Math.max(
      getPrecisionSafe(opts.min), getPrecisionSafe(opts.max), getPrecisionSafe(opts.step)) + 1;

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

  /**
   * Getter for chartData object in echarts format
   */
  public getStructureChartData(structure: ConfigurationStructure) {

    const data = structure.components.map((c) => {
      return { name: c, x: 300, y: 300 };
    });

    const links = structure.connections.map((c) => {
      return { target: c.from, source: c.to, label: { formatter: c.label, show: false, fontSize: 10 } };
    });

    return {
      tooltip: {},
      series: [
        {
          type: "graph",
          layout: "force",
          symbolSize: 20,
          symbol: "circle",
          animation: false,
          focusNodeAdjacency: true,
          draggable: true,
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',sans-serif"
              }
            }
          },
          force: {
            initLayout: "force",
            edgeLength: 0.25,
            gravity: 0.9,
            repulsion: 0.3,
            layoutAnimation: false
          },
          edgeSymbol: ["arrow"],
          edgeSymbolSize: 9,
          data,
          links,
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 2,
              curveness: 0.2
            }
          }
        }
      ]
    };
  }
}
