import Vue from "vue";
import Component from "vue-class-component";
import _ from "lodash";

import { Attribute } from "@/models/attribute";
import { Configuration } from "@/models/configuration";

import DetailsComponent from "./Details.vue";
import RangeSlider from "@/components/RangeSlider.vue";

@Component({
  components: {
    "configuration-details": DetailsComponent,
    "range-slider": RangeSlider
  }
})
export default class ConfigurationsComponent extends Vue {
  public searchQuery: string = "";
  public selectedIndex: number = -1;

  public attributes: any = [];

  public created() {
    const data: Attribute[] = this.$store.getters.attributes;
    this.attributes =  data.map((attr: Attribute) => {
      return { attribute: attr, minValue: attr.scaleMin, maxValue: attr.scaleMax };
    });
  }

  get list() {
    const data: Configuration[] = this.$store.getters.configurations;
    const attributes = this.attributes;

    // Filter list based on searchQuery, look in email and name fields
    const result: Configuration[] = data.filter((item) => {
      const inName = item.id ? item.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 : false;
      let validAttributes = true;
      attributes.forEach((a: any) => {
        const val = item.attributes[a.attribute.key];
        if (val && (val > a.maxValue || val < a.minValue)) { validAttributes = false; }
      });
      return inName && validAttributes;
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

  public onRangeChange(attr: any, event: any) {
    attr.minValue = parseFloat(event.min);
    attr.maxValue = parseFloat(event.max);
  }
}
