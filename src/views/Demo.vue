<template>
  <div>
    <b-row>
      <b-col md="5">
        <e-chart
          :options="data"
          :init-options="{renderer: 'canvas'}"
          autoresize
        />
      </b-col>
      <b-col md="5">
        <e-chart
          :options="data2"
          :init-options="{renderer: 'canvas'}"
          autoresize
        />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts" src="./Demo.ts" />
