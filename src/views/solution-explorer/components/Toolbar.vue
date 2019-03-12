<template>
  <div class="float-right">
    <b-btn right size="sm" class="mr-3" variant="outline-secondary" @click="importData">
      <i class="fa fa-fw fa-upload mr-2"></i>Import
    </b-btn>
    <b-btn right size="sm" class="mr-3" variant="outline-secondary" @click="exportData">
      <i class="fa fa-fw fa-download mr-2"></i>Export
    </b-btn>
    <b-btn right size="sm" variant="outline-secondary" @click="resetData">
      <i class="fa fa-fw fa-trash-alt mr-2"></i>Reset
    </b-btn>
    <b-form-file plain id="fileinput" ref="fileinput" v-model="files" multiple @change="uploadFile"/> <!-- accept=".json"-->
  </div>
</template>

<script lang="ts" src="./Toolbar.ts" />

<style scoped>
  #fileinput {
    /* Position file input box off-screen, and trigger via code */
    position: absolute;
    top: -100px;
    left: -100px;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }
</style>
