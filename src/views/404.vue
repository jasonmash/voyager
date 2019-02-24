<template>
  <b-row class="pt-4" align-h="center">
    <b-col lg="9" class="text-center mt-4">
      <h1>Page not found <small class="text-info">404</small></h1>
      <p>The requested page <code>{{this.$route.path}}</code> was not found.</p>
      <b-button to="/" variant="outline-secondary" replace class="mt-4"><i class="fa fa-arrow-left mr-2"></i> Back</b-button>
    </b-col>
  </b-row>
</template>
