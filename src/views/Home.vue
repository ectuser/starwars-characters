<template>
  <div class="home">
    <div class="menu">
      <div class="pagination">
        <md-button
          class="md-primary"
          :to="previousPage"
          :disabled="previousPage === '/'"
        >
          Previous
        </md-button>
        <md-button>{{ pageNumber }}</md-button>
        <md-button
          class="md-accent"
          :to="nextPage"
          :disabled="nextPage === '/'"
        >
          Next
        </md-button>
      </div>
      <div class="search">
        <md-field class="search-input">
          <label>Name</label>
          <md-input v-model="searchData"></md-input>
        </md-field>
        <md-button class="search-button" @click="onSearch()">
          Search
        </md-button>
        <md-button class="md-accent" to="/">
          Reset
        </md-button>
      </div>
    </div>
    <CharacterCard
      v-for="item in characters"
      :key="item.id"
      :character="item"
      v-bind:imageUrl="apiConfig.getImageUrl(item.id)"
      v-bind:likeCallback="likeCharacter"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import CharacterCard from "../components/CharacterCard.vue";
import { CharactersApiService } from "../services/characters/api/characters-api.service";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CharacterInstance } from "@/classes/character-instance";
import { ApiConfig } from "../constants/api-config";
import { LikeCharacterService } from "../services/characters/like-character.service";
import { ApiCharacter } from '@/interfaces/api-character';
import { CharactersApiResponse } from '@/interfaces/characters-api-response';

@Component({
  name: "Home",
  components: {
    CharacterCard,
  },
})
export default class Home extends Vue {
  characters: CharacterInstance[] = [];
  apiConfig = ApiConfig.Instance;
  characterApiService = CharactersApiService.Instance;
  likeCharacterService = LikeCharacterService.Instance;
  pageNumber: number = 1;
  searchData: string = "";
  nextPage: string = "/";
  previousPage: string = "/";

  @Watch("$route")
  onUrlChange() {
    this.updateList();
  }

  mounted() {
    console.log(this.$route.query);
    this.updateList();
  }

  async updateList(){
    this.setDataFromQuery();
    await this.setDataFromService();
    this.setLikes();
  }

  setDataFromQuery() {
    const pageNumberFromQuery = Number(this.$route.query.page);
    this.pageNumber = !isNaN(pageNumberFromQuery) ? pageNumberFromQuery : 1

    this.searchData = this.$route.query.search
      ? this.$route.query.search.toString()
      : "";
  }

  async setDataFromService() {
    let response: CharactersApiResponse;
    try {
      response = await this.characterApiService.getCharactersFromPage(
        this.pageNumber,
        this.searchData
      );
      this.characters = response.results 
        ? response.results.map((apiCharacter: ApiCharacter) => new CharacterInstance(apiCharacter)) 
        : [];
      this.setPreviousNextPages(response);
      console.log(this.characters);
    } catch (error) {
      console.warn(error);
      return;
    }
  }

  setPreviousNextPages(response: CharactersApiResponse){
    this.nextPage = response.next
      ? response.next.replace("http://swapi.dev/api/people", "")
      : "/";
    this.previousPage = response.previous
      ? response.previous.replace("http://swapi.dev/api/people", "")
      : "/";
  }

  setLikes(){
    const likeIds = this.likeCharacterService.getLikedCharacterIds();
    this.characters = this.characters.map(character => {
      character.isLiked = likeIds.indexOf(character.id) !== -1 ? true : false;
      return character;
    })
  }

  onSearch() {
    if (this.searchData) {
      this.$router.push({ query: { search: this.searchData } });
    }
  }

  likeCharacter(character: CharacterInstance) {
    if (!character.isLiked){
      this.likeCharacterService.likeCharacter(character.id);
    }
    else{
      this.likeCharacterService.dislikeCharacter(character.id);
    }
    this.updateList();
  }
}
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 20px auto 0 auto;
}
.menu {
  display: flex;
  flex-direction: row;
}
.menu .pagination {
  flex: 1;
}
.menu .search {
  flex: 1;
  display: flex;
}
</style>
