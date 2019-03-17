<script lang="ts" src="./Report.ts" />

<template>
  <b-container fluid class="py-3" v-if="report">
    <b-dropdown class="float-right ml-2" right variant="outline-secondary">
      <b-dropdown-item @click="deleteReport">Delete report</b-dropdown-item>
    </b-dropdown>
    <b-button @click="addSection" class="float-right" variant="primary" v-b-modal.addSectionModal>
      <i class="fa fa-fw mr-2 fa-plus"></i>Add section
    </b-button>
    <h1>{{report.name}}</h1>
    
    <b-card-group columns>
      <b-card no-body header="Possible Configurations" class="mb-3" style="height: 500px; overflow-y: auto">
        <code>{{report.configurationIds}}</code>
      </b-card>
      <div v-for="(section, i) in report.sections" no-body :key="'section-' + i" :header="section.title" class="mb-3" style="height: 500px">
        <scatter-chart :data="section.data" :title="section.title" v-if="section.type == 0 && !!section.data" />
        <scatter3d-chart :data="section.data" :title="section.title" v-if="section.type == 1 && !!section.data" />
        <chart-1d v-if="section.type == 2 && !!section.data" type="bar" :data="section.data"/>
        <chart-1d v-if="section.type == 3 && !!section.data" type="line" :data="section.data"/>
      </div>
    </b-card-group>

    <b-modal title="New section" id="addSectionModal" ref="addSectionModal" @ok="saveNewSection">
      <b-form @submit.stop.prevent="saveNewSection">
        <b-form-group label="Title">
          <b-form-input v-model="newSection.title" type="text" placeholder="Enter a title" />
        </b-form-group>

        <b-form-group label="Type">
          <b-select v-model="newSectionData.type">
            <option :value="2">Bar chart</option>
            <option :value="3">Line chart</option>
            <option :value="0">2D scatter chart</option>
            <option :value="1">3D scatter chart</option>
          </b-select>
        </b-form-group>

        <b-form-group label="Axis: X">
          <b-select v-model="newSectionData.x">
            <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
          </b-select>
        </b-form-group>

        <div v-if="newSectionData.type == 0 || newSectionData.type == 1">
          <b-form-group label="Axis: Y">
            <b-select v-model="newSectionData.y">
              <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
            </b-select>
          </b-form-group>
        </div>

        <div v-if="newSectionData.type == 1">
          <b-form-group label="Axis: Z">
            <b-select v-model="newSectionData.z">
              <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
            </b-select>
          </b-form-group>
        </div>

        <div v-if="(newSectionData.type == 0 && newSectionData.y) || (newSectionData.type == 1 && newSectionData.z)">
          <b-form-group label="Bubble Size">
            <b-select v-model="newSectionData.size">
              <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
            </b-select>
          </b-form-group>

          <b-form-group v-if="newSectionData.size" label="Bubble Colour">
            <b-select v-model="newSectionData.colour">
              <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
            </b-select>
          </b-form-group>
        </div>
      </b-form>
    </b-modal>
  </b-container>
</template>
