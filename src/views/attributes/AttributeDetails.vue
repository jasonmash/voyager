<script lang="ts" src="./AttributeDetails.ts"/>

<template>
  <div v-if="attribute">
    <h1 class="mb-3">{{attribute.friendlyName}}</h1>
    <b-card-group deck>
      <b-card no-body header="Properties" class="mb-3">
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
      <b-card header="Configurations" no-body class="mb-3">
        <div style="max-height: 600px; overflow-y:scroll">
          <b-table :items="tableData.items" :fields="tableData.fields" small>
            <template slot="id" slot-scope="data">
              <b-link :to="'/configurations/' + data.value">{{ data.value }}</b-link>
            </template>
            <template slot="value" slot-scope="data">
              <span class="number-text">{{ data.value }}</span>
            </template>
          </b-table>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

