<script lang="ts" src="./SolutionExplorer.ts" />

<template>
  <b-container fluid id="solution-explorer" class="pt-3">
    <toolbar @refreshData="loadFilters" />
    <h1 class="h3 mb-3">Solution Explorer</h1>

    <div class="border-right solution-explorer-col s-col-1">
      <h5>Attributes</h5>
      <p>Order by priority</p>

      <draggable class="border-top" v-model="filters" handle=".handle" @start="drag = true" @end="drag = false" :animation='200'>
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <attribute v-for="(filter, i) in filters" :key="filter.attribute.key" :filter="filter" :index="i"/> 
        </transition-group>
      </draggable>
    </div>
    <div class="border-right solution-explorer-col s-col-2">
      <b-btn size="sm" variant="outline-primary" class="float-right" v-b-modal.newreport>Create report</b-btn>
      <h5>Configurations</h5>
      <p class="mb-2">Showing {{filteredConfigurations.length}} of {{totalCount}}</p>
      <b-form-input type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
      <configuration-list :list="list" :filters="filters" :selectedConfiguration="selectedConfiguration" @select="selectedConfiguration=$event"/>
    </div>
    <div class="solution-explorer-col s-col-3">
      <configuration v-if="selectedConfiguration" :configuration="selectedConfiguration" @clearSelection="selectedConfiguration = null"/>

      <div v-else-if="filters.length === 0" class="text-center">
        <h6 class="my-3">To start, import some configurations with attributes.</h6>
      </div>

      <div v-else>
        <h5 class="mb-3">Visualisations</h5>
      
        <b-tabs content-class="mt-3" no-fade lazy :key="chartDimensions">
          <b-tab title="Info" key="1" v-if="chartDimensions == 0">
            <p v-if="chartDimensions == 0" class="pt-2">Change the selected attribute filters to visualise the solution space, or select a configuration.</p>
          </b-tab>
          <b-tab title="Line" key="2" v-if="chartDimensions == 1">
            <line-chart :data="chartData"/>
          </b-tab>
          <b-tab title="Bar" key="3" v-if="chartDimensions == 1">
            <bar-chart :data="chartData"/>
          </b-tab>
          <b-tab title="2D Scatter" key="4" v-if="chartDimensions >= 2 && chartDimensions < 5">
            <scatter-chart :data="chartData" />
          </b-tab>
          <b-tab title="3D Scatter" key="5" v-if="chartDimensions >= 3 && chartDimensions <= 5">
            <scatter3d-chart :key="chartDimensions" :data="chartData"/>
          </b-tab>
          <b-tab title="Surface" key="6" v-if="chartDimensions == 3">
            <surface-chart :data="chartData"/>
          </b-tab>
          <b-tab title="Radar" key="7" v-if="filteredConfigurations.length > 0 && filteredConfigurations.length < 10">
            <radar-chart :data="filteredConfigurations" />
          </b-tab>
        </b-tabs>
      </div>
    </div>

    <b-modal id="newreport" title="Create Report" @ok="createReportOk" ref="newreport">
      <b-form @submit.stop.prevent="createReportSubmit">
        <b-form-group label="Report name:" label-for="name">
          <b-form-input id="name" type="text" required v-model="newReportName" />
        </b-form-group>
      </b-form>
    </b-modal>
  </b-container>
</template>

<style>
#solution-explorer {
  position: absolute;
  top: 56px;
  bottom: 0;
  left: 0;
  min-width: 1250px;
}

.solution-explorer-col {
  position: absolute;
  top: 70px;
  bottom: 0;
  width: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 15px;
}
.solution-explorer-col.s-col-1 {
  left: 0;
}
.solution-explorer-col.s-col-2 {
  left: 350px;
}
.solution-explorer-col.s-col-3 {
  left: 700px;
  right: 0;
  width: auto;
}

.custom-control-label::before,
.custom-control-label::after {
  top: 0.075rem;
}
.flip-list-move {
  transition: transform 0.2s;
}
.no-move {
  transition: transform 0s;
}
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.handle {
  cursor: ns-resize;
}
</style>
