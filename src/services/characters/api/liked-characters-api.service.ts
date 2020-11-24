import axios from "axios";
import { ApiConfig } from "@/constants/api-config";
import { CharacterInstance } from "@/classes/character-instance";
export class LikedCharactersApiService {
  private static instance: LikedCharactersApiService;
  private apiConfig: ApiConfig;
  private constructor() {
    this.apiConfig = ApiConfig.Instance;
  }
  public static get Instance(): LikedCharactersApiService {
    if (!this.instance) {
      this.instance = new LikedCharactersApiService();
    }
    return this.instance;
  }

  async getLikedCharacters(ids: string[]) {
    const likedCharacters: CharacterInstance[] = [];
    for (let id of ids) {
      try {
        const response = await axios.get(
          `${this.apiConfig.BaseUrl}/people/${id}`
        );
        if (response.data) {
          likedCharacters.push(new CharacterInstance(response.data));
        }
      } catch (error) {}
    }
    return likedCharacters;
  }
}
