<script lang="ts" src="./SolutionExplorer.ts" />

<template>
  <b-container fluid class="py-3">
    <h1 class="h3 mb-3">Solution Explorer</h1>
    <b-row>
      <b-col sm="3" class="border-right">
        <h5>Parameters</h5>
        <p>Order by priority</p>

        <draggable class="border-top" v-model="attributes" handle=".handle" @start="drag = true" @end="drag = false" :animation='200'>
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <div v-for="attr in attributes" :key="attr.attribute.key" class="border-bottom bg-white pt-3">
              <i v-if="attr.filtered" class="fa fa-bars handle float-right"></i>
              <b-form-checkbox class="h6 mr-3" v-model="attr.filtered" :value="true" :unchecked-value="false">{{attr.attribute.friendlyName}}</b-form-checkbox>
              <range-slider v-if="attr.filtered" :min="attr.attribute.scaleMin" :max="attr.attribute.scaleMax" :step="attr.attribute.step" @change="onRangeChange(attr, $event)" :maxValue="attr.maxValue" :minValue="attr.minValue"/>

              <div class="mb-3" v-if="attr.filtered">Value: {{ attr.minValue }} - {{ attr.maxValue }}</div>
            </div>
          </transition-group>
        </draggable>
      </b-col>
      <b-col sm="3" class="border-right" style="height: 88vh; overflow-y: auto">
        <h5>Matching Configurations</h5>
        <b-list-group flush>
          <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list" :key="index" v-bind:to="'/configurations/' + item.id" :replace="!!$route.params.id" class="px-3 py-2">
            <p class="mb-0">
              {{item.id}}<br>
              <small><code>{{item.attributes}}</code></small>
            </p>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col style="overflow-x: hidden">
        <h5>Visualisations</h5>
        <b-card no-body v-if="chartData">
          <bar-chart v-if="chartType == 3" :data="chartData" />
          <line-chart v-if="chartType == 3" :data="chartData" />
          <scatter2d-chart v-if="chartType == 0" :data="chartData" />
          <scatter3d-chart v-if="chartType == 1" :data="chartData" />
        </b-card>
      </b-col>
    </b-row>
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
