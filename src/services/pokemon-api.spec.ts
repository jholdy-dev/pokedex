import MockAdapter from "axios-mock-adapter";
import {
  describe,
  beforeAll,
  afterEach,
  afterAll,
  it,
  expect,
  vi,
} from "vitest";
import { PokemonAPI, PokemonDetail, PokemonRepository } from "./pokemon-api";

describe("PokemonAPI", () => {
  let api: PokemonAPI;
  let mock: MockAdapter;

  beforeAll(() => {
    api = new PokemonAPI();
    mock = new MockAdapter(api.client);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("getPokemonList returns a list of pokemon", async () => {
    const responseData = {
      next: null,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      ],
    };
    mock.onGet("/pokemon").reply(200, responseData);

    const response = await api.getPokemonList(3);
    expect(response.results).toHaveLength(3);
  });

  it("getPokemonDetail returns a pokemon detail object", async () => {
    const responseData = {
      name: "bulbasaur",
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      weight: 69,
      height: 7,
    };
    mock.onGet("/pokemon/1").reply(200, responseData);

    const response = await api.getPokemonDetail(1);
    expect(response).toMatchObject<PokemonDetail>({
      id: 1,
      name: "bulbasaur",
      types: ["grass", "poison"],
      imageUrl: expect.stringContaining("1.svg"),
      weight: 69,
      height: 7,
    });
  });
});

describe("PokemonRepository", () => {
  let api: PokemonAPI;
  let repository: PokemonRepository;

  beforeAll(() => {
    api = new PokemonAPI();
    repository = new PokemonRepository(api);
  });

  it("getPokemons returns a list of pokemon", async () => {
    const pokemonListResponse = {
      next: null,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      ],
    };
    const pokemonDetailResponse = {
      id: 1,
      name: "bulbasaur",
      types: ["grass", "poison"],
      imageUrl: "1.svg",
      weight: 69,
      height: 7,
    } as PokemonDetail;

    const getPokemonListMock = vi
      .spyOn(api, "getPokemonList")
      .mockResolvedValue(pokemonListResponse);
    const getPokemonDetailMock = vi
      .spyOn(api, "getPokemonDetail")
      .mockResolvedValue(pokemonDetailResponse);

    const response = await repository.getPokemons(3);

    expect(response).toHaveLength(3);
    expect(response[0]).toMatchObject<PokemonDetail>({
      id: 1,
      name: "bulbasaur",
      types: ["grass", "poison"],
      imageUrl: expect.stringContaining("1.svg"),
      weight: 69,
      height: 7,
    });
    expect(getPokemonListMock).toHaveBeenCalledWith(3, undefined);
    expect(getPokemonDetailMock).toHaveBeenCalledTimes(3);

    getPokemonListMock.mockRestore();
    getPokemonDetailMock.mockRestore();
  });

  it("getPokemon returns a pokemon detail object", async () => {
    const pokemonDetailResponse = {
      id: 1,
      name: "bulbasaur",
      types: ["grass", "poison"],
      imageUrl: "1.svg",
      weight: 69,
      height: 7,
    } as PokemonDetail;

    const getPokemonDetailMock = vi
      .spyOn(api, "getPokemonDetail")
      .mockResolvedValue(pokemonDetailResponse);

    const response = await repository.getPokemon(1);

    expect(response).toMatchObject<PokemonDetail>({
      id: 1,
      name: "bulbasaur",
      types: ["grass", "poison"],
      imageUrl: expect.stringContaining("1.svg"),
      weight: 69,
      height: 7,
    });
    expect(getPokemonDetailMock).toHaveBeenCalledWith(1);

    getPokemonDetailMock.mockRestore();
  });
});
