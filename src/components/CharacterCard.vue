<template>
  <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{name}}</div>
          <div class="md-subhead">Subtitle here</div>
        </md-card-header-text>
        <md-card-media>
          
          <img :src="imgUrl" alt="People">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button class="md-icon-button">
          <md-icon>favorite</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CharacterCard extends Vue {
  @Prop() private name!: string;
  @Prop() private imgUrl!: string;
}
</script>

<style>
  .md-card{
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  /* .md-card img{
    height: 400px;
  } */
</style>