<template>
  <div class="home">
    <div class="pagination">
      <md-button class="md-primary" :to="`/page/${pageNumber - 1}`" :disabled="pageNumber <= 1">Previous</md-button>
      <md-button>{{pageNumber}}</md-button>
      <md-button class="md-accent" :to="`/page/${pageNumber + 1}`" :disabled="pageNumber === Math.floor(numberOfCharacters / 10)">Next</md-button>
    </div>
    <CharacterCard v-for="(item, index) in characters" :key="transformIndex(index, pageNumber)"
      v-bind:name="item.name"
      v-bind:imgUrl="config.getImageUrl(transformIndex(index, pageNumber))"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import CharacterCard from "../components/CharacterCard.vue";
import { CharactersApiService } from "../services/characters/api/characters";
import { AllCharacters } from "../interfaces/all-characters";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Character } from "@/interfaces/character";
import { apiConfig } from "../services/characters/api/api-config";

@Component({
  name: "Home",
  components: {
    CharacterCard,
  }
})
export default class Home extends Vue {
  characters: Character[] = [];
  config = apiConfig;
  pageNumber: number = 1;
  numberOfCharacters: number = 0;

  
  async mounted() {
    console.log(this.$route.query);
    
    this.setPageNumber();
    this.setCharacters();
  }
  @Watch('$route')
  onUrlChange(){
    this.setPageNumber();
    this.setCharacters();
  }

  setPageNumber(){
    try {
      this.pageNumber = Number(this.$route.params.id);
      if (isNaN(this.pageNumber)){
        throw new Error("Not a number");
      }
    } catch (error) {
      this.pageNumber = 1;
    }
  }

  async setCharacters(){
    let answer: AllCharacters;
    try {
      answer = await CharactersApiService.getCharactersFromPage(this.pageNumber);
    } catch (error) {
      console.warn(error);
      return;
    }
    if (answer.results){
      this.characters = [...answer.results];
      console.log(this.characters);
    }
    if (answer.count){
      this.numberOfCharacters = answer.count;
    }
  }

  transformIndex(index: number, page: number): number{
    return (index + 1) + (page - 1) * 10;
  }
  
}
</script>

<style>
.home {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
}
.pagination{
  text-align: center;
}
</style>
