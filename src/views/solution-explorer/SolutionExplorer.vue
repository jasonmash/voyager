<script lang="ts" src="./SolutionExplorer.ts" />

<template>
  <b-container fluid class="py-3">
    <h1 class="h3 mb-3">Solution Explorer</h1>
    <b-row>
      <b-col sm="3" class="border-right" style="height: 90vh; overflow-y: auto">
        <h5>Parameters</h5>
        <p>Order by priority</p>

        <draggable class="border-top" v-model="attributes" handle=".handle" @start="drag = true" @end="drag = false" :animation='200'>
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <div v-for="(attr, i) in attributes" :key="attr.attribute.key" class="border-bottom bg-white pt-3">
              <i v-if="attr.filtered" class="fa fa-bars handle float-right"></i>
              <b-form-checkbox class="h6 mr-3" v-model="attr.filtered" :value="true" :unchecked-value="false">
                {{attr.attribute.friendlyName}}
              </b-form-checkbox>
              <div v-if="attr.filtered">
                <p class="mb-1"><b>Priority:</b> {{i + 1}}</p> 
                <p class="mb-1" v-if="attr.attribute.isHigherBetter"><b>Optimisation Aim</b>: Higher is better</p>
                <p class="mb-1" v-if="!attr.attribute.isHigherBetter"><b>Optimisation Aim</b>: Lower is better</p>
                <p class="mb-2"><b>Range:</b> Between {{ attr.minValue }} and {{ attr.maxValue }}</p>
                <div class="d-flex justify-content-center">
                  <range-slider :min="attr.attribute.scaleMin" :max="attr.attribute.scaleMax" :step="attr.attribute.step" @change="onRangeChange(attr, $event)" :maxValue="attr.maxValue" :minValue="attr.minValue"/>
                </div>
              </div>
            </div>
          </transition-group>
        </draggable>
      </b-col>
      <b-col sm="3" class="border-right" style="height: 90vh; overflow-y: auto">
        <h5>Matching Configurations</h5>
        <p class="mb-2">Showing {{list.length}} of {{totalCount}}</p>
        <b-list-group flush>
          <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list" :key="index" :class="{'px-3 py-2': true, 'bg-light': selectedConfiguration == item}" @click="selectedConfiguration = item">
            <p class="mb-0">
              {{item.id}}<br>
              <small>
                <span v-for="a in attributes.filter((a) => a.filtered)" :key="a.attribute.key"><b>{{a.attribute.friendlyName}}</b>: {{item.attributes[a.attribute.key]}}<br></span>
              </small>
            </p>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col style="height: 90vh; overflow-y: auto; overflow-x: hidden">
        <div v-if="selectedConfiguration" class="mb-4">
          <b-btn size="sm" variant="outline-secondary" class="float-right" @click="selectedConfiguration = null"><i class="fa fa-times fa-fw"></i></b-btn>
          <h5>Selected Configuration</h5>
          <b-card no-body :header="selectedConfiguration.id" class="mb-3">
            <b-list-group flush>
              <b-list-group-item v-for="attr in attributes" :key="`attr-${attr.attribute.key}`">
                <span>{{attr.attribute.friendlyName}}:</span>
                <span class="float-right number-text">{{selectedConfiguration.attributes[attr.attribute.key]}}</span>
              </b-list-group-item>
              <b-list-group-item>
                <radar-chart :data="[selectedConfiguration]" />
              </b-list-group-item>
              <b-list-group-item v-if="selectedConfiguration.structure.components.length > 0" >
                <structure-chart :data="selectedConfiguration.structure" />
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </div>

        <div v-else>
          <b-btn size="sm" variant="outline-primary" class="float-right" v-b-modal.newreport>Add to report</b-btn>
          <h5>Visualisations</h5>
          <div class="mt-4" v-if="chartData">
            <line-chart v-if="chartDimensions == 1" :data="chartData" class="mb-3"/>
            <scatter-chart v-if="chartDimensions >= 2 && chartDimensions < 5" :data="chartData" class="mb-3"/>
            <scatter3d-chart v-if="chartDimensions >= 3" :data="chartData" class="mb-3"/>
          </div>
          <radar-chart class="mt-4" v-if="list.length < 10" :data="list" />
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
