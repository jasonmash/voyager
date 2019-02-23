<script lang="ts" src="./Details.ts"/>

<template>
  <div v-if="value">
    <b-button size="sm" variant="outline-danger" class="mt-2 float-right" @click="deleteConfiguration">Delete</b-button>
    <h1>{{ value.id }}</h1>
    <h4>Attributes</h4>
    <ul>
      <li v-for="attribute in value.attributes" :key="`attr-${attribute.key}`">
        <b class="text-primary">{{attribute.key}}</b> - {{attribute.value}}
      </li>
    </ul>
  </div>
</template>