<script lang="ts" src="./SolutionExplorer.ts" />

<template>
  <b-container fluid class="py-3">
    <div class="float-right">
      <b-btn right size="sm" class="mr-3" variant="outline-secondary" @click="importData">
        <i class="fa fa-fw fa-upload mr-2"></i>Import
      </b-btn>
      <b-btn right size="sm" class="mr-3" variant="outline-secondary" @click="exportData">
        <i class="fa fa-fw fa-download mr-2"></i>Export
      </b-btn>
      <b-btn right size="sm" variant="outline-secondary" @click="resetData">
        <i class="fa fa-fw fa-trash-alt mr-2"></i>Reset
      </b-btn>
      <b-form-file plain id="fileinput" ref="fileinput" v-model="files" multiple accept=".json" @change="uploadFile"/>
    </div>
    <h1 class="h3 mb-3">Solution Explorer</h1>
    <b-row>
      <b-col sm="3" class="border-right" style="height: 85vh; overflow-y: auto">
        <h5>Attributes</h5>
        <p>Order by priority</p>

        <draggable class="border-top" v-model="filters" handle=".handle" @start="drag = true" @end="drag = false" :animation='200'>
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <div v-for="(filter, i) in filters" :key="filter.attribute.key" class="border-bottom bg-white pt-3">
              <i v-if="filter.isFiltered" class="fa fa-bars handle float-right"></i>
              <b-form-checkbox class="h6 mr-3" v-model="filter.isFiltered" :value="true" :unchecked-value="false">
                {{filter.attribute.friendlyName}}
              </b-form-checkbox>
              <div v-if="filter.isFiltered">
                <p class="mb-2"><b>Priority:</b> {{i + 1}}</p> 
                <div class="mb-2"><b>Optimisation Aim:</b>
                  <div class="d-flex justify-content-center pt-1">
                    <b-form-radio-group :checked="filter.attribute.isHigherBetter" @input="setAttributeOptimality(filter.attribute, $event)">
                      <b-form-radio :value="true">Higher is better</b-form-radio>
                      <b-form-radio :value="false" class="mr-0">Lower is better</b-form-radio>
                    </b-form-radio-group>   
                  </div>           
                </div>
                <p class="my-2"><b>Range:</b> Between {{ filter.minValue }} and {{ filter.maxValue }}</p>
                <div class="d-flex justify-content-center">
                  <range-slider :min="filter.attribute.scaleMin" :max="filter.attribute.scaleMax" :step="filter.attribute.step" @change="onRangeChange(filter, $event)" :maxValue="filter.maxValue" :minValue="filter.minValue"/>
                </div>
              </div>
            </div>
          </transition-group>
        </draggable>
      </b-col>
      <b-col sm="3" class="border-right" style="height: 85vh; overflow-y: auto">
        <b-btn size="sm" variant="outline-primary" class="float-right" v-b-modal.newreport>Create report</b-btn>
        <h5>Configurations</h5>
        <p class="mb-2">Showing {{filteredConfigurations.length}} of {{totalCount}}</p>
        <b-form-input type="text" placeholder="Search..." size="sm" v-model="searchQuery" autofocus name="search"></b-form-input>
        <b-list-group flush style="position:relative;overflow-y:auto;max-height:74vh;margin-top:10px">
          <div>
            <b-list-group-item class="py-1 px-3 bg-light position-sticky" style="top:0; z-index:2">
              Optimal configurations <span class="float-right text-muted">{{list.true ? list.true.length : 0}}</span>
            </b-list-group-item>
            <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list.true" :key="'t-' + index" :class="{'px-3 py-2': true, 'bg-light': selectedConfiguration == item}" @click="selectedConfiguration = item">
              <p class="mb-0">
                {{item.id}}<br>
                <small>
                  <span v-for="a in filters.filter((a) => a.isFiltered)" :key="a.attribute.key"><b>{{a.attribute.friendlyName}}</b>: {{item.attributes[a.attribute.key]}}<br></span>
                </small>
              </p>
            </b-list-group-item>
          </div>
          <div class="border-bottom">
            <b-list-group-item class="py-1 px-3 bg-light position-sticky" style="top:0; z-index:2">
              Other configurations <span class="float-right text-muted">{{list.false ? list.false.length : 0}}</span>
            </b-list-group-item>
            <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list.false" :key="'f-' + index" :class="{'px-3 py-2': true, 'bg-light': selectedConfiguration == item}" @click="selectedConfiguration = item">
              <p class="mb-0">
                {{item.id}}<br>
                <small>
                  <span v-for="a in filters.filter((a) => a.isFiltered)" :key="a.attribute.key"><b>{{a.attribute.friendlyName}}</b>: {{item.attributes[a.attribute.key]}}<br></span>
                </small>
              </p>
            </b-list-group-item>
          </div>
        </b-list-group>
      </b-col>
      <b-col style="height: 85vh; overflow-y: auto; overflow-x: hidden">
        <div v-if="selectedConfiguration" class="mb-4 bg-light p-3 border rounded" style="box-shadow: 0px 2px 3px rgba(0,0,0,0.2)">
          <b-btn size="sm" variant="outline-danger" class="float-right" @click="selectedConfiguration = null"><i class="fa fa-times fa-fw"></i></b-btn>
          <h6 class="text-muted">Selected Configuration</h6>
          <h5 class="mb-4">{{selectedConfiguration.id}}</h5>
          <b-row>
            <b-col sm="6">
              <b-card no-body class="mb-3">
                <b-list-group flush>
                  <b-list-group-item v-for="filter in filters" :key="`attr-${filter.attribute.key}`">
                    <span>{{filter.attribute.friendlyName}}:</span>
                    <span class="float-right number-text">{{selectedConfiguration.attributes[filter.attribute.key]}}</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
              <radar-chart :data="[selectedConfiguration]" height="330" v-if="selectedConfiguration.structure.components.length > 0" />
            </b-col>
            <b-col sm="6">
                <structure-chart v-if="selectedConfiguration.structure.components.length > 0" :data="selectedConfiguration.structure" :height="(350 + (46 * filters.length)).toPrecision(3)"/>
                <radar-chart :data="[selectedConfiguration]" v-else />
            </b-col>
          </b-row>
        </div>

        <div v-else-if="filters.length === 0" class="text-center">
          <h6 class="my-3">To start, import some configurations and attributes.</h6>
        </div>

        <div v-else>
          <h5>Visualisations</h5>
          <p v-if="chartDimensions == 0" >Change the selected attribute filters to visualise the solution space.</p>
          <radar-chart class="mt-4" v-if="filteredConfigurations.length < 10" :data="filteredConfigurations" />
          <div class="mt-4" v-if="chartData">
            <line-chart v-if="chartDimensions == 1" :data="chartData" class="mb-3"/>
            <scatter3d-chart v-if="chartDimensions >= 3" :data="chartData" class="mb-3"/>
            <scatter-chart v-if="chartDimensions >= 2 && chartDimensions < 5" :data="chartData" class="mb-3"/>
            <surface-chart v-if="chartDimensions == 3" :data="surfaceData" class="mb-3"/>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-modal id="newreport" title="Create Report" @ok="createReportOk" ref="newreport">
      <b-form @submit.stop.prevent="createReportSubmit">
        <b-form-group label="Report name:" label-for="name">
          <b-form-input id="name" type="text" required v-model="newReportName" />
        </b-form-group>
      </b-form>
    </b-modal>
  </b-container>
</template>

<style>
.custom-control-label::before,
.custom-control-label::after {
  top: 0.075rem;
}
.flip-list-move {
  transition: transform 0.2s;
}
.no-move {
  transition: transform 0s;
}
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.handle {
  cursor: ns-resize;
}

#fileinput {
  /* Position file input box off-screen, and trigger via code */
  position: absolute;
  top: -100px;
  left: -100px;
  height: 1px;
  width: 1px;
  overflow: hidden;
}
</style>
