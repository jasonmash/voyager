<script lang="ts" src="./Attributes.ts"/>

<template>
  <div>
    <h1 class="mb-3">Attributes</h1>
    <b-card-group columns>
      <b-card v-for="(attribute) in attributeList" :key="attribute.key" :header="attribute.friendlyName" class="mb-3">
        <p><b>Key:</b><span class="float-right"> {{attribute.key}}</span></p>
        <p><b>Minimum Value:</b><span class="number-text float-right"> {{attribute.minValue}}</span></p>
        <p><b>Maximum Value:</b><span class="number-text float-right"> {{attribute.maxValue}}</span></p>
        <p><b>Optimum Value:</b>
          <b-form-radio-group :checked="attribute.isHigherBetter" @input="change(attribute, $event)">
            <b-form-radio :value="true">Higher is better</b-form-radio>
            <b-form-radio :value="false">Lower is better</b-form-radio>
          </b-form-radio-group>
        </p>
        <p><b>Optimal Configuration(s):</b>
          <ul>
            <li v-for="(config, i) in configurationsFor(attribute).bestConfigurations.map((a) => a.id)" :key="'c-' + i">
              <router-link :to="'/configurations/' + config">{{config}}</router-link>
            </li>
          </ul>
        </p>
        <e-chart :options="barData(attribute)" :init-options="{renderer: 'svg'}" autoresize style="width:auto" />
      </b-card>
    </b-card-group>
  </div>
</template>


<style>
  .card-columns {
    column-count: 1;
  }
  @media (min-width : 992px) {
    .card-columns {
      column-count: 2;
    }
  }
  @media (min-width : 1200px) {
    .card-columns {
      column-count: 3;
    }
  }
</style>
