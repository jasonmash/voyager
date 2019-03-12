<template>
  <div v-if="filter" class="border-bottom bg-white pt-3">
    <i v-if="filter.isFiltered" class="fa fa-arrows-alt-v handle float-right"></i>
    <b-form-checkbox class="h6 mr-3" v-model="filter.isFiltered" :value="true" :unchecked-value="false">
      {{filter.attribute.friendlyName}}
    </b-form-checkbox>
    <div v-if="filter.isFiltered">
      <p class="mb-2"><b>Priority:</b> {{index + 1}}</p> 
      <div class="mb-2"><b>Optimisation Aim:</b>
        <div class="d-flex justify-content-center pt-1">
          <b-form-radio-group :checked="filter.attribute.isHigherBetter" @input="setAttributeOptimality(filter.attribute, $event)">
            <b-form-radio :value="true">Higher is better</b-form-radio>
            <b-form-radio :value="false" class="mr-0">Lower is better</b-form-radio>
          </b-form-radio-group>   
        </div>           
      </div>
      <p class="my-2"><b>Range:</b> Between {{ filter.minValue }} and {{ filter.maxValue }}</p>
      <div class="d-flex justify-content-center">
        <range-slider :min="filter.attribute.scaleMin" :max="filter.attribute.scaleMax" :step="filter.attribute.step" @change="onRangeChange(filter, $event)" :maxValue="filter.maxValue" :minValue="filter.minValue"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Attribute.ts" />