<script lang="ts" src="./Attributes.ts" />

<template>
  <div>
    <div class="list-col border-right">
      <div class="list-header px-3 pb-3 border-bottom">
        <h1 class="h3 pt-3 mb-1">Attributes</h1>
        <p class="mb-2">Showing {{list.length}} of {{totalCount}}</p>
        <b-form-input type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
      </div>
      <b-list-group flush style="margin-top: -1px" @keydown.up.down="onKeyUp">
        <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list" :key="index" @click="setSelectedIndex(index)" v-bind:to="'/attributes/' + item.key" :replace="!!$route.params.id" class="px-3 py-2">
          <p class="mb-0">
            {{item.friendlyName}}
            <span class="float-right" v-show="$route.params.id == item.key"><i class="fa fa-chevron-right"></i></span>
          </p>
        </b-list-group-item>
      </b-list-group>
    </div>

    <div class="detail-col bg-light" v-if="!!$route.params.id">
      <attribute-details/>
    </div>
  </div>
</template>
