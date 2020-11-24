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
    const characterIdsStr = localStorage.getItem("characterIds");
    let characterIds: string[] = [];
    if (characterIdsStr) {
      characterIds = JSON.parse(characterIdsStr);
      characterIds.push(id);
    } else {
      characterIds = [id];
    }
    localStorage.setItem("characterIds", JSON.stringify(characterIds));
  }
  dislikeCharacter(id: string) {
    const characterIdsStr = localStorage.getItem("characterIds");
    if (characterIdsStr) {
      const characterIds: string[] = JSON.parse(characterIdsStr);
      const characterIndex = characterIds.findIndex((ch) => ch === id);
      if (characterIndex !== -1) {
        characterIds.splice(characterIndex, 1);
        localStorage.setItem("characterIds", JSON.stringify(characterIds));
        return;
      }
    }
    throw new Error("Can't get localstorage or index is wrong");
  }

  async getLikedCharacters() {
    const characterIdsStr = localStorage.getItem("characterIds");
    if (characterIdsStr) {
      const characterIds: string[] = JSON.parse(characterIdsStr);
      return await this.likedCharactersApiService.getLikedCharacters(
        characterIds
      );
    }
    return [];
  }
}
