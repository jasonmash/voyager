<script lang="ts" src="./Overview.ts"/>

<template>
  <div>
    <h1>Overview</h1>
    <h4>Import</h4>
    <b-form-file ref="fileinput" v-model="files" multiple accept=".json" placeholder="Choose a file..." drop-placeholder="Drop file here..." @change="uploadFile"/>
    <h4 class="mt-3">Export</h4>
    <a href="#" download="export.json" ref="exportButton">Export all data</a>
    <h4 class="mt-3">Reset</h4>
    <b-link @click="reset">Clear all app data</b-link>
  </div>
</template>