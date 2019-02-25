<script lang="ts" src="./Menu.ts"/>

<template>
  <div class="h-100">
    <div class="list-header px-3 pt-3">
      <h1 class="h4">Data Explorer</h1>
    </div>
    <b-list-group flush class="list-content">
      <div class="pt-1 border-bottom">
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
        <b-list-group-item @click="setSelectedIndex(-1)" v-bind:to="'/configurations'" :replace="!!$route.params.id" class="px-3 py-2">
          <p class="mb-0">
            Configurations
            <span class="float-right" v-show="$route.path == '/configurations'"><i class="fa fa-chevron-right"></i></span>
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
      </div>
    </b-list-group>
  </div>
</template>
