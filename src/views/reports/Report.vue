<script lang="ts" src="./Report.ts" />

<template>
  <div v-if="report">
    <div class="fixed-top w-100 px-3 pb-1 bg-light" id="toolbar">
      <div class="float-right">
        <b-btn right size="sm" class="mr-3" variant="outline-secondary" @click="deleteReport" v-b-tooltip.hover title="Delete this report">
          <i class="fa fa-fw fa-trash mr-2"></i>Delete
        </b-btn>
      </div>
      <h1 class="h4 pt-1">{{report.name}}</h1>
    </div>
    <b-container class="py-3" id="report-container">
      <b-row v-if="report.sections.length == 0">
        <b-col md="8" offset-md="2"> 
          <h2 class="text-secondary">No content found</h2>
          Add visualisations to this report using the dropdown in the right-hand corner of any visualisation in the Solution Explorer.
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12" md="6" :xl="(report.sections.length % 3 == 0 ? '4' : '6')" v-for="(section, i) in report.sections" :key="'section-' + i">
          <b-card no-body :header="section.title" class="mb-3">
            <scatter-chart :data="section.data" v-if="section.type == 0 && !!section.data" :section-index="i"/>
            <scatter3d-chart :data="section.data" v-if="section.type == 1 && !!section.data" :section-index="i"/>
            <chart-1d v-if="section.type == 2 && !!section.data" type="bar" :data="section.data" :section-index="i"/>
            <chart-1d v-if="section.type == 3 && !!section.data" type="line" :data="section.data" :section-index="i"/>
            <map-chart v-if="section.type == 4 && !!section.data" :data="section.data" :section-index="i"/>
            <radar-chart v-if="section.type == 5 && !!section.data" :data="section.data" :section-index="i"/>
            <surface-chart v-if="section.type == 6 && !!section.data" :data="section.data" :section-index="i"/>
            <structure-chart v-if="section.type == 7 && !!section.data" :data="section.data" :section-index="i"/>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
  #toolbar {
    margin-top: 56px;
    z-index: 3;
    padding-top: 12px;
    box-shadow: 0 2px 4px -2px rgba(0,0,0,0.3);
  }

  #toolbar h1 {
    font-weight: 600;
  }

  #toolbar .float-right {
    padding-top: 2px;
  }

  #report-container {
    margin-top: 120px;
  }
</style>
