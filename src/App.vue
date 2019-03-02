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

@Component({ components: { Sidebar, MessageBox }})
export default class App extends Vue {}
</script>

<style>
#app {
  min-width: 1000px;
}

body {
  font-size: .875rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.number-text {
  font-feature-settings: 'cv01' 1, 'cv02' 1, 'cv03' 1, 'cv04' 1, 'cv09' 1, 'tnum' 1;
}

#main {
  top: 0;
  bottom: 0;
  left: 220px;
  width: calc(100% - 220px);
  min-width: calc(1000px - 220px);
  overflow-y: auto;
  position: absolute;
}

</style>