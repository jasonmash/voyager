import Vue from "vue";
import Component from "vue-class-component";

import Details from "./Details.vue";
import List from "./List.vue";
import Import from "./Import.vue";

@Component({
  components: {
    "details-pane": Details,
    "list-pane": List,
    "import-pane": Import
  }
})
export default class ConfigurationsPageComponent extends Vue {
}
