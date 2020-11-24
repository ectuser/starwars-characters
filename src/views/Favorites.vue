<template>
  <div class="container">
    <CharacterCard
      v-for="item in characters"
      :key="item.id"
      v-bind:name="item.name"
      v-bind:id="item.id"
      v-bind:imgUrl="apiConfig.getImageUrl(item.id)"
      v-bind:likeCallback="likeCharacter"
    />
  </div>
</template>
<script lang="ts">
import { CharacterInstance } from '@/classes/character-instance';
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import {LikeCharacterService} from "../services/characters/like-character.service";
import { ApiConfig } from "../constants/api-config";
import CharacterCard from "../components/CharacterCard.vue";
@Component({
  components:{
    CharacterCard
  }
})
export default class Favorites extends Vue{
  characters: CharacterInstance[] = [];
  likeCharacterService = LikeCharacterService.Instance;
  apiConfig = ApiConfig.Instance;
  mounted(){
    this.getLikedCharacters()
  }

  async getLikedCharacters(){
    this.characters = await this.likeCharacterService.getLikedCharacters();
    
  }

  likeCharacter(id: string){

  }
  
}

</script>

<style>
  .container{
    width: 80%;
    margin: 20px auto 0 auto;
  }
</style>