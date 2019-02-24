<script lang="ts" src="./List.ts"/>

<template>
  <div class="h-100">
    <div class="list-header px-3 pt-3 border-bottom">
      <h2>Explorer</h2>
      <p class="mb-1 d-flex">
        <b-form-input class="flex-grow-1" type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
      </p>
    </div>
    <div class="list-content" @keydown.up.down="onKeyUp">
      <b-list-group flush>
        <b-list-group-item @click="setSelectedIndex(-1)" v-bind:to="'/overview'" :replace="!!$route.params.id" class="px-3 py-2">
          <p class="mb-0">
            Overview
            <span class="float-right" v-show="$route.path == '/overview'"><i class="fa fa-chevron-right"></i></span>
          </p>
        </b-list-group-item>
        <b-list-group-item @click="setSelectedIndex(-1)" v-bind:to="'/attributes'" :replace="!!$route.params.id" class="px-3 py-2">
          <p class="mb-0">
            Attributes
            <span class="float-right" v-show="$route.path == '/attributes'"><i class="fa fa-chevron-right"></i></span>
          </p>
        </b-list-group-item>
        <b-list-group-item @click="setSelectedIndex(-1)" v-bind:to="'/compare'" :replace="!!$route.params.id" class="px-3 py-2">
          <p class="mb-0">
            Compare
            <span class="float-right" v-show="$route.path == '/compare'"><i class="fa fa-chevron-right"></i></span>
          </p>
        </b-list-group-item>
        <b-list-group-item @click="setSelectedIndex(-1)" v-bind:to="'/solutions'" :replace="!!$route.params.id" class="px-3 py-2">
          <p class="mb-0">
            Solution Explorer
            <span class="float-right" v-show="$route.path == '/solutions'"><i class="fa fa-chevron-right"></i></span>
          </p>
        </b-list-group-item>
        <b-list-group-item @click="setSelectedIndex(-1)" v-bind:to="'/reports'" :replace="!!$route.params.id" class="px-3 py-2">
          <p class="mb-0">
            Reports
            <span class="float-right" v-show="$route.path == '/reports'"><i class="fa fa-chevron-right"></i></span>
          </p>
        </b-list-group-item>
        <b-list-group-item variant="light" class="bg-light border-bottom pt-3 pb-2 px-3">
          <span>Configurations</span>
          <small class="float-right pt-1">{{list.length}} of {{totalCount}}</small>
        </b-list-group-item>
        <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list" :key="index" @click="setSelectedIndex(index)" v-bind:to="'/configurations/' + item.id" :replace="!!$route.params.id" class="px-3 py-2">
          <p class="mb-0">
            {{item.id}}
            <span class="float-right" v-show="$route.params.id == item.id"><i class="fa fa-chevron-right"></i></span>
          </p>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>
