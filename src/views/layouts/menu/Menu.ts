import Vue from "vue";
import Component from "vue-class-component";
import _ from "lodash";

import { Configuration } from "@/models/configuration";

@Component
export default class ListComponent extends Vue {
  public searchQuery: string = "";
  public selectedIndex: number = -1;

  get list() {
    const data: Configuration[] = this.$store.getters.configurations;

    // Filter list based on searchQuery, look in email and name fields
    const result: Configuration[] = data.filter((item) => {
      const inName = item.id ? item.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 : false;
      return inName;
    });

    return result;
  }

  get totalCount() {
    return this.$store.getters.configurations.length;
  }

  public onKeyUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.keyCode === 38) { // up
      if (this.selectedIndex > 0) { this.selectedIndex -= 1; }
    } else if (event.keyCode === 40) { // down
      if (this.selectedIndex < (this.list.length - 1)) { this.selectedIndex += 1; }
    }
    this.$router.replace("/configurations/" + this.list[this.selectedIndex].id);
    const listItem: any = this.$refs[`i-${this.selectedIndex}`];
    if (listItem[0].$el.scrollIntoViewIfNeeded) {
      listItem[0].$el.scrollIntoViewIfNeeded(true);
    } else {
      listItem[0].$el.scrollIntoView();
    }
  }

  public setSelectedIndex(index: number) {
    this.selectedIndex = index;
  }
}
