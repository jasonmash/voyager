<template>
  <div>
    <b-dropdown right class="float-right chart-dd" size="sm" variant="outline-secondary">
      <b-dropdown-header>Projection</b-dropdown-header>
      <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'perspective'" @click="switchPerspective('perspective')">Perspective</b-dropdown-item>
      <b-dropdown-item :active="chartData.grid3D.viewControl.projection === 'orthographic'" @click="switchPerspective('orthographic')">Orthographic</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="exportChart">Export (.png)</b-dropdown-item>
      <b-dropdown-divider />
      <report-dropdown :section-index="this.sectionIndex" @addToReport="addToReport"/>
    </b-dropdown>
    <e-chart :options="chartData" :init-options="{renderer: 'canvas'}" autoresize class="chart" ref="chart" />
  </div>
</template>

<script lang="ts" src="./surface.ts" />