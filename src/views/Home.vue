<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png">
    <HomeContent msg="Welcome to Voyager"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeContent from "@/components/Home.vue"; // @ is an alias to /src

@Component({
  components: {
    HomeContent,
  },
})
export default class Home extends Vue {}
</script>
