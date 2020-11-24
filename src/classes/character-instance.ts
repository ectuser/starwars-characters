import { ApiCharacter } from "@/interfaces/character";

export class CharacterInstance implements ApiCharacter {
  name = this.source?.name ?? "";
  height = this.source?.height ?? "";
  mass = this.source?.mass ?? "";
  url = this.source?.url ?? "";
  id = this.source?.url ? this.extractIdFromUrl() : "";
  constructor(protected source: Partial<ApiCharacter> = {}) {}

  extractIdFromUrl() {
    return parseInt(
      this.url.replace("http://swapi.dev/api/people/", "")
    ).toString();
  }
}
