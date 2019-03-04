<script lang="ts" src="./DataManagement.ts"/>

<template>
  <div class="p-3">
    <h1 class="h3 mb-3">Data Management</h1>
    <h5>Import</h5>
    <b-form-file ref="fileinput" v-model="files" multiple accept=".json" placeholder="Choose a file..." drop-placeholder="Drop file here..." @change="uploadFile"/>
    <h5 class="mt-3">Export</h5>
    <b-button size="sm" @click="exportData">Export all data</b-button>
    <h5 class="mt-3">Reset</h5>
    <b-button size="sm" @click="reset">Clear all app data</b-button>
  </div>
</template>