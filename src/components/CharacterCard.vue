<template>
  <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{character.name}}</div>
          <div class="md-subhead">Subtitle here</div>
        </md-card-header-text>
        <md-card-media>
          
          <img :src="imageUrl" alt="People">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button @click="likeCallback(character)" :class="`md-icon-button${character.isLiked ? ' md-accent' : ''}`">
          <md-icon>favorite</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
</template>
<script lang="ts">
import { CharacterInstance } from '@/classes/character-instance';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CharacterCard extends Vue {
  @Prop() private likeCallback!: Function;
  @Prop() private character!: CharacterInstance;
  @Prop() private imageUrl!: string;
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