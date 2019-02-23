<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark" id="nav" fixed="top">
      <b-navbar-brand tag="h1" class="mb-0">Voyager</b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/configurations">Configurations</b-nav-item>
          <b-nav-item to="/demo">Demo</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid id="app">
      <router-view class="pt-3"/>
    </b-container>
    <message-box />
  </div>
</template>

<style>
  #app {
    max-width: 1200px;
    padding-top: 56px;
  }
  h1 {
    font-weight: 700;
  }
  #nav {
    box-shadow: 0px 1px 8px rgba(0,0,0,0.2);
    background-color: #0c3067 !important;
  }
  #nav > div > .navbar-nav {
    margin-bottom: -2px;
  }
  body {
    font-size: 0.9rem;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MessageBox from "@/components/messages/MessageBox.vue";

@Component({
  components: {
    messageBox: MessageBox
  }
})
export default class App extends Vue { }
</script>
