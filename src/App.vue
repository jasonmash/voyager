<template>
  <div id="app">
    <navbar />

    <main id="main" role="main">
      <router-view />
    </main>

    <message-box />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
import MessageBox from "@/components/messages/MessageBox.vue";

import "@/styles/app.css";

@Component({ components: { Navbar, MessageBox }})
export default class App extends Vue {}
</script>
