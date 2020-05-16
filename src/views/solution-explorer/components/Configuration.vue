<template>
  <div v-if="configuration" class="config-sidebar mt-n3 p-3 bg-light">
    <button type="button" aria-label="Close" class="close text-dark float-left mr-2" @click="$emit('clearSelection')"><svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" alt="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-x b-icon bi"><g><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"></path></g></svg></button>
    <h5 class="mb-3">{{configuration.id}}</h5>

    <b-tabs>
      <b-tab title="Attributes" key="0" class="tab-style p-0">
        <b-row>
          <b-col sm="6" class="pt-2">
            <b-list-group flush>
              <b-list-group-item v-for="attribute in attributes" :key="`attr-${attribute.key}`">
                <span>{{attribute.friendlyName}}:</span>
                <span class="float-right number-text">{{configuration.attributes[attribute.key]}}</span>
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col sm="6">
            <radar-chart :data="[configuration]" />
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Structure" v-if="configuration.structure.components.length > 0" key="1" class="tab-style p-0">
          <structure-chart :data="configuration.structure" :height="(350 + (46 * attributes.length)).toPrecision(3)"/>
      </b-tab>
      <b-tab v-for="(block, i) in content" :key="`k-` + i" :title="block.title" no-body class="tab-style mb-3">
        <b-embed v-if="block.type == 0" type="iframe" :src="`data:text/html;charset=utf-8,` + block.value"></b-embed>
        <b-img v-if="block.type == 1" :src="`data:image/svg+xml;base64,` + block.value"></b-img>
        <b-img v-if="block.type == 2" :src="`data:image/png;base64,` + block.value"></b-img>
        <b-img v-if="block.type == 3" :src="`data:image/jpeg;base64,` + block.value"></b-img>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./Configuration.ts" />

<style>
.config-sidebar {
  position: absolute;
  top: 18px;
  width: calc(100%);
  z-index: 9;
  right: 0;
}

.slide-fade-enter-active {
  transition: all .1s ease-out;
}
.slide-fade-leave-active {
  transition: all .1s ease-in;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.config-sidebar.active {
  position: absolute;
  right: 0;
  opacity: 1;
}

.tab-style {
  background: white;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.nav-tabs .nav-link,
.nav-tabs .nav-item .nav-link {
  outline: none;
}

.b-sidebar.b-sidebar-right > .b-sidebar-header .close {
  margin-right: 12px;
}

.b-sidebar > .b-sidebar-header strong {
  font-weight: 500;
}
</style>
