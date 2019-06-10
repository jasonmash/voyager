<template>
  <div class="fixed-top w-100 px-3 pb-1 border-bottom bg-light" id="se-toolbar">
    <div class="float-right">
      <b-btn right size="sm" class="mr-3" variant="outline-secondary" @click="importData" v-b-tooltip.hover title="Import .json or .csv file(s)">
        <i class="fa fa-fw fa-upload mr-2"></i>Import
      </b-btn>
      <b-btn right size="sm" class="mr-3" variant="outline-secondary" @click="exportData">
        <i class="fa fa-fw fa-download mr-2"></i>Export
      </b-btn>
      <b-btn right size="sm" class="mr-3" variant="outline-secondary" @click="resetData">
        <i class="fa fa-fw fa-trash-alt mr-2"></i>Reset
      </b-btn>
      <b-btn right size="sm" variant="outline-secondary" @click="api">
        <i class="fa fa-fw fa-cloud mr-2"></i>Load from API
      </b-btn>
      <b-form-file plain id="fileinput" ref="fileinput" v-model="files" multiple @change="uploadFile" accept=".json, .csv"/>
    </div>
    <h1 class="h4 pt-1">Solution Explorer</h1>
  </div>
</template>

<script lang="ts" src="./Toolbar.ts" />

<style scoped>
  #se-toolbar {
    margin-top: 56px;
    z-index: 0;
    padding-top: 12px;
  }

  #se-toolbar .float-right {
    padding-top: 2px;
  }

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
