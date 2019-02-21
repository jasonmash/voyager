<template>
  <div>
    <b-row>
      <b-col md="4">
        <h2 class="mb-3">Configurations</h2>
        <b-list-group>
          <b-list-group-item v-for="config in configurations" :key="config.id" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-0">{{config.id}}</h5>
              <small>{{config.components.length}} components</small>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>
        <h4>Import</h4>
        <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..." drop-placeholder="Drop file here..." @change="uploadFile"/>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts" src="./Main.ts" />