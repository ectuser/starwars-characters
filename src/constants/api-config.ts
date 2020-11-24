export class ApiConfig {
  private static instance: ApiConfig;
  private baseUrl = "https://swapi.dev/api";
  private constructor() {}
  public static get Instance(): ApiConfig {
    if (!this.instance) {
      this.instance = new ApiConfig();
    }
    return this.instance;
  }
  get BaseUrl() {
    return this.baseUrl;
  }
  getImageUrl(index: number) {
    return `https://starwars-visualguide.com/assets/img/characters/${index}.jpg`;
  }
}
