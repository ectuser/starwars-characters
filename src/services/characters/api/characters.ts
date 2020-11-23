import { apiConfig } from "./api-config";
import axios from "axios";
import { AllCharacters } from "@/interfaces/all-characters";
export const CharactersApiService = {
  async getCharactersFromPage(pageNumber: number): Promise<AllCharacters> {
    const allData = await axios.get(
      `${apiConfig.baseUrl}/people/?page=${pageNumber}`
    );
    if (allData.status !== 200) {
      throw new Error("Can't get data");
    }
    return allData.data;
  },
};
