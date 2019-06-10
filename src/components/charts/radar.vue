<template>
  <div>
    <b-dropdown right class="float-right chart-dd" size="sm" variant="outline-secondary">
      <b-dropdown-item @click="exportChart">Export (.svg)</b-dropdown-item>
      <b-dropdown-divider />
      <report-dropdown :section-index="this.sectionIndex"/>
    </b-dropdown>
    <e-chart :options="chartData" :init-options="{renderer: 'svg'}" autoresize class="chart" ref="chart" :style="height ? 'height: ' + height + 'px' : ''"/>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

import ReportDropdown from "../ReportDropdown.vue";

import { ExportSvg } from "./shared";

import "./charts.css";

/**
 * Radar chart, renders properties for a given list of configurations
 */
@Component({
  components: {
    ReportDropdown
  }
})
export default class RadarChart extends Vue {
  // ChartData object, with all info required to render chart
  @Prop(Array) public readonly data!: Configuration[];

  // Height of the chart in pixels (optional)
  @Prop(String) public readonly height!: string | undefined;

  // Index of section if chart exists within a report (optional)
  @Prop(Number) public readonly sectionIndex?: number;

  /**
   * List of attributes from store, used for chart labels
   */
  get attributes() {
    return this.$store.getters.attributes;
  }

  /**
   * Getter for chartData object in echarts format
   */
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
      animation: false,
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

  /**
   * Downloads the chart as a svg file
   */
  public exportChart() {
    ExportSvg(this.$refs.chart, "Chart.svg");
  }
}
</script>
