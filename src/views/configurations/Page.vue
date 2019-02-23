<script lang="ts" src="./Page.ts"/>

<template>
  <div class="list-details-view">
    <b-row>
      <div class="list-panel col-md-4 d-md-block" v-bind:class="{ 'd-none': $route.params.id }">
        <list-pane />
      </div>
      <div class="details-panel col py-3">
        <details-pane v-if="$route.params.id" v-bind:id="$route.params.id"/>
        <import-pane v-else/>
      </div>
    </b-row>
  </div>
</template>

<style>

.list-details-view {
  margin-top: -15px;
}
@media (min-width: 768px) {
  .list-details-view {
    position: fixed;
    width: calc(100% - 30px);
    height: calc(100% - 56px);
    background: white;
    left: 15px;
    margin-top: 0;
    padding-top: 0 !important;
  }

  .list-details-view > .row,
  .list-details-view .list-panel,
  .list-details-view .details-panel {
    height: 100%;
  }

  .list-details-view .details-panel {
    overflow-y: auto;
    box-shadow: 1px 0px 6px rgba(0,0,0,0.5);
    z-index: 2;
    background-color: #f8f9fa;
  }

  .list-details-view .list-panel .list-group {
    overflow-x: hidden;
  }

  .list-details-view .list-panel > .h-100 {
    overflow-y: hidden;
  }

  .list-details-view .list-panel {
    max-width: 400px;
  }

  .list-details-view .list-content {
    position: absolute;
    bottom: 0;
    top: 8rem;
    width: 100%;
    overflow-y: auto;
  }

  .list-details-view .list-header {
    height: 8rem;
  }
}

.list-details-view .list-panel {
  padding: 0;
}

.list-details-view .details-panel {
  padding-top: 0.5rem;
}

.list-details-view .list-group-item {
  transition: all 0.05s ease-in-out;
}

.list-details-view .list-group-item.router-link-exact-active {
  z-index: 3;
  background-color: #f8f9fa;
  box-shadow: 1px 0px 4px rgba(0,0,0,0.4);
  border-color: transparent;
}
</style>