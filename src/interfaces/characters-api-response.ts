import { ApiCharacter } from "./api-character";

export interface CharactersApiResponse {
  count?: number;
  next?: string;
  previous?: string;
  results?: ApiCharacter[];
}
