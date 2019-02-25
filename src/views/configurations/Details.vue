<script lang="ts" src="./Details.ts"/>

<template>
  <div v-if="value">
    <b-button size="sm" variant="outline-danger" class="mt-2 float-right" @click="deleteConfiguration">Delete</b-button>
    <h1 class="mb-3">{{ value.id }}</h1>
    <b-row>
      <b-col xl="6">
        <b-card no-body header="Attributes" class="mb-3">
          <b-list-group flush>
            <b-list-group-item v-for="attribute in value.attributes" :key="`attr-${attribute.key}`">
              <span><router-link :to="'/attributes/' + attribute.key">{{getAttrFriendlyName(attribute.key)}}</router-link>:</span>
              <span class="float-right number-text">{{attribute.value}}</span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card header="Radar chart" no-body class="mb-3">
          <e-chart :options="radarData" :init-options="{renderer: 'svg'}" autoresize style="width:auto" />
        </b-card>
      </b-col>
      <b-col xl="6">
        <b-card header="JSON" no-body class="mb-3">
          <b-card-body>
            <code>
              {{JSON.stringify(value)}}
            </code>
          </b-card-body>
        </b-card>
        <b-card header="Components" no-body class="mb-3">
          <b-list-group flush>
            <b-list-group-item v-for="component in value.components" :key="`comp-${component}`">
              <span>{{component}}</span>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
