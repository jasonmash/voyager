<script lang="ts" src="./List.ts"/>

<template>
  <div class="h-100">
    <div class="list-header px-3 pt-3 border-bottom">
      <h2>Configurations</h2>
      <p class="mb-1 d-flex">
        <b-form-input class="flex-grow-1" type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
      </p>
      <p class="mb-2">
        <small class="pt-2">Showing {{list.length}} of {{totalCount}} configurations</small>
      </p>
    </div>
    <div class="list-content">
      <b-list-group flush>
        <b-list-group-item v-for="(item, index) in list" :key="index" v-bind:to="'/configurations/' + item.id" :replace="!!$route.params.id" class="px-3">
          <p class="mb-0 h6">
            {{item.id}}
          </p>
          <small class="mb-0">{{item.components.length}} components</small>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>
