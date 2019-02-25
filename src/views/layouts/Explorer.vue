<script lang="ts" src="./Explorer.ts"/>

<template>
  <div class="list-details-view">
    <b-row>
      <div class="list-panel col-md-4 d-none d-md-block">
        <menu-panel />
      </div>
      <div class="details-panel col py-3">
        <router-view />
      </div>
    </b-row>
  </div>
</template>
