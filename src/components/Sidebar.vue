<template>
  <nav class="bg-light sidebar">
    <div class="sidebar-brand">
      <h1>Voyager</h1>
    </div>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link exact" to="/">
          <i class="sidebar-icon fa fa-fw fa-home"></i>
          Overview
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/configurations">
          <i class="sidebar-icon fa fa-fw fa-project-diagram"></i>
          Configurations
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/attributes">
          <i class="sidebar-icon fa fa-fw fa-layer-group"></i>
          Attributes
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/solutions">
          <i class="sidebar-icon fa fa-fw fa-chart-line"></i>
          Solution Explorer
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/overview">
          <i class="sidebar-icon fa fa-fw fa-database"></i>
          Data Management
        </router-link>
      </li>
    </ul>

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      <span>Reports</span>
      <router-link class="d-flex align-items-center text-muted" to="/configurations">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon sidebar-icon-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
      </router-link>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <router-link class="nav-link" :to="'/reports/1'">
          <i class="sidebar-icon far fa-fw fa-file-alt"></i>
          Report
        </router-link>
      </li>
      <li class="nav-item" v-for="report in reports" :key="report.id + '-report'">
        <router-link class="nav-link" :to="'/reports/'+report.id">
          <i class="sidebar-icon far fa-fw fa-file-alt"></i>
          {{report.name}}
        </router-link>
      </li>
      <li v-if="reports.length === 0" class="nav-item pt-1">
        <span class="text-muted pl-3">No reports found</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Sidebar extends Vue {
  get reports() {
    return this.$store.getters.reports;
  }
}
</script>

<style>
.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  width: 220px;
  overflow-y: auto;
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
  border-left: 3px solid transparent;
  padding-left: 13px;
}

.sidebar .sidebar-icon {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.sidebar .nav-link .sidebar-icon {
  margin-right: 4px;
}

.sidebar .nav-link:hover,
.sidebar .nav-link:active  {
  color: #777;
}

.sidebar .nav-link.router-link-active {
  color: #007bff;
  border-left: 3px solid #007bff;
}

.sidebar .nav-link.exact.router-link-active {
  color: #333;
  border-left: 3px solid transparent;
}

.sidebar .nav-link.exact:hover,
.sidebar .nav-link.exact:active  {
  color: #777;
}

.sidebar .nav-link.exact.router-link-exact-active {
  color: #007bff;
  border-left: 3px solid #007bff;
}

.sidebar .nav-link:hover .sidebar-icon,
.sidebar .nav-link:active .sidebar-icon {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

.sidebar-brand {
  height: 56px;
  width: 220px;
  top: 0;
  margin-bottom: 8px;
  background: #0c3067;
  color: white;
  position: sticky;
}

.sidebar-brand > h1 {
  font-size: 1.4rem;
  font-weight: 700;
  text-align: left;
  padding-left: 16px;
  line-height: 56px;
}
</style>