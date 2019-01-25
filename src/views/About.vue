<template>
  <div>
    <b-row>
      <b-col md="7">
        <Surface3DPlot />
      </b-col>
      <b-col>
        <b-card title="Metrics">

          <b-form-group label="Heading">
            <b-form-radio-group id="radios2" name="radioSubComponent">
              <b-form-radio value="first">Toggle this custom radio</b-form-radio><br>
              <b-form-radio value="second">Or toggle this other custom radio</b-form-radio><br>
              <b-form-radio value="third" disabled>This one is Disabled</b-form-radio><br>
              <b-form-radio :value="{fourth: 4}">This is the 4th radio</b-form-radio>
            </b-form-radio-group>
          </b-form-group>


          <b-form-group label="Heading 2">
            <b-form-radio-group id="radios2" name="radioSubComponent">
              <b-form-radio value="first">Toggle this custom radio</b-form-radio><br>
              <b-form-radio value="second">Or toggle this other custom radio</b-form-radio><br>
              <b-form-radio value="third" disabled>This one is Disabled</b-form-radio><br>
              <b-form-radio :value="{fourth: 4}">This is the 4th radio</b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-button variant="primary">Save</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts" src="./About.ts" />
