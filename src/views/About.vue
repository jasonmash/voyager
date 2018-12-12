<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b-row>
      <b-col>
        <b-card no-body="true" style="min-height: 450px">
          <div id="plot"></div>
        </b-card>
      </b-col>
      <b-col>

      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as Plotly from "plotly.js-dist";

@Component
export default class About extends Vue {
  mounted() {
    const z1 = [
        [8.83,8.89,8.81,8.87,8.9,8.87],
        [8.89,8.94,8.85,8.94,8.96,8.92],
        [8.84,8.9,8.82,8.92,8.93,8.91],
        [8.79,8.85,8.79,8.9,8.94,8.92],
        [8.79,8.88,8.81,8.9,8.95,8.92],
        [8.8,8.82,8.78,8.91,8.94,8.92],
        [8.75,8.78,8.77,8.91,8.95,8.92],
        [8.8,8.8,8.77,8.91,8.95,8.94],
        [8.74,8.81,8.76,8.93,8.98,8.99],
        [8.89,8.99,8.92,9.1,9.13,9.11],
        [8.97,8.97,8.91,9.09,9.11,9.11],
        [9.04,9.08,9.05,9.25,9.28,9.27],
        [9,9.01,9,9.2,9.23,9.2],
        [8.99,8.99,8.98,9.18,9.2,9.19],
        [8.93,8.97,8.97,9.18,9.2,9.18]
    ];

    var data_z3 = {z: z1, type: 'surface'};

    Plotly.newPlot('plot', [data_z3], { showlegend: false, margin: {t:0, l:0, r:0, b:0} }, {displayModeBar: false, responsive: true});
  }
}

</script>
