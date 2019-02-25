<script lang="ts" src="./SplitView.ts"/>

<template>
  <div class="split-view">
    <b-row>
      <div class="list-panel col-md-4 d-none d-md-block">
        <div class="h-100">
          <div class="list-header px-3 pt-3">
            <small class="float-right pt-2">{{list.length}} of {{totalCount}}</small>
            <h1 class="h3">Configurations</h1>
            <p class="mb-0 mt-2 d-flex">
              <b-form-input class="flex-grow-1" type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
            </p>
          </div>
          <b-list-group flush class="list-content" @keydown.up.down="onKeyUp">
            <div class="border-bottom pt-1">
              <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list" :key="index" @click="setSelectedIndex(index)" v-bind:to="'/configurations/' + item.id" :replace="!!$route.params.pathMatch" class="px-3 py-2">
                <p class="mb-0">
                  {{item.id}}
                  <span class="float-right" v-show="$route.params.pathMatch == item.id"><i class="fa fa-chevron-right"></i></span>
                </p>
              </b-list-group-item>
            </div>
          </b-list-group>
        </div>
      </div>
      <div class="details-panel col py-3">
        <configuration-panel />
      </div>
    </b-row>
  </div>
</template>
