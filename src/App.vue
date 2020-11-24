<template>
  <div id="app">
    <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Star Wars</h3>
      <md-button class="md-icon-button" to="/"><md-icon>home</md-icon></md-button>
      <md-button class="md-icon-button" to="/favorites"><md-icon>favorite</md-icon></md-button>
    </md-toolbar>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
export default Vue.extend({
  
})
</script>
