<template>
  <div class="container">
    <CharacterCard
      v-for="item in characters"
      :key="item.id"
      :character="item"
      :imageUrl="apiConfig.getImageUrl(item.id)"
      :likeCallback="likeCharacter"
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

  likeCharacter(character: CharacterInstance) {
    if (!character.isLiked){
      this.likeCharacterService.likeCharacter(character.id);
    }
    else{
      this.likeCharacterService.dislikeCharacter(character.id);
    }
    this.getLikedCharacters();
  }

  
  
}

</script>

<style>
  .container{
    width: 80%;
    margin: 20px auto 0 auto;
  }
</style>