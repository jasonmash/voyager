import Vue from "vue";
import Component from "vue-class-component";

import AttributesComponent from "./AttributeDetails.vue";
import { Attribute } from "@/models/attribute";

@Component({
  components: {
    "attributes-panel": AttributesComponent
  }
})
export default class SplitViewComponent extends Vue {
  public searchQuery: string = "";
  public selectedIndex: number = -1;

  get list() {
    const data: Attribute[] = this.$store.getters.attributes;

    // Filter list based on searchQuery, look in email and name fields
    const result: Attribute[] = data.filter((item) => {
      const inName = item.key ? item.key.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 : false;
      return inName;
    });

    return result;
  }

  get totalCount() {
    return this.$store.getters.attributes.length;
  }

  public onKeyUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.keyCode === 38) { // up
      if (this.selectedIndex > 0) { this.selectedIndex -= 1; }
    } else if (event.keyCode === 40) { // down
      if (this.selectedIndex < (this.list.length - 1)) { this.selectedIndex += 1; }
    }
    this.$router.replace("/attributes/" + this.list[this.selectedIndex].key);
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

