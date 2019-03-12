<script lang="ts" src="./SolutionExplorer.ts" />

<template>
  <b-container fluid class="py-3">
    <toolbar @refreshData="loadFilters" />
    <h1 class="h3 mb-3">Solution Explorer</h1>
    <b-row>
      <b-col sm="3" class="border-right" style="height: 85vh; overflow-y: auto">
        <h5>Attributes</h5>
        <p>Order by priority</p>

        <draggable class="border-top" v-model="filters" handle=".handle" @start="drag = true" @end="drag = false" :animation='200'>
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <attribute v-for="(filter, i) in filters" :key="filter.attribute.key" :filter="filter" :index="i"/> 
          </transition-group>
        </draggable>
      </b-col>
      <b-col sm="3" class="border-right" style="height: 85vh; overflow-y: auto">
        <b-btn size="sm" variant="outline-primary" class="float-right" v-b-modal.newreport>Create report</b-btn>
        <h5>Configurations</h5>
        <p class="mb-2">Showing {{filteredConfigurations.length}} of {{totalCount}}</p>
        <b-form-input type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
        <b-list-group flush style="position:relative;overflow-y:auto;max-height:74vh;margin-top:10px">
          <div>
            <b-list-group-item class="py-1 px-3 bg-light position-sticky" style="top:0; z-index:2">
              Optimal configurations <span class="float-right text-muted">{{list.true ? list.true.length : 0}}</span>
            </b-list-group-item>
            <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list.true" :key="'t-' + index" :class="{'px-3 py-2': true, 'bg-light': selectedConfiguration == item}" @click="selectedConfiguration = item">
              <p class="mb-0">
                {{item.id}}<br>
                <small>
                  <span v-for="a in filters.filter((a) => a.isFiltered)" :key="a.attribute.key"><b>{{a.attribute.friendlyName}}</b>: {{item.attributes[a.attribute.key]}}<br></span>
                </small>
              </p>
            </b-list-group-item>
          </div>
          <div class="border-bottom">
            <b-list-group-item class="py-1 px-3 bg-light position-sticky" style="top:0; z-index:2">
              Other configurations <span class="float-right text-muted">{{list.false ? list.false.length : 0}}</span>
            </b-list-group-item>
            <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list.false" :key="'f-' + index" :class="{'px-3 py-2': true, 'bg-light': selectedConfiguration == item}" @click="selectedConfiguration = item">
              <p class="mb-0">
                {{item.id}}<br>
                <small>
                  <span v-for="a in filters.filter((a) => a.isFiltered)" :key="a.attribute.key"><b>{{a.attribute.friendlyName}}</b>: {{item.attributes[a.attribute.key]}}<br></span>
                </small>
              </p>
            </b-list-group-item>
          </div>
        </b-list-group>
      </b-col>
      <b-col style="height: 85vh; overflow-y: auto; overflow-x: hidden">
        <configuration v-if="selectedConfiguration" :configuration="selectedConfiguration" @clearSelection="selectedConfiguration = null"/>

        <div v-else-if="filters.length === 0" class="text-center">
          <h6 class="my-3">To start, import some configurations with attributes.</h6>
        </div>

        <div v-else>
          <h5>Visualisations</h5>
          <p v-if="chartDimensions == 0" >Change the selected attribute filters to visualise the solution space, or select a configuration.</p>
          <radar-chart class="mt-4" v-if="filteredConfigurations.length < 10" :data="filteredConfigurations" />
          <div class="mt-4" v-if="chartData">
            <line-chart v-if="chartDimensions == 1" :data="chartData" class="mb-3"/>
            <scatter3d-chart v-if="chartDimensions >= 3" :data="chartData" class="mb-3"/>
            <scatter-chart v-if="chartDimensions >= 2 && chartDimensions < 5" :data="chartData" class="mb-3"/>
            <surface-chart v-if="chartDimensions == 3" :data="surfaceData" class="mb-3"/>
          </div>
        </div>
      </b-col>
    </b-row>

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
