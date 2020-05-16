<script lang="ts" src="./Toolbar.ts" />

<template>
  <div class="fixed-top w-100 px-3 pb-1 bg-light" id="se-toolbar">
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
      <b-dropdown right size="sm" variant="outline-secondary" @click="api">
        <b-dropdown-item v-b-modal.manage-extensions>Manage extensions</b-dropdown-item>
      </b-dropdown>
      <b-form-file plain id="fileinput" ref="fileinput" v-model="files" multiple @change="uploadFile" accept=".json, .csv"/>
    </div>
    <h1 class="h4 pt-1">Solution Explorer</h1>

    <b-modal id="manage-extensions" title="Manage Extensions" @ok="api" ok-only>
      <p>Voyager can connect to external HTTP API endpoints to load configuration lists or additional visualisations. <a target="_blank" href="https://github.com/jasonmash/voyager#extensions">Learn more</a></p>
      <h6>Configurations</h6>
      <label>Provide a URL that returns a list of configurations</label>
      <b-input v-model="settings.configurationURL" size="sm" placeholder="Enter URL..." class="mb-4"/>

      <h6>Visualisations</h6>
      <label>Provide a URL that returns one or more visualisations for each configuration, where '<code>{id}</code>' is the URL parameter for the selected configuration ID.</label>
      <b-input v-model="settings.visualisationURL" size="sm" placeholder="Enter URL..." class="mb-4"/>

      <p>Note: If you are connecting to <code>localhost</code>, you may need to enable cross-origin resource sharing (CORS) on your server.</p>

    </b-modal>
  </div>
</template>

<style scoped>
  #se-toolbar {
    margin-top: 56px;
    z-index: 10;
    padding-top: 12px;
    box-shadow: 0 2px 4px -2px rgba(0,0,0,0.3);
  }

  #se-toolbar h1 {
    font-weight: 600;
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
