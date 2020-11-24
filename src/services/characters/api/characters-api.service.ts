import { ApiConfig } from "../../../constants/api-config";
import axios from "axios";
import { CharactersApiResponse } from "@/interfaces/characters-api-response";
export class CharactersApiService {
  private static instance: CharactersApiService;
  private apiConfig: ApiConfig;
  private constructor() {
    this.apiConfig = ApiConfig.Instance;
  }
  public static get Instance(): CharactersApiService {
    if (!this.instance) {
      this.instance = new CharactersApiService();
    }
    return this.instance;
  }
  async getCharactersFromPage(
    pageNumber: number,
    searchData: string
  ): Promise<CharactersApiResponse> {
    const search = searchData ? `&search=${searchData}` : "";
    const allData = await axios.get(
      `${this.apiConfig.BaseUrl}/people/?page=${pageNumber}${search}`
    );
    if (allData.status !== 200 || !allData.data) {
      throw new Error("Can't get data");
    }
    return allData.data;
  }
}
