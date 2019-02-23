import Vue from "vue";
import Component from "vue-class-component";

import { Configuration } from "@/models/configuration";

@Component
export default class ListComponent extends Vue {
  public searchQuery: string = "";

  get list() {
    const data: Configuration[] = this.$store.getters.configurations;
    return data.sort((a: Configuration, b: Configuration) => a.id.localeCompare(b.id));
  }

  get totalCount() {
    return this.$store.getters.configurations.length;
  }
}
