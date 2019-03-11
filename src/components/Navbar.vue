<template>
  <b-navbar type="dark" id="navbar">
    <b-navbar-brand>Voyager</b-navbar-brand>
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
        </b-nav-item-dropdown>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  get reports() {
    return this.$store.getters.reports;
  }
}
</script>

<style>
#navbar {
  background: #0c3067;
}
</style>