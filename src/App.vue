<template>
  <div id="app">
    <sidebar />

    <main id="main" role="main">
      <router-view />
    </main>

    <message-box />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "@/components/Sidebar.vue";
import MessageBox from "@/components/messages/MessageBox.vue";

import "@/styles/app.css";

@Component({ components: { Sidebar, MessageBox }})
export default class App extends Vue {}
</script>
