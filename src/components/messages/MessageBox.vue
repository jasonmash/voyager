<template>
  <div class="message-box">
    <b-alert show dismissible fade :variant="message.type" :class="{'message-active': message.show}"
      v-for="message in messages" :key="`m-${message.id}`">
      {{message.content}}
    </b-alert>
  </div>
</template>

<style>
  .message-box {
    position: absolute;
    width: 300px;
    right: 20px;
    bottom: 0;
    z-index: 10000;
  }

  .message-box > .alert.message-active {
    right: 0px;
    opacity: 1;
  }
 
  .message-box > .alert,
  .message-box > .alert.fade-enter-active,
  .message-box > .alert.alert.fade-leave-active,
  .message-box > .alert.fade-enter,
  .message-box > .alert.fade-leave-to {
    transition: all ease-in-out 0.2s;
    right: -30px;
    opacity: 0;
  }
</style>


<script lang="ts" src="./MessageBox.ts" />