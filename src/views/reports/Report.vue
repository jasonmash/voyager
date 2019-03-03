<script lang="ts" src="./Report.ts" />

<template>
  <b-container class="py-3">
    <h1>Report</h1>
    
    <b-card v-for="(section, i) in report.sections" no-body :key="'section-' + i" :title="section.title" class="mb-3">
      <bar-chart :data="section.data" v-if="section.type == 2 && !!section.data" />
      <line-chart :data="section.data" v-if="section.type == 3 && !!section.data" />
      <scatter2d-chart :data="section.data" v-if="section.type == 0 && !!section.data" />
      <scatter3d-chart :data="section.data" v-if="section.type == 1 && !!section.data" />
    </b-card>

    <b-button v-if="!showNewSectionBox" @click="addSection">Add section</b-button>
    <b-card title="New section" v-if="!!showNewSectionBox">
      <b-card-body>
        <b-form-input v-model="newSection.title" type="text" placeholder="Enter a title" />
        <b-select v-model="newSection.type">
          <option :value="2">Bar chart</option>
          <option :value="3">Line chart</option>
          <option :value="0">2D Scatter</option>
          <option :value="1">3D Scatter</option>
          <option :value="4">Bubble chart</option>
        </b-select>
        <b-select @change="updateSectionData">
          <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
        </b-select>
        <b-btn variant="success" @click="saveNewSection">Add</b-btn>
        <b-btn variant="outline-secondary" @click="showNewSectionBox = false">Cancel</b-btn>
      </b-card-body>
    </b-card>
  </b-container>
</template>
