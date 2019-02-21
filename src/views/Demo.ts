import { Component, Vue } from "vue-property-decorator";

import Surface3DPlot from "@/components/graphs/Surface3DPlot.vue";

@Component({
  components: {
    Surface3DPlot
  }
})
export default class Demo extends Vue {
}
