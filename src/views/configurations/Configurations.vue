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
        <h4>Filter</h4>
        <div v-for="(attr, i) in attributes" :key="attr.attribute.key" class="mb-3">
          <label :for="'range-' + i">{{attr.attribute.friendlyName}}</label>

          <b-input-group :prepend="attr.attribute.scaleMin.toString()" :append="attr.attribute.scaleMax.toString()" size="sm">
            <b-form-input type="range" :id="'range-' + i" v-model="attr.maxValue" :min="attr.attribute.scaleMin" :max="attr.attribute.scaleMax" />
          </b-input-group>
          <div class="mt-2">Value: {{ attr.minValue }} - {{ attr.maxValue }}</div>
        </div>
        <h4>Order By</h4>

      </b-container>
    </div>
  </div>
</template>
