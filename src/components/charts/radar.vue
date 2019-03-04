<template>
  <div>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="radar-chart" />
  </div>
</template>

<style scoped>
  .radar-chart {
    width:auto;
    height: 400px;
  }
</style>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Report, Section } from "@/models/report";
import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

@Component
export default class RadarChart extends Vue {
  @Prop(Array) public readonly data!: Configuration[];

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
}
</script>
