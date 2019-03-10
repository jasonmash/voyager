<template>
  <b-card no-body>
    <div slot="header" class="chart-header">
      <b-button size="sm" class="float-right" variant="outline-secondary" @click="exportChart">Export</b-button>
      <span v-if="title">{{title}}</span>
      <span v-else>Radar Chart</span>
    </div>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="radar-chart" ref="chart"/>
  </b-card>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

import { ExportSvg } from "./shared";

import "./charts.css";

@Component
export default class RadarChart extends Vue {
  @Prop(Array) public readonly data!: Configuration[];
  @Prop(String) public readonly title!: string | undefined;

  get attributes() {
    return this.$store.getters.attributes;
  }

  get chartData() {
    const configuration = this.data;
    const series: any[] = [];

    this.data.forEach((c: Configuration) => {
      const data: any[] = [];
      this.attributes.forEach((a: Attribute) => {
        data.push(c.attributes[a.key]);
      });
      series.push({
        name: c.id,
        type: "radar",
        data: [{ value: data, name: c.id }]
      });
    });

    return {
      tooltip: {},
      animationDuration: 200,
      textStyle: {
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        color: "black"
      },
      legend: {
          data: series.map((s) => s.name),
          orient: "vertical",
          align: "left",
          left: "right"
      },
      radar: {
        indicator: this.attributes.map((a: Attribute) => {
          return { name: a.friendlyName, min: a.minValue, max: a.maxValue };
        })
      },
      series
    };
  }

  public exportChart() {
    ExportSvg(this.$refs.chart, "Chart.svg");
  }
}
</script>