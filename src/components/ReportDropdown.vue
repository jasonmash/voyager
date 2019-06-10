<template>
  <div>
    <b-dropdown-item v-if="!onReportPage">Add to report</b-dropdown-item>
    <b-dropdown-item v-if="onReportPage" @click="deleteSection">Delete section</b-dropdown-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ReportDropdown extends Vue {
  @Prop(Number) public readonly sectionIndex?: number;

  public onReportPage: boolean = true;

  public mounted() {
    this.refresh();
  }

  public updated() {
    this.refresh();
  }

  public refresh() {
    this.onReportPage = this.$route.name === "Report";
  }

  public deleteSection() {
    if (this.onReportPage) {
      const res = confirm("Are you sure you wish to remove this section?");
      if (res) {
        this.$store.commit("deleteReportSection", {
          id: parseFloat(this.$route.params.id),
          sectionIndex: this.sectionIndex
        });
      }
    }
  }
}
</script>
