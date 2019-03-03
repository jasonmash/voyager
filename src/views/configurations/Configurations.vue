<script lang="ts" src="./Configurations.ts" />

<template>
  <div>
    <div class="list-col border-right">
      <div class="list-header px-3 pb-3 border-bottom">
        <h1 class="h3 pt-3 mb-1">Configurations</h1>
        <p class="mb-2">Showing {{list.length}} of {{totalCount}}</p>
        <b-form-input type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
      </div>
      <b-list-group flush style="margin-top: -1px" @keydown.up.down="onKeyUp">
        <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list" :key="index" v-bind:to="'/configurations/' + item.id" :replace="!!$route.params.id" @click="setSelectedIndex(index)" class="px-3 py-2">
          <p class="mb-0">
            {{item.id}}
            <span class="float-right" v-show="$route.params.id == item.id"><i class="fa fa-chevron-right"></i></span>
          </p>
        </b-list-group-item>
      </b-list-group>
    </div>

    <div class="detail-col bg-light" v-if="!!$route.params.id">
      <configuration-details/>
    </div>

    <div class="detail-col" v-else>
      <b-container fluid class="py-3">
        <h3>Overview</h3>
        <h5>Filter</h5>
        <div v-for="(attr, i) in attributes" :key="attr.attribute.key" class="mb-3">
          <label :for="'range-' + i">{{attr.attribute.friendlyName}}</label>
          
          <range-slider :min="attr.attribute.scaleMin" :max="attr.attribute.scaleMax" :step="attr.attribute.step" @change="onRangeChange(attr, $event)" :maxValue="attr.maxValue" :minValue="attr.minValue"/>

          <div class="mt-2">Value: {{ attr.minValue }} - {{ attr.maxValue }}</div>
        </div>
        <b-btn variant="primary" size="sm" v-b-modal.newreport>Create report</b-btn>
      </b-container>
    </div>

    <b-modal id="newreport" title="Create Report">
      <b-form>
        <b-form-group label="Report name:" label-for="name">
          <b-form-input id="name" type="text" required />
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>
