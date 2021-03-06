<template>
  <b-row class="pt-3">
    <b-col>
      <div class="float-right pb-2">
        <b-form-checkbox v-model="showOptimalOnly" switch class="d-inline-block mr-3">
          Optimal configurations only
        </b-form-checkbox>
        <b-form-checkbox v-model="showDifferencesOnly" switch class="d-inline-block">
          Structural differences only
        </b-form-checkbox>
      </div>
      <b-table :items="chartData.items" small :fields="chartData.fields" responsive>
        <template v-slot:cell()="data">
          <i v-if="data.value === true" class="fa fa-fw fa-check text-success"></i>
          <span v-else-if="data.value !== false">{{data.value}}</span>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Attribute } from "@/models/attribute";
import { Section } from "@/models/report";
import { Configuration } from "@/models/configuration";
import { ChartType, ChartData } from "@/models/chart-data";

import "./charts.css";

/**
 * Radar chart, renders properties for a given list of configurations
 */
@Component
export default class ConfigComparison extends Vue {
  // ChartData object, with all info required to render chart
  @Prop(Object) public readonly data!: { true: Configuration[], false: Configuration[] };

  public showDifferencesOnly: boolean = false;
  public showOptimalOnly: boolean = false;

  /**
   * List of attributes from store, used for chart labels
   */
  get attributes(): Attribute[] {
    return this.$store.getters.attributes;
  }


  /**
   * Getter for chartData object in echarts format
   */
  get chartData() {
    let configurations = this.data.true;
    if (!this.showOptimalOnly) {
      configurations = configurations.concat(this.data.false);
    }
    configurations = configurations.filter((c) => !!c);

    let allComponents: string[] = [];
    const allAttributes: Attribute[] = this.attributes
      .filter((a) => a.isFiltered)
      .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));

    configurations.forEach((config: Configuration) => {
      config.structure.components.forEach((c) => {
        if (!allComponents.includes(c)) { allComponents.push(c); }
      });
    });
    allComponents = allComponents.sort((a, b) => a.localeCompare(b));

    const res = configurations.map((config: Configuration) => {
      const r: any = {
        configuration: config.id
      };
      allComponents.map((c: string) => {
        r[c] = !!config.structure.components.includes(c);
      });
      allAttributes.forEach((attr) => {
        r[attr.key] = config.attributes[attr.key];
      });
      return r;
    });

    const fields: any[] = [
      { key: "configuration", sortable: true }
    ];
    allComponents.forEach((c: string) => {
      const anyTrue = res.find((r) => r[c] === true);
      const anyFalse = res.find((r) => r[c] === false);
      if (this.showDifferencesOnly && anyTrue && anyFalse) {
        fields.push({ key: c, sortable: true });
      } else if (!this.showDifferencesOnly) {
        fields.push({ key: c, sortable: true });
      }
    });
    allAttributes.forEach((c: Attribute) => fields.push({
      key: c.key,
      label: c.friendlyName,
      sortable: true,
      tdClass: "text-right number-text"
    }));

    return {
      fields,
      items: res
    };
  }
}
</script>
