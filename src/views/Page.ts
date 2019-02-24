import Vue from "vue";
import Component from "vue-class-component";

import Menu from "./menu/Menu.vue";

@Component({
  components: {
    "menu-panel": Menu
  }
})
export default class ConfigurationsPageComponent extends Vue {
}
