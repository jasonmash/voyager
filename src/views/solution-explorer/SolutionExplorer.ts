import { Component, Vue } from "vue-property-decorator";

import _ from "lodash";
import draggable from "vuedraggable";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";
import { Report } from "@/models/report";

import { Optimality } from "@/utils/optimality";
import DataManagement from "@/utils/data-management";

import Chart1D from "@/components/charts/1d.vue";
import RadarChart from "@/components/charts/radar.vue";
import ScatterChart from "@/components/charts/scatter.vue";
import Scatter3DChart from "@/components/charts/scatter-3d.vue";
import SurfaceChart from "@/components/charts/surface.vue";
import MapChart from "@/components/charts/map.vue";

import AttributeBox from "./components/Attribute.vue";
import ConfigurationBox from "./components/Configuration.vue";
import ConfigurationList from "./components/ConfigurationList.vue";
import Toolbar from "./components/Toolbar.vue";

/**
 * Solution Explorer - page
 *
 * @export
 * @class SolutionExplorerComponent
 * @extends {Vue}
 */
@Component({
  components: {
    "configuration": ConfigurationBox,
    "attribute": AttributeBox,
    ConfigurationList, Toolbar, draggable,
    "scatter3d-chart": Scatter3DChart,
    "chart-1d": Chart1D,
    RadarChart, ScatterChart, SurfaceChart, MapChart
  }
})
export default class SolutionExplorerComponent extends Vue {

  /**
   * Get the total configuration count
   * @readonly
   * @memberof SolutionExplorerComponent
   */
  get totalCount() {
    return this.$store.getters.configurations.length;
  }

  /**
   * Get list of configurations with applied filters,
   * grouped by pareto optimality (true = pareto optimal etc)
   * @readonly
   * @memberof SolutionExplorerComponent
   */
  get list() {

    // Get filters
    const filters = _.clone(this.filters);
    _.reverse(filters);

    // Get applicable attributes for selected filters
    const attributes = _.filter(this.filters, "isFiltered");
    this.chartDimensions = attributes.length;

    // Get configuration list
    const data: Configuration[] = this.$store.getters.configurations;

    // Filter configuration list based on set parameters
    let result: Configuration[] = data.filter((item) => {
      let validAttributes = true;
      filters.forEach((filter) => {
        if (filter.isFiltered) {
          const val = item.attributes[filter.key];
          if (val && (val > filter.filterMaxValue || val < filter.filterMinValue)) { validAttributes = false; }
        }
      });
      return validAttributes;
    });

    // Order configuration list by selected filters (these can be sorted by user in UI)
    filters.forEach((filter) => {
      if (filter.isFiltered) {
        result = _.orderBy(result,
          [((c: Configuration) => c.attributes[filter.key])],
          [(filter.isHigherBetter ? "desc" : "asc")]);
      }
    });

    // Calculate pareto front configurations
    this.paretoFront = Optimality.getParetoFront(attributes, result).map((r) => r.id);

    // Filter by search query
    result = result.filter((item) => {
      return item.id ? item.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 : false;
    });

    // Save filtered results
    this.configurations = result;

    // Group resulting configurations by whether they're in the pareto front
    const res = _.groupBy(result, (value: Configuration) => this.paretoFront.indexOf(value.id) !== -1);
    return res;
  }

  /**
   * Get data formatted for use in charts
   * @readonly
   * @memberof SolutionExplorerComponent
   */
  get chartData() {
    const attributes = _.filter(this.filters, "isFiltered");
    this.chartDimensions = attributes.length;

    const data: any = {
      attributes
    };
    switch (this.chartDimensions) {
      case 1: {
        data.categories = this.configurations.map((c: Configuration) => c.id);
        data.values = this.configurations.map((c: Configuration) => c.attributes[attributes[0].key]);
        break;
      }

      case 2: {
        data.values = this.configurations.map((c: Configuration) => [
          c.attributes[attributes[0].key],
          c.attributes[attributes[1].key],
          c
        ]);
        break;
      }

      case 3: {
        data.values = this.configurations.map((c: Configuration) => [
          c.attributes[attributes[0].key],
          c.attributes[attributes[1].key],
          c.attributes[attributes[2].key],
          c
        ]);
        data.configs = this.configurations;
        break;
      }

      case 4: {
        data.values = this.configurations.map((c: Configuration) => [
          c.attributes[attributes[0].key],
          c.attributes[attributes[1].key],
          c.attributes[attributes[2].key],
          c.attributes[attributes[3].key],
          c
        ]);
        break;
      }

      case 5: {
        data.values = this.configurations.map((c: Configuration) => [
          c.attributes[attributes[0].key],
          c.attributes[attributes[1].key],
          c.attributes[attributes[2].key],
          c.attributes[attributes[3].key],
          c.attributes[attributes[4].key],
          c
        ]);
        break;
      }
    }
    return data;
  }

  // List of filters
  public filters: Attribute[] = [];
  // Number of selected data dimensions
  public chartDimensions: number = 0;
  // Search query for searching amongst configuration ids
  public searchQuery: string = "";
  // List of filtered configurations
  public configurations: Configuration[] = [];
  // List of pareto optimal configurations
  public paretoFront: string[] = [];
  // Selected configuration from list
  public selectedConfiguration: Configuration | null = null;
  // Flag indicating is user is currently reordering filter list
  public isReorderingFilters: boolean = false;

  /**
   * Initialise filter list when page is created
   * @memberof SolutionExplorerComponent
   */
  public created() {
    this.loadFilters();
  }

  /**
   * Load filters from vuex store
   *
   * @memberof SolutionExplorerComponent
   */
  public loadFilters() {
    this.selectedConfiguration = null;
    this.filters = _.clone(this.$store.getters.attributes);
    this.sortFilters();
  }

  /**
   * Sort the list of filters, by name, and put isFiltered ones first
   *
   * @memberof SolutionExplorerComponent
   */
  public sortFilters() {
    this.filters = this.filters.sort((a: Attribute, b: Attribute) => {
      if (!a.isFiltered && !b.isFiltered) { return a.friendlyName.localeCompare(b.friendlyName); }
      if (a.isFiltered && !b.isFiltered) { return -1; }
      if (!a.isFiltered && b.isFiltered) { return 1; }
      return b.filterPriority > a.filterPriority ? -1 : 1;
    });
  }

  /**
   * Update state to reflect change to attribute priority ordering
   * @param event Vue-draggable reordering event
   */
  public moveFilter(event: any) {
    // Check if attribute filter reordered
    if (event.moved.newIndex !== event.moved.oldIndex) {
      let i = 0;
      this.filters.forEach((f: Attribute) => {
        this.$store.commit("updateAttribute", { key: f.key, filterPriority: i });
        i++;
      });
    }
  }

  /**
   * Loads demo data
   * @memberof SolutionExplorerComponent
   */
  public loadDemoData() {
    DataManagement.loadDemoData(this.$store);
    this.loadFilters();
  }

}
