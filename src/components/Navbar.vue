<template>
  <b-navbar type="dark" id="navbar" fixed="top">
    <b-navbar-brand>
      <svg class="icon" width="30px" height="30px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Icon/B&amp;W" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path d="M30.9276331,7.22194673 L42.382389,15.4439705 C43.382285,16.1616783 43.8423606,17.4173106 43.5428655,18.6111277 L25.5826307,90.2024134 C25.3849735,90.9902946 24.8762703,91.6643472 24.1728011,92.0704954 L23.9235953,92.2143744 C23.5144015,92.4506225 22.9911675,92.3104224 22.7549193,91.9012286 C22.6735562,91.7603035 22.6340716,91.5990969 22.6410979,91.4365224 L26.181078,9.52957212 C26.2526197,7.87426314 27.6525087,6.59036608 29.3078177,6.66190776 C29.8907279,6.68710086 30.453642,6.88172418 30.9276331,7.22194673 Z" fill-opacity="0.5" fill="#FFFFFF" transform="translate(33.306445, 48.490289) scale(1, -1) rotate(20.000000) translate(-33.306445, -48.490289) "></path>
          <path d="M63.7912028,9.95637971 L76.0057326,18.2676491 C77.0487251,18.9773442 77.5362921,20.2637232 77.22573,21.4864463 L59.0111701,93.1995406 C58.8119544,93.9838788 58.3043188,94.654469 57.6034944,95.0590902 L57.3497969,95.2055624 C56.9376453,95.4435183 56.4106291,95.3023047 56.1726733,94.8901531 C56.091614,94.7497542 56.0518046,94.5893367 56.0578186,94.4273296 L59.1055894,12.3253616 C59.1670524,10.6696478 60.5590993,9.37725213 62.2148131,9.43871516 C62.7784935,9.45963998 63.3248552,9.63905762 63.7912028,9.95637971 Z" fill-opacity="0.8" fill="#FFFFFF" transform="translate(66.871514, 51.444939) rotate(20.000000) translate(-66.871514, -51.444939) "></path>
        </g>
      </svg>
      Voyager
    </b-navbar-brand>
    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/">Solution Explorer</b-nav-item>
        <b-nav-item-dropdown>
          <template slot="button-content">Reports</template>
          <b-dropdown-item v-for="report in reports" :key="report.id + '-report'" :to="'/reports/'+report.id">
            {{report.name}}
          </b-dropdown-item>
          <b-dropdown-item disabled v-if="reports.length === 0"><span class="text-muted">No reports found</span></b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item v-b-modal.newreport>Add report</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    
    <b-modal id="newreport" title="Create Report" @ok="createReportOk" ref="newreport">
      <b-form @submit.stop.prevent="createReportSubmit">
        <b-form-group label="Report name:" label-for="name">
          <b-form-input id="name" type="text" required v-model="newReportName" />
        </b-form-group>
      </b-form>
    </b-modal>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Report } from "../models/report";

@Component
export default class Navbar extends Vue {
  // Get list of reports to show in dropdown menu
  get reports() {
    return this.$store.getters.reports;
  }

  public newReportName: string = "";
  /**
   * Check user has entered all required information for creating a new report
   *
   * @param {Event} evt
   * @memberof SolutionExplorerComponent
   */
  public createReportOk(evt: Event) {
    // Prevent modal from closing
    evt.preventDefault();

    if (!this.newReportName) {
      alert("Please enter a report name");
    } else {
      this.createReportSubmit();
    }
  }

  /**
   * Create a new report
   * @memberof SolutionExplorerComponent
   */
  public createReportSubmit() {
    const report: Report = {
      id: this.$store.getters.reports.length,
      name: this.newReportName,
      sections: []
    };

    this.$store.commit("addReport", report);

    this.$nextTick(() => {
      // Wrapped in $nextTick to ensure DOM is rendered before closing
      const modal: any = this.$refs.newreport;
      modal.hide();
      this.$router.push("/reports/" + report.id);
    });
  }
}
</script>

<style>
#navbar {
  background: #024884;
  box-shadow: 0px 2px 2px -1px rgba(0,0,0,0.4);
}

#navbar .navbar-brand {
  font-weight: 600;
}

#navbar .icon {
  margin-top: -3px;
  margin-left: -3px;
}

#navbar .router-link-exact-active {
  font-weight: 600;
}

#navbar .nav-link.router-link-exact-active {
  color: white;
}
</style>