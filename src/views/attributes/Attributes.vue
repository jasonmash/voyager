<script lang="ts" src="./Attributes.ts"/>

<template>
  <div>
    <h1 class="mb-3">Attributes</h1>
    <b-row>
      <b-col>
        <b-card v-for="(attribute) in attributeList" :key="attribute.key" :header="attribute.friendlyName" class="mb-3">
          <b-row>
            <b-col lg="5">
            <p><b>Key:</b> {{attribute.key}}</p>
            <p><b>Minimum Value:</b><span class="number-text"> {{attribute.minValue}}</span></p>
            <p><b>Maximum Value:</b><span class="number-text"> {{attribute.maxValue}}</span></p>
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
            </b-col>
            <b-col lg="7">
              <e-chart :options="barData(attribute)" :init-options="{renderer: 'svg'}" autoresize style="width:auto" />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
