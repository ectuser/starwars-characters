import { ApiCharacter } from "@/interfaces/api-character";

export class CharacterInstance implements ApiCharacter {
  name = this.source?.name ?? "";
  height = this.source?.height ?? "";
  mass = this.source?.mass ?? "";
  url = this.source?.url ?? "";
  id = this.source?.url ? this.extractIdFromUrl() : "";
  isLiked = false;
  constructor(protected source: Partial<ApiCharacter> = {}) {}

  extractIdFromUrl() {
    const re = new RegExp(`http(s)?://[a-z]+\.[a-z]+/[a-z]+/people/`, "i");
    return parseInt(this.url.replace(re, "")).toString();
  }
}
