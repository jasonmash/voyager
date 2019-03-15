<template>
  <b-card no-body>
    <div slot="header" class="chart-header">
      <b-dropdown right class="float-right" size="sm" variant="outline-secondary">
        <b-dropdown-item @click="exportChart">Export (.svg)</b-dropdown-item>
      </b-dropdown>
      <span v-if="title">{{title}}</span>
      <span v-else>Scatter Chart</span>
    </div>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="scatter-chart" ref="chart" />
  </b-card>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { Attribute } from "@/models/Attribute";
import { ChartType, ChartData } from "@/models/chart-data";

import { ExportSvg } from "./shared";

import "./charts.css";

@Component
export default class ScatterChart extends Vue {
  @Prop(Object) public readonly data!: ChartData;
  @Prop(String) public readonly title!: string | undefined;

  get chartData() {
    if (!this.data) { return; }
    const data: ChartData = this.data;

    let sizeAttribute: Attribute | undefined;
    let colourAttribute: Attribute | undefined;
    let normalisationFactor = 0;

    if (data.attributes.length > 2 && !!data.attributes[2]) {
      sizeAttribute = data.attributes[2];
      normalisationFactor = (sizeAttribute.maxValue - sizeAttribute.minValue);
    }
    if (data.attributes.length > 3 && !!data.attributes[3]) {
      colourAttribute = data.attributes[3];
    }

    const visualMaps = [];
    if (sizeAttribute) {
      visualMaps.push({
        top: "5%",
        right: "15",
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
        right: "15",
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

    const chartData = {
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        fontSize: 12
      },
      grid: {
        top: 30,
        left: 70,
        right: visualMaps.length > 0 ? 100 : 50,
        bottom: 60
      },
      xAxis: {
        type: "value",
        min: data.attributes[0].scaleMin,
        max: data.attributes[0].scaleMax,
        name: data.attributes[0].friendlyName,
        nameLocation: "middle",
        nameGap: 35
      },
      yAxis: {
        type: "value",
        min: data.attributes[1].scaleMin,
        max: data.attributes[1].scaleMax,
        name: data.attributes[1].friendlyName,
        nameLocation: "middle",
        nameGap: 40
      },
      visualMap: visualMaps.length > 0 ? visualMaps : undefined,
      tooltip: {},
      series: [{
        data: data.values,
        type: "scatter",
        symbolSize: 4,
        showAllSymbol: true,
        tooltip: {
          formatter: (params: any) => params.value[params.value.length - 1]
        }
      }]
    };
    return chartData;
  }

  public exportChart() {
    ExportSvg(this.$refs.chart, "Chart.svg");
  }
}
</script>
