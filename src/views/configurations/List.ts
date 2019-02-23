import Vue from "vue";
import Component from "vue-class-component";
import _ from "lodash";

import { Configuration } from "@/models/configuration";


@Component
export default class ListComponent extends Vue {
  public searchQuery: string = "";

  get list() {
    const data: Configuration[] = this.$store.getters.configurations;

    // Filter list based on searchQuery, look in email and name fields
    let result: Configuration[] = data.filter((item) => {
      const inName = item.id ? item.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 : false;
      return inName;
    });

    result = _.sortBy(result, ["id"]);
    return result;
  }

  get totalCount() {
    return this.$store.getters.configurations.length;
  }
}
