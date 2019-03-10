<template>
  <b-card no-body>
    <div slot="header" class="chart-header">
      <span v-if="title">{{title}}</span>
      <span v-else>Surface Chart</span>
    </div>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="surface-chart" ref="chart" />
  </b-card>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { Attribute } from "@/models/Attribute";
import { ChartType, ChartData } from "@/models/chart-data";

import { Optimality } from "@/utils/optimality";

import { ExportSvg } from "./shared";

import "./charts.css";

@Component
export default class SurfaceChart extends Vue {
  @Prop(Object) public readonly data!: ChartData;
  @Prop(String) public readonly title!: string | undefined;

  get chartData() {
    if (!this.data) { return; }
    const data: any = this.data;

    const chartData = {
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        fontSize: 12
      },
      grid3D: {
        viewControl: {
          projection: "orthographic"
        },
        right: 50
      },
      xAxis3D: {
        scale: true,
        min: data.attributes[0].scaleMin,
        max: data.attributes[0].scaleMax,
        name: data.attributes[0].friendlyName,
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 12
        }
      },
      yAxis3D: {
        scale: true,
        min: data.attributes[1].scaleMin,
        max: data.attributes[1].scaleMax,
        name: data.attributes[1].friendlyName,
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 12
        }
      },
      zAxis3D: {
        scale: true,
        min: data.attributes[2].scaleMin,
        max: data.attributes[2].scaleMax,
        name: data.attributes[2].friendlyName,
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 12
        }
      },
      visualMap: {
        show: false,
        dimension: 2,
        min: data.attributes[2].scaleMin,
        max: data.attributes[2].scaleMax,
        inRange: {
          color: ["#313695", "#4575b4", "#74add1", "#abd9e9",
            "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43",
            "#d73027", "#a50026"]
        }
      },
      tooltip: {},
      series: [{
        wireframe: {
          show: true
        },
        shading: "color",
        equation: {
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
            const config = Optimality.getOptimalConfigForPoint([{
              attribute: data.attributes[0],
              value: x
            }, {
              attribute: data.attributes[1],
              value: y
            }], data.configs);
            if (!config[0]) { return; }
            return config[0].attributes[data.attributes[2].key];
          }
        },
        type: "surface"
      }]
    };
    return chartData;
  }

}
</script>
