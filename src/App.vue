<template>
  <div id="app">
    <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Star Wars</h3>
      <md-button to="/">Home</md-button>
      <md-button to="/favorites">Favorites</md-button>
      <md-button to="/search">Search</md-button>
    </md-toolbar>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
export default Vue.extend({
  
})
</script>
