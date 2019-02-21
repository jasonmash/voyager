<template>
  <div>
    <b-row>
      <b-col md="5">
        <e-chart
          :options="radarData"
          :init-options="{renderer: 'svg'}"
          autoresize
        />
      </b-col>
      <b-col md="5">
        <e-chart
          :options="data3d"
          :init-options="{renderer: 'canvas'}"
          autoresize
        />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts" src="./Demo.ts" />
