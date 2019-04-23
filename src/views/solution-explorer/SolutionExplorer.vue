<script lang="ts" src="./SolutionExplorer.ts" />

<template>
  <b-container fluid id="solution-explorer" class="pt-3">
    <toolbar @refreshData="loadFilters" />
    <h1 class="h3 mb-3">Solution Explorer</h1>

    <div class="border-right solution-explorer-col s-col-1">
      <h5>Attributes</h5>
      <p>Order by priority</p>

      <draggable class="border-top" v-model="filters" handle=".handle" @start="isReorderingFilters = true" @end="isReorderingFilters = false" :animation='200'>
        <transition-group type="transition" :name="!isReorderingFilters ? 'flip-list' : null">
          <attribute v-for="(attribute, i) in filters" :key="attribute.key" :attribute="attribute" :index="i"/> 
        </transition-group>
      </draggable>
    </div>
    <div class="border-right solution-explorer-col s-col-2">
      <h5>Configurations</h5>
      <p class="mb-2">Showing {{configurations.length}} of {{totalCount}}</p>
      <b-form-input type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
      <configuration-list :list="list" :filters="filters" :selectedConfiguration="selectedConfiguration" @select="selectedConfiguration=$event"/>
    </div>
    <div class="solution-explorer-col s-col-3">
      <configuration v-if="selectedConfiguration" :configuration="selectedConfiguration" @clearSelection="selectedConfiguration = null"/>

      <div v-else-if="chartDimensions > 0">
        <h5 class="mb-3">Visualisations</h5>
      
        <b-tabs content-class="mt-0" no-fade lazy :key="chartDimensions">
          <b-tab title="Line" key="2" v-if="chartDimensions == 1">
            <chart-1d type="line" :data="chartData"/>
          </b-tab>
          <b-tab title="Bar" key="3" v-if="chartDimensions == 1">
            <chart-1d type="bar" :data="chartData"/>
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
          <b-tab title="Map" key="7" v-if="chartDimensions == 3">
            <map-chart :data="chartData"/>
          </b-tab>
          <b-tab title="Radar" key="8" v-if="configurations.length < 10">
            <radar-chart :data="configurations" />
          </b-tab>
        </b-tabs>
      </div>

      <div v-else-if="configurations.length > 0">
        <h4 class="text-center mt-5">No attributes selected</h4>
        <p class="text-center px-4">To visualise your solution space, select an attribute by ticking a checkbox in the left-hand column, or click on a configuration from the list. <br><br>
        For more guidance, see the <router-link to="/help">help</router-link> page.</p>
      </div>

      <div v-else>
        <h4 class="text-center mt-5">Getting started</h4>
        <p class="text-center px-4">To get started, import data into Voyager using the "Import" button in the top-right corner,<br> or <a @click="loadDemoData" href="#">load some example data</a>.</p>
        <p class="text-center px-4">For more guidance, see the <router-link to="/help">help</router-link> page.</p>
      </div>
    </div>
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
