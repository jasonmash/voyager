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
