<template>
  <div>
    <b-dropdown-item v-if="!onReportPage" @click="addToReport">Add to report</b-dropdown-item>
    <b-dropdown-item v-if="onReportPage" @click="deleteSection">Delete section</b-dropdown-item>

    <b-modal v-if="!onReportPage" size="sm" ref="add-modal" title="Select a report" body-class="p-0" ok-only ok-title="Add" @ok="submitAddModal">
      <b-form-group class="p-0 m-0">
        <b-list-group flush>
          <b-list-group-item class="py-2 px-3">
            <label class="mb-2 text-secondary">Section Title:</label>
            <b-form-input class="w-100 mb-2" size="sm" v-model="title" placeholder="Type title here..."/>
          </b-list-group-item>
          <b-list-group-item v-for="report in reports" :key="`r-` + report.id" class="pb-2">
            <b-form-radio v-model="selectedReport" :value="report.id" class="m-0">{{report.name}}</b-form-radio>
          </b-list-group-item>
        </b-list-group>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ReportDropdown extends Vue {
  @Prop(Number) public readonly sectionIndex?: number;

  public onReportPage: boolean = true;
  public selectedReport: number = -1;
  public title: string = "";

  public mounted() {
    this.refresh();
  }

  public updated() {
    this.refresh();
  }

  public refresh() {
    this.onReportPage = this.$route.name === "Report";
  }

  // Get list of reports to show in dropdown menu
  get reports() {
    return this.$store.getters.reports;
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

  public addToReport() {
    if (this.onReportPage) { return; }
    const modal: any = this.$refs["add-modal"];
    modal.show();
  }

  // Add section to report, call addToReport in parent component as chart data doesn't exist here
  public submitAddModal() {
    if (this.onReportPage) { return; }
    if (this.selectedReport > -1) {
      this.$emit("addToReport", this.title, this.selectedReport);
    }
  }
}
</script>
