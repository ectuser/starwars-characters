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
        <md-button class="search-button" v-on:click="onSearch()">
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
      v-bind:name="item.name"
      v-bind:id="item.id"
      v-bind:imgUrl="apiConfig.getImageUrl(item.id)"
      v-bind:likeCallback="likeCharacter"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import CharacterCard from "../components/CharacterCard.vue";
import { CharactersApiService } from "../services/characters/api/characters-api.service";
import { AllCharacters } from "../interfaces/all-characters";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CharacterInstance } from "@/classes/character-instance";
import { ApiConfig } from "../constants/api-config";
import { LikeCharacterService } from "../services/characters/like-character.service";

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
  numberOfCharacters?: number = 0;
  searchData: string = "";
  nextPage: string = "/";
  previousPage: string = "/";

  async mounted() {
    console.log(this.$route.query);

    this.setDataFromQuery();
    this.setDataFromService();
  }
  @Watch("$route")
  onUrlChange() {
    this.setDataFromQuery();
    this.setDataFromService();
  }

  setDataFromQuery() {
    try {
      this.pageNumber = Number(this.$route.query.page);
      if (isNaN(this.pageNumber)) {
        throw new Error("Not a number");
      }
    } catch (error) {
      this.pageNumber = 1;
    }
    this.searchData = this.$route.query.search
      ? this.$route.query.search.toString()
      : "";
  }

  async setDataFromService() {
    let answer: AllCharacters;
    try {
      answer = await this.characterApiService.getCharactersFromPage(
        this.pageNumber,
        this.searchData
      );
    } catch (error) {
      console.warn(error);
      return;
    }
    if (answer.results) {
      this.characters = answer.results.map(
        (apiCharacter) => new CharacterInstance(apiCharacter)
      );
      console.log(this.characters);
    }
    this.numberOfCharacters = answer.count || undefined;
    this.nextPage = answer.next
      ? answer.next.replace("http://swapi.dev/api/people", "")
      : "/";
    this.previousPage = answer.previous
      ? answer.previous.replace("http://swapi.dev/api/people", "")
      : "/";
    console.log(this.previousPage, this.nextPage);
  }

  onSearch() {
    if (this.searchData) {
      this.$router.push({ query: { search: this.searchData } });
    }
  }

  likeCharacter(id: string) {
    this.likeCharacterService.likeCharacter(id);
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
