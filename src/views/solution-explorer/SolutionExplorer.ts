import { Component, Vue } from "vue-property-decorator";

import _ from "lodash";
import draggable from "vuedraggable";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";
import { Report } from "@/models/report";

import { Optimality } from "@/utils/optimality";

import LineChart from "@/components/charts/line.vue";
import RadarChart from "@/components/charts/radar.vue";
import ScatterChart from "@/components/charts/scatter.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";
import SurfaceChart from "@/components/charts/surface.vue";

import AttributeBox, { AttributeFilter } from "./components/Attribute";
import ConfigurationBox from "./components/Configuration";
import ConfigurationList from "./components/ConfigurationList";
import Toolbar from "./components/Toolbar";

@Component({
  components: {
    "configuration": ConfigurationBox,
    "attribute": AttributeBox,
    ConfigurationList,
    Toolbar,
    "scatter3d-chart": Scatter3DChart,
    LineChart,
    RadarChart,
    ScatterChart,
    SurfaceChart,
    draggable
  }
})
export default class SolutionExplorerComponent extends Vue {
  public drag: boolean = false;
  public filters: AttributeFilter[] = [];
  public chartDimensions: number = 0;
  public selectedConfiguration: Configuration | null = null;
  public newReportName: string = "";
  public paretoFront: string[] = [];
  public searchQuery: string = "";

  public files: File[] | null = null;

  public filteredConfigurations: Configuration[] = [];

  public created() {
    this.loadFilters();
  }

  get totalCount() {
    return this.$store.getters.configurations.length;
  }

  get configurations() {
    return this.$store.getters.configurations;
  }

  public loadFilters() {
    this.selectedConfiguration = null;
    this.filters = this.$store.getters.attributes.map((a: Attribute) => {
      return { attribute: a, minValue: a.scaleMin, maxValue: a.scaleMax, isFiltered: false };
    });
    this.sortFilters();
  }

  get list() {
    const data: Configuration[] = this.$store.getters.configurations;
    this.sortFilters();

    const filters = _.clone(this.filters);
    _.reverse(filters);

    const attributes = _.filter(this.filters, "isFiltered").map((config) => config.attribute);

    // Filter list based on set parameters
    let result: Configuration[] = data.filter((item) => {
      let validAttributes = true;
      filters.forEach((filter) => {
        if (filter.isFiltered) {
          const val = item.attributes[filter.attribute.key];
          if (val && (val > filter.maxValue || val < filter.minValue)) { validAttributes = false; }
        }
      });
      return validAttributes;
    });

    filters.forEach((filter) => {
      if (filter.isFiltered) {
        result = _.orderBy(result,
          [((c: Configuration) => c.attributes[filter.attribute.key])],
          [(filter.attribute.isHigherBetter ? "desc" : "asc")]);
      }
    });
    this.paretoFront = Optimality.getParetoFront(attributes, result).map((r) => r.id);

    // Filter by search query
    result = result.filter((item) => {
      return item.id ? item.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 : false;
    });

    this.filteredConfigurations = result;

    const res = _.groupBy(result, (value: Configuration) => this.paretoFront.indexOf(value.id) !== -1);
    return res;
  }

  public sortFilters() {
    this.filters = this.filters.sort((a, b) => {
      if (!a.isFiltered && !b.isFiltered) { return a.attribute.friendlyName.localeCompare(b.attribute.friendlyName); }
      if (a.isFiltered && !b.isFiltered) { return -1; }
      if (!a.isFiltered && b.isFiltered) { return 1; }
      return 0;
    });
  }

  get chartData() {
    const attributes = _.filter(this.filters, "isFiltered").map((a) => a.attribute);
    this.chartDimensions = attributes.length;

    const data: any = {
      attributes
    };
    switch (this.chartDimensions) {
      case 1: {
        data.categories = this.filteredConfigurations.map((c: Configuration) => c.id);
        data.values = this.filteredConfigurations.map((c: Configuration) => c.attributes[attributes[0].key]);
        break;
      }

      case 2: {
        data.values = this.filteredConfigurations.map((c: Configuration) => [
          c.attributes[attributes[0].key],
          c.attributes[attributes[1].key],
          c.id
        ]);
        break;
      }

      case 3: {
        data.values = this.filteredConfigurations.map((c: Configuration) => [
          c.attributes[attributes[0].key],
          c.attributes[attributes[1].key],
          c.attributes[attributes[2].key],
          c.id
        ]);
        data.configs = this.filteredConfigurations;
        break;
      }

      case 4: {
        data.values = this.filteredConfigurations.map((c: Configuration) => [
          c.attributes[attributes[0].key],
          c.attributes[attributes[1].key],
          c.attributes[attributes[2].key],
          c.attributes[attributes[3].key],
          c.id
        ]);
        break;
      }

      case 5: {
        data.values = this.filteredConfigurations.map((c: Configuration) => [
          c.attributes[attributes[0].key],
          c.attributes[attributes[1].key],
          c.attributes[attributes[2].key],
          c.attributes[attributes[3].key],
          c.attributes[attributes[4].key],
          c.id
        ]);
        break;
      }
    }
    return data;
  }

  public createReportOk(evt: Event) {
    // Prevent modal from closing
    evt.preventDefault();

    if (!this.newReportName) {
      alert("Please enter a report name");
    } else {
      this.createReportSubmit();
    }
  }

  public createReportSubmit() {
    const report: Report = {
      id: this.$store.getters.reports.length,
      name: this.newReportName,
      configurationIds: this.filteredConfigurations.map((c: Configuration) => c.id),
      sections: []
    };

    this.$store.commit("addReport", report);

    this.$nextTick(() => {
      // Wrapped in $nextTick to ensure DOM is rendered before closing
      const modal: any = this.$refs.newreport;
      modal.hide();
      this.$router.push("/reports/" + report.id);
    });
  }
}
