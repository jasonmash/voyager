<script lang="ts" src="./Details.ts"/>

<template>
  <div v-if="value">
    <b-button size="sm" variant="outline-danger" class="mt-2 float-right" @click="deleteConfiguration">Delete</b-button>
    <h1 class="mb-3">{{ value.id }}</h1>
    <b-row>
      <b-col md="5">
        <b-card no-body header="Attributes">
          <b-list-group flush>
            <b-list-group-item v-for="attribute in value.attributes" :key="`attr-${attribute.key}`">
              <span>{{getAttrFriendlyName(attribute.key)}}:</span>
              <span class="float-right number-text">{{attribute.value}}</span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col md="7">
        <b-card header="Radar chart" no-body>
          <e-chart :options="radarData" :init-options="{renderer: 'svg'}" autoresize style="width:auto" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style>
  .number-text {
    font-feature-settings: 'cv01' 1, 'cv02' 1, 'cv03' 1, 'cv04' 1, 'cv09' 1, 'tnum' 1;
  }
</style>