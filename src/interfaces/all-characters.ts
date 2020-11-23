import { Character } from "./character";

export interface AllCharacters {
  count?: number;
  next?: string;
  previous?: string;
  results?: Character[];
}
