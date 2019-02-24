<template>
  <div>
    <h1 class="mb-3">Solution Explorer</h1>
    <e-chart
      :options="data"
      :init-options="{renderer: 'canvas'}"
      autoresize
    />
  </div>
</template>

<script lang="ts" src="./Demo.ts" />
