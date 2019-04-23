<template>
  <div v-if="attribute" class="border-bottom bg-white pt-3">
    <i v-if="attribute.isFiltered" class="fa fa-arrows-alt-v handle float-right"></i>
    <b-form-checkbox class="h6 mr-3" :checked="attribute.isFiltered" @change="onFilterToggle(attribute)" :checked-value="true" :unchecked-value="false">
      {{attribute.friendlyName}}
    </b-form-checkbox>
    <div v-if="attribute.isFiltered">
      <p class="mb-2"><b>Priority:</b> {{index + 1}}</p> 
      <div class="mb-2"><b>Optimisation Aim:</b>
        <div class="d-flex justify-content-center pt-1">
          <b-form-radio-group :checked="attribute.isHigherBetter" @input="setAttributeOptimality(attribute, $event)">
            <b-form-radio :value="true">Higher is better</b-form-radio>
            <b-form-radio :value="false" class="mr-0">Lower is better</b-form-radio>
          </b-form-radio-group>   
        </div>           
      </div>
      <p class="my-2"><b>Range:</b> Between {{ attribute.filterMinValue }} and {{ attribute.filterMaxValue }}</p>
      <div class="d-flex justify-content-center">
        <range-slider :min="attribute.scaleMin" :max="attribute.scaleMax"
          :step="attribute.step" @change="onRangeChange(attribute, $event)"
          :maxValue="attribute.filterMaxValue" :minValue="attribute.filterMinValue"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Attribute.ts" />