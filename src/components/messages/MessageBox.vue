<template>
  <div class="message-box">
    <b-alert :show="message.show" dismissible fade :variant="message.type"
      v-for="message in messages" :key="`m-${message.id}`">
      {{message.content}}
    </b-alert>
  </div>
</template>

<style scoped>
  .message-box {
    position: absolute;
    width: 300px;
    right: 20px;
    bottom: 0;
    z-index: 10000;
  }
</style>


<script lang="ts" src="./MessageBox.ts" />