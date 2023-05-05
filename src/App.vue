<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import ListPokemons from "./components/list-pokemons.vue";
import IconPokedex from "./components/icon-pokedex.vue";
import PokemonDetail from "./components/pokemon-detail.vue";
import pokemonRepository, {
  PokemonDetail as PokemonDetailType,
} from "./services/pokemon-api";

let pokemons = reactive(ref([] as PokemonDetailType[]));
let pokemonSelected = ref({} as PokemonDetailType);
let search = ref("");
let offset = ref(0);
let loading = ref(false);

onMounted(async () => {
  try {
    pokemons.value = await pokemonRepository.getPokemons(20, offset.value);
    offset.value += 20;
  } catch (error) {
    console.log(error);
  }
});

const pokemonsFiltered = computed(() => {
  if (pokemons.value && search.value) {
    return pokemons.value.filter((pokemon: PokemonDetailType) =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return pokemons.value;
});

const selectPokemon = (pokemonSetter: PokemonDetailType) => {
  loading.value = true;
  setTimeout(function () {
    pokemonSelected.value = pokemonSetter;
    loading.value = false;
  }, 500);
};

const loadMore = async () => {
  if (offset.value) {
    loading.value = true;
    try {
      const morePokemons = await pokemonRepository.getPokemons(
        20,
        offset.value
      );
      offset.value += 20;
      pokemons.value = pokemons.value.concat(morePokemons);
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-medium text-gray-100 mb-4"><IconPokedex /></h1>
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div class="grid bg-white p-6 m-6 justify-items-center content-center">
        <PokemonDetail
          :name="pokemonSelected.name"
          :imageUrl="pokemonSelected.imageUrl"
          :types="pokemonSelected.types"
          :weight="pokemonSelected.weight"
          :height="pokemonSelected.height"
          :loading="loading"
        />
      </div>
      <div class="grid bg-white p-6 m-6 border">
        <div class="flex items-center border-b border-gray-200 py-2">
          <input
            v-model="search"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Search"
          />
        </div>
        <div
          class="overflow-auto min-h-[40rem] max-h-[40rem] grid lg:grid-cols-4 sm:grid-cols-2 gap-4 p-2 m-2"
        >
          <ListPokemons
            v-for="pokemon in pokemonsFiltered"
            :key="pokemon.id"
            :name="pokemon.name"
            :imageUrl="pokemon.imageUrl"
            :types="pokemon.types"
            @click="selectPokemon(pokemon)"
          />
        </div>
        <button
          v-if="offset"
          @click="loadMore"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Load More
        </button>
      </div>
    </div>
  </div>
</template>
