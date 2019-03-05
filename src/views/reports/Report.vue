<script lang="ts" src="./Report.ts" />

<template>
  <b-container fluid class="py-3" v-if="report">
    <b-button @click="addSection" class="float-right" variant="primary" v-b-modal.addSectionModal>
      <i class="fa fa-fw mr-2 fa-plus"></i>Add section
    </b-button>
    <h1>{{report.name}}</h1>
    
      <b-card no-body header="Possible Configurations" class="mb-3" style="max-height: 500px; overflow-y: auto">
        <code>{{report.configurationIds}}</code>
      </b-card>
    <b-card-group columns>
      <b-card v-for="(section, i) in report.sections" no-body :key="'section-' + i" :header="section.title" class="mb-3">
        <scatter-chart :data="section.data" v-if="section.type == 0 && !!section.data" />
        <scatter3d-chart :data="section.data" v-if="section.type == 1 && !!section.data" />
        <bar-chart :data="section.data" v-if="section.type == 2 && !!section.data" />
        <line-chart :data="section.data" v-if="section.type == 3 && !!section.data" />
      </b-card>
    </b-card-group>

    <b-modal title="New section" id="addSectionModal" ref="addSectionModal">
      <form>
        <label>Title</label>
        <b-form-input v-model="newSection.title" type="text" placeholder="Enter a title" />

        <label>Type</label>
        <b-select v-model="selectedChartType">
          <option :value="2">Bar chart</option>
          <option :value="3">Line chart</option>
          <option :value="0">2D scatter chart</option>
          <option :value="1">3D scatter chart</option>
        </b-select>

        <label>Axis: x</label>
        <b-select @change="updateAttr">
          <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
        </b-select>

        <div v-if="selectedChartType == 0 || selectedChartType == 1">
            <label>Axis: y</label>
            <b-select @change="updateAttr">
              <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
            </b-select>
        </div>

        <div v-if="selectedChartType == 1">
          <label>Axis: z</label>
          <b-select @change="updateAttr">
            <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
          </b-select>
        </div>

        <div v-if="selectedChartType == 0 || selectedChartType == 1">
          <label>Bubble size</label>
          <b-select @change="updateAttr">
            <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
          </b-select>

          <label>Bubble colour</label>
          <b-select @change="updateAttr">
            <option v-for="attr in attributes" :key="attr.key" :value="attr.key">{{attr.friendlyName}}</option>
          </b-select>
        </div>

        <b-btn variant="success" @click="saveNewSection">Add</b-btn>
      </form>
    </b-modal>
  </b-container>
</template>
