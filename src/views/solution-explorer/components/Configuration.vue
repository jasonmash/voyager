<template>
  <div v-if="configuration">
    <b-btn size="sm" variant="outline-danger" class="float-right" @click="$emit('clearSelection')"><i class="fa fa-times fa-fw"></i></b-btn>
    <h6 class="text-muted">Selected Configuration</h6>
    <h5 class="mb-3">{{configuration.id}}</h5>

    <b-tabs>
      <b-tab title="Attributes" key="0" class="p-0">
        <b-row>
          <b-col sm="6" class="pt-2">
            <b-list-group flush>
              <b-list-group-item v-for="attribute in attributes" :key="`attr-${attribute.key}`">
                <span>{{attribute.friendlyName}}:</span>
                <span class="float-right number-text">{{configuration.attributes[attribute.key]}}</span>
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col sm="6">
            <radar-chart :data="[configuration]" />
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Structure" v-if="configuration.structure.components.length > 0" key="1" class="p-0">
          <structure-chart :data="configuration.structure" :height="(350 + (46 * attributes.length)).toPrecision(3)"/>
      </b-tab>
      <b-tab v-for="(block, i) in content" :key="`k-` + i" :title="block.title" no-body class="mb-3">
        <b-embed v-if="block.type == 0" type="iframe" :src="`data:text/html;charset=utf-8,` + block.value"></b-embed>
        <b-img v-if="block.type == 1" :src="`data:image/svg+xml;base64,` + block.value"></b-img>
        <b-img v-if="block.type == 2" :src="`data:image/png;base64,` + block.value"></b-img>
        <b-img v-if="block.type == 3" :src="`data:image/jpeg;base64,` + block.value"></b-img>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./Configuration.ts" />

<style scoped>
</style>
