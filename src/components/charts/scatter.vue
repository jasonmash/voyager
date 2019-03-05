<template>
  <div>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="scatter-chart" />
  </div>
</template>

<style scoped>
  .scatter-chart {
    width:auto;
    height: 400px;
  }
</style>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { Attribute } from "@/models/Attribute";
import { ChartType, ChartData } from "@/models/chart-data";

@Component
export default class ScatterChart extends Vue {
  @Prop(Object) public readonly data!: ChartData;

  get chartData() {
    if (!this.data) { return; }
    const data: ChartData = this.data;

    let sizeAttribute: Attribute | undefined;
    let colourAttribute: Attribute | undefined;
    let normalisationFactor = 0;

    if (data.attributes.length > 2) {
      sizeAttribute = data.attributes[2];
      normalisationFactor = (sizeAttribute.maxValue - sizeAttribute.minValue);
    }
    if (data.attributes.length > 3) {
      colourAttribute = data.attributes[3];
    }

    let colourMap;
    if (colourAttribute) {
      colourMap = {
        left: "right",
        bottom: "20%",
        dimension: 3,
        min: colourAttribute.scaleMin,
        max: colourAttribute.scaleMax,
        itemHeight: 120,
        calculable: true,
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
      };
    }

    const chartData = {
      animation: false,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
      },
      xAxis: {
        type: "value",
        min: data.attributes[0].scaleMin,
        max: data.attributes[0].scaleMax,
        name: data.attributes[0].friendlyName,
        nameLocation: "middle"
      },
      yAxis: {
        type: "value",
        min: data.attributes[1].scaleMin,
        max: data.attributes[1].scaleMax,
        name: data.attributes[1].friendlyName,
        nameLocation: "middle"
      },
      visualMap: colourMap ? [ colourMap ] : undefined,
      tooltip: {},
      series: [{
        data: data.values,
        type: "scatter",
        showAllSymbol: true,
        symbolSize: (value: any) => {
          if (!sizeAttribute) { return 5; }
          return 3 + 15 * ((value[2] - sizeAttribute.minValue) / normalisationFactor);
        },
        tooltip: {
          formatter: (params: any) => params.value[params.value.length - 1]
        }
      }]
    };
    return chartData;
  }
}
</script>
