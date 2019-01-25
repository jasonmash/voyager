<template>
  <b-card header-tag="header" no-body style="min-height: 450px">
    <header slot="header">
      <b>Graph Title</b>
      <small><b-link @click="downloadGraph(700, 700, 'png')" class="pt-1 m-0 float-right">Export</b-link></small>
    </header>
    <div id="surface-3d-plot"></div>
    <p class="text-center p-3 text-muted" v-if="!isGraphRendered"><i class="far fa-2x fa-compass fa-spin my-3"></i><br>Loading...</p>
  </b-card>
</template>

<script lang="ts" src="./Surface3DPlot.ts"/>
