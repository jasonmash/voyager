<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light" id="nav" fixed="top">
      <b-navbar-brand tag="h1" class="mb-0">Voyager</b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/demo">Demo</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid id="app">
      <router-view class="py-4"/>
    </b-container>
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

</style>
