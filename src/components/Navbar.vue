<template>
  <b-navbar type="dark" id="navbar">
    <b-navbar-brand>Voyager</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/">Solution Explorer</b-nav-item>
        <b-nav-item to="/help">Help</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
}
</script>

<style>
#navbar {
  background: #0c3067;
}
</style>