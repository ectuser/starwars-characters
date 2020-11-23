<template>
  <div class="home">
    
    <CharacterCard v-for="(item, index) in characters" :key="index + 1"
      v-bind:name="item.name"
      v-bind:imgUrl="config.getImageUrl(index + 1)"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import CharacterCard from "../components/CharacterCard";
import { CharactersApiService } from "../services/characters/api/characters";
import { AllCharacters } from "../interfaces/all-characters";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Character } from "@/interfaces/character";
import { apiConfig } from "../services/characters/api/api-config";

@Component({
  name: "Home",
  components: {
    CharacterCard,
  },
})
export default class Home extends Vue {
  characters: Character[] = [];
  config = apiConfig;
  

  async beforeMount() {
    let answer: AllCharacters;
    try {
      answer = await CharactersApiService.getAll();
    } catch (error) {
      console.warn(error);
      return;
    }
    if (answer.results){
      this.characters = [...answer.results];
      console.log(this.characters);
      
    }
  }
}
</script>

<style>
.home {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
</style>
