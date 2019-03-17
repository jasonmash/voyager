<template>
  <div v-if="configuration" class="mb-4 bg-light p-3 border rounded" style="box-shadow: 0px 2px 3px rgba(0,0,0,0.2)">
    <b-btn size="sm" variant="outline-danger" class="float-right" @click="$emit('clearSelection')"><i class="fa fa-times fa-fw"></i></b-btn>
    <h6 class="text-muted">Selected Configuration</h6>
    <h5 class="mb-4">{{configuration.id}}</h5>
    <b-row>
      <b-col sm="6">
        <b-card no-body class="mb-3">
          <b-list-group flush>
            <b-list-group-item v-for="attribute in attributes" :key="`attr-${attribute.key}`">
              <span>{{attribute.friendlyName}}:</span>
              <span class="float-right number-text">{{configuration.attributes[attribute.key]}}</span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card header="Properties" v-if="configuration.structure.components.length > 0" no-body>
          <radar-chart :data="[configuration]" height="334" />
        </b-card>
      </b-col>
      <b-col sm="6" class="pl-0">
        <b-card v-if="configuration.structure.components.length > 0" header="Structure" no-body>
          <structure-chart :data="configuration.structure" :height="(350 + (46 * attributes.length)).toPrecision(3)"/>
        </b-card>
        <b-card v-else header="Properties" no-body>
          <radar-chart :data="[configuration]" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts" src="./Configuration.ts" />

<style scoped>
</style>
