<script lang="ts" src="./Attributes.ts"/>

<template>
  <div>
    <h1 class="mb-3">Attributes</h1>
    <b-card-group columns>
      <b-card no-body v-for="(attribute) in attributeList" :key="attribute.key" :header="attribute.friendlyName" class="mb-3">
        <b-list-group flush>
          <b-list-group-item>
            <span>Key:</span>
            <span class="float-right">{{attribute.key}}</span>
          </b-list-group-item>
          <b-list-group-item>
            <span>Minimum Value:</span>
            <span class="float-right number-text">{{attribute.minValue}}</span>
          </b-list-group-item>
          <b-list-group-item>
            <span>Maximum Value:</span>
            <span class="float-right number-text">{{attribute.maxValue}}</span>
          </b-list-group-item>
          <b-list-group-item>
            <span>Optimisation Aim:</span>
            <span class="float-right">
              <b-form-radio-group :checked="attribute.isHigherBetter" @input="change(attribute, $event)">
                <b-form-radio :value="true" class="mr-0">Higher is better</b-form-radio><br>
                <b-form-radio :value="false" class="mr-0">Lower is better</b-form-radio>
              </b-form-radio-group>
            </span>
          </b-list-group-item>
          <b-list-group-item>
            <span>Optimal Configuration(s):</span>
            <span class="float-right">
              <ul class="mb-0">
                <li v-for="(config, i) in configurationsFor(attribute).bestConfigurations.map((a) => a.id)" :key="'c-' + i">
                  <router-link :to="'/configurations/' + config">{{config}}</router-link>
                </li>
              </ul>
            </span>
          </b-list-group-item>
          <b-list-group-item>
            <e-chart :options="barData(attribute)" :init-options="{renderer: 'svg'}" autoresize style="width:auto; height: 300px" />
          </b-list-group-item>
        </b-list-group>
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
  @media (min-width : 1300px) {
    .card-columns {
      column-count: 3;
    }
  }
</style>
