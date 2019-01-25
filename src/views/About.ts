import { Component, Prop, Vue } from "vue-property-decorator";
import * as Plotly from "plotly.js-dist";

@Component
export default class About extends Vue {
  private plot: any;

  public mounted() {
    const points = [
      [8.83, 8.89, 8.81, 8.87, 8.9, 8.87],
      [8.89, 8.94, 8.85, 8.94, 8.96, 8.92],
      [8.84, 8.9, 8.82, 8.92, 8.93, 8.91],
      [8.79, 8.85, 8.79, 8.9, 8.94, 8.92],
      [8.79, 8.88, 8.81, 8.9, 8.95, 8.92],
      [8.8, 8.82, 8.78, 8.91, 8.94, 8.92],
      [8.75, 8.78, 8.77, 8.91, 8.95, 8.92],
      [8.8, 8.8, 8.77, 8.91, 8.95, 8.94],
      [8.74, 8.81, 8.76, 8.93, 8.98, 8.99],
      [8.89, 8.99, 8.92, 9.1, 9.13, 9.11],
      [8.97, 8.97, 8.91, 9.09, 9.11, 9.11],
      [9.04, 9.08, 9.05, 9.25, 9.28, 9.27],
      [9, 9.01, 9, 9.2, 9.23, 9.2],
      [8.99, 8.99, 8.98, 9.18, 9.2, 9.19],
      [8.93, 8.97, 8.97, 9.18, 9.2, 9.18]
    ];

    const data = {z: points, type: "surface", showscale: false };

    Plotly.newPlot("plot", [data], {
        showlegend: false,
        margin: { t: 0, l: 0, r: 0, b: 0 },
        font: {
          family: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif",
          size: 14
        }
      }, {
        displayModeBar: false,
        responsive: true
    });
  }

  public downloadGraph(x: number, y: number, format: string) {
    Plotly.downloadImage("plot", {
      format,
      height: y,
      width: x,
      filename: "plot"
    });
  }
}
