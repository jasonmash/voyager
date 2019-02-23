<script lang="ts" src="./Import.ts"/>

<template>
  <div>
    <h1>Overview</h1>
    <h4>Import</h4>
    <b-form-file ref="fileinput" v-model="files" multiple accept=".json" placeholder="Choose a file..." drop-placeholder="Drop file here..." @change="uploadFile"/>
  </div>
</template>