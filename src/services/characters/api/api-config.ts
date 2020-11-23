export const apiConfig = {
  baseUrl: "https://swapi.dev/api",
  getImageUrl(index: number) {
    return `https://starwars-visualguide.com/assets/img/characters/${index}.jpg`;
  },
};
