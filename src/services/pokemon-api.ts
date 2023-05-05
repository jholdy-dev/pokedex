import axios, { AxiosInstance } from "axios";

interface PokemonListResponse {
  next: string | null;
  results: PokemonListResult[];
}

interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  weight: number;
  height: number;
}

export class PokemonAPI {
  readonly client: AxiosInstance;
  private readonly baseUrl = "https://pokeapi.co/api/v2";

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async getPokemonList(
    limit: number,
    offset?: number
  ): Promise<PokemonListResponse> {
    const response = await this.client.get<PokemonListResponse>("/pokemon", {
      params: { limit, offset },
    });
    return response.data;
  }

  async getPokemonDetail(id: number): Promise<PokemonDetail> {
    const response = await this.client.get<any>(`/pokemon/${id}`);
    const { name, types, weight, height } = response.data;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

    return {
      id,
      name,
      types: types.map((type: any) => type.type.name),
      imageUrl,
      weight,
      height,
    };
  }
}

export class PokemonRepository {
  private readonly api: PokemonAPI;

  constructor(api: PokemonAPI) {
    this.api = api;
  }

  async getPokemons(limit: number, offset?: number): Promise<PokemonDetail[]> {
    const response = await this.api.getPokemonList(limit, offset);
    const pokemons = await Promise.all(
      response.results.map(async (result) => {
        const id = result.url.split("/").slice(-2, -1)[0];
        const pokemon = await this.api.getPokemonDetail(parseInt(id));
        return pokemon;
      })
    );
    return pokemons;
  }

  async getPokemon(id: number): Promise<PokemonDetail> {
    const pokemon = await this.api.getPokemonDetail(id);
    return pokemon;
  }
}

export default new PokemonRepository(new PokemonAPI());
