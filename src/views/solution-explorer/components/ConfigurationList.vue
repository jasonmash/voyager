<template>
  <b-list-group flush class="config-list" v-if="list">
    <div>
      <b-list-group-item class="py-1 px-3 bg-light position-sticky list-section-header">
        Optimal configurations <span class="float-right text-muted">{{list.true ? list.true.length : 0}}</span>
      </b-list-group-item>
      <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list.true" :key="'t-' + index" :class="{'px-3 py-2': true, 'selected': selectedConfiguration == item}" @click="selectConfiguration(item)">
        <p class="mb-0">
          {{item.id}}<br>
          <small>
            <span v-for="a in filters.filter((a) => a.isFiltered)" :key="a.key"><b>{{a.friendlyName}}</b>: {{item.attributes[a.key]}}<br></span>
          </small>
        </p>
      </b-list-group-item>
    </div>
    <div class="border-bottom">
      <b-list-group-item class="py-1 px-3 bg-light position-sticky list-section-header">
        Other configurations <span class="float-right text-muted">{{list.false ? list.false.length : 0}}</span>
      </b-list-group-item>
      <b-list-group-item :ref="`i-${index}`" v-for="(item, index) in list.false" :key="'f-' + index" :class="{'px-3 py-2': true, 'selected': selectedConfiguration == item}" @click="selectConfiguration(item)">
        <p class="mb-0">
          {{item.id}}<br>
          <small>
            <span v-for="a in filters.filter((a) => a.isFiltered)" :key="a.key"><b>{{a.friendlyName}}</b>: {{item.attributes[a.key]}}<br></span>
          </small>
        </p>
      </b-list-group-item>
    </div>
  </b-list-group>
</template>

<style scoped>
  .config-list {
    position: absolute;
    overflow-y: auto;
    bottom: 0;
    top: 80px;
    width: 350px;
    margin: 10px -15px 0;
  }

  .config-list .list-group-item {
    border-left: 3px solid transparent;
  }

  .config-list .list-group-item:hover {
    background: rgba(0,0,0,0.01);
  }

  .config-list .list-group-item:active {
    background: rgba(0,0,0,0.03);
  }

  .config-list .list-group-item.selected {
    border-left: 3px solid #007bff;
    background: rgba(0,0,0,0.03);
  }

  .config-list .list-section-header,
  .config-list .list-section-header:hover,
  .config-list .list-section-header:active {
    top: 0;
    z-index: 2;
    border-top: 1px solid #ddd;
  }
</style>

<script lang="ts" src="./ConfigurationList.ts" />