import Vue from "vue";
import Component from "vue-class-component";

import { Configuration } from "@/models/configuration";

@Component({
  props: {
    id: String
  }
})
export default class DetailsComponent extends Vue {
  get value(): Configuration {
    return this.$store.getters.configurations.find((v: Configuration) => v.id.toString() === this.$props.id);
  }

  public deleteConfiguration(): void {
    if (confirm("Are you sure you wish to delete this configuration?")) {
      this.$store.dispatch("deleteConfiguration", this.value);
    }
  }
}
