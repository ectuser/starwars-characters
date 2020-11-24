import { CharacterInstance } from "@/classes/character-instance";
import { LikedCharactersApiService } from "./api/liked-characters-api.service";
export class LikeCharacterService {
  private static instance: LikeCharacterService;
  private likedCharactersApiService = LikedCharactersApiService.Instance;
  private constructor() {}
  public static get Instance(): LikeCharacterService {
    if (!this.instance) {
      this.instance = new LikeCharacterService();
    }
    return this.instance;
  }
  likeCharacter(id: string) {
    let characterIds = this.getLikedCharacterIds();
    if (characterIds.length === 0) {
      characterIds = [id];
    }
    characterIds.push(id);
    localStorage.setItem("characterIds", JSON.stringify(characterIds));
  }
  dislikeCharacter(id: string) {
    const characterIds = this.getLikedCharacterIds();
    const characterIndex = characterIds.findIndex((ch) => ch === id);
    if (characterIndex !== -1) {
      characterIds.splice(characterIndex, 1);
      localStorage.setItem("characterIds", JSON.stringify(characterIds));
    } else {
      console.warn("Can't find index");
    }
  }

  async getLikedCharacters() {
    const characterIds = this.getLikedCharacterIds();
    if (characterIds.length === 0) {
      return [];
    }
    const response = await this.likedCharactersApiService.getLikedCharacters(
      characterIds
    );
    return response.map((character: CharacterInstance) => {
      character.isLiked = true;
      return character;
    });
  }

  getLikedCharacterIds() {
    const characterIdsStr = localStorage.getItem("characterIds");
    if (characterIdsStr) {
      const characterIds: string[] = JSON.parse(characterIdsStr);
      return characterIds;
    }
    return [];
  }
}
