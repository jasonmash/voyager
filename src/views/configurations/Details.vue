<script lang="ts" src="./Details.ts"/>

<template>
  <b-container fluid v-if="value" class="py-3">
    <b-button size="sm" variant="outline-secondary" class="mt-2 float-right" replace to="/configurations"><i class="fa fa-fw fa-times"></i></b-button>
    <h1 class="mb-3">{{ value.id }}</h1>
    <b-card-group deck>
        <b-card no-body header="Attributes" class="mb-3">
          <b-row>
            <b-col>
              <b-list-group flush>
                <b-list-group-item v-for="attribute in attributeInfo" :key="`attr-${attribute.key}`">
                  <span><router-link :to="'/attributes/' + attribute.key">{{getAttrFriendlyName(attribute.key)}}</router-link>:</span>
                  <span class="float-right number-text">{{value.attributes[attribute.key]}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col>
              <e-chart :options="radarData" :init-options="{renderer: 'svg'}" autoresize style="width:auto; height: 250px;" />
            </b-col>
          </b-row>
        </b-card>
    </b-card-group>
    <b-row v-if="value.structure.components.length > 0">
      <b-col>
        <b-card header="Structure" no-body class="mb-3" v-if="value.structure.components.length > 0">
          <e-chart :options="graphData" :init-options="{}" autoresize style="width:auto; height: 100%; min-height: 400px" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
