<template>
  <b-navbar type="dark" id="navbar">
    <b-navbar-brand>Voyager</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/">Overview</b-nav-item>
        <b-nav-item to="/configurations">Configurations</b-nav-item>
        <b-nav-item to="/solutions">Explorer</b-nav-item>
        <b-nav-item-dropdown>
          <template slot="button-content">Reports</template>
          <b-dropdown-item v-for="report in reports" :key="report.id + '-report'" :to="'/reports/'+report.id">
            {{report.name}}
          </b-dropdown-item>
          <b-dropdown-item disabled v-if="reports.length === 0"><span class="text-muted">No reports found</span></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content"><i class="fa fa-fw fa-cog"></i></template>
          <b-dropdown-item @click="importData">Import</b-dropdown-item>
          <b-dropdown-item @click="exportData">Export</b-dropdown-item>
          <b-dropdown-item @click="resetData">Clear data</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item href="#">About</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    <b-form-file plain id="fileinput" ref="fileinput" v-model="files" multiple accept=".json" @change="uploadFile"/>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DataManagement from "@/utils/data-management";
import Importer from "@/utils/importer";

@Component
export default class Navbar extends Vue {
  public files: File[] | null = null;

  get reports() {
    return this.$store.getters.reports;
  }

  public exportData() {
    DataManagement.exportAllData(this.$store);
  }

  public resetData() {
    const result = confirm("Are you sure you wish to remove all stored data? \n\n" +
      "This will remove all configurations, attributes, and reports.");
    if (result) { DataManagement.resetAllData(this.$store); }
  }

  public importData() {
    const input: any = this.$refs.fileinput;
    input.$el.click();
  }

  public uploadFile(event: any) {
    const input = event.target;
    if (!input.files || input.files.length < 1) { return; }

    this.$message({
      content: `Importing data...`,
      type: "info"
    });

    setTimeout(async () => {
      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = () => Importer.processInputFile(reader, file, this.$message, this.$store);
        reader.readAsText(file);
      }

      const fileInput: any = this.$refs.fileinput;
      fileInput.reset();
    }, 500);
  }
}
</script>

<style>
#navbar {
  background: #0c3067;
}
#navbar #fileinput {
  /* Position file input box off-screen, and trigger via code */
  position: absolute;
  top: -100px;
  left: -100px;
  height: 1px;
  width: 1px;
  overflow: hidden;
}
</style>