<script setup lang="ts">
const pokemon = defineProps([
  "loading",
  "name",
  "imageUrl",
  "types",
  "height",
  "weight",
]);
</script>

<template>
  <div
    class="h-72 w-64 grid bg-white justify-items-center mb-14"
    :class="loading ? '' : 'animate__animated animate__flipInY'"
  >
    <div v-if="pokemon.name">
      <img
        class="w-54 h-54 object -mt-20 mb-4"
        :src="imageUrl"
        :alt="pokemon.name"
      />
      <div class="grid justify-items-center">
        <h1 class="text-2xl font-bold">{{ pokemon.name }}</h1>
        <table class="table-auto border rounded-lg text-center my-4">
          <tbody>
            <tr>
              <td class="px-4 py-2 font-semibold">Height:</td>
              <td class="px-4 py-2">{{ pokemon.height }}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold">Weight:</td>
              <td class="px-4 py-2">{{ pokemon.weight }}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <span
            v-for="tp in pokemon.types"
            :key="tp"
            :class="[
              'px-2.5 py-0.5 rounded mr-2 text-white text-xs font-medium',
              `bg-${tp.toLowerCase()}`,
            ]"
          >
            {{ tp }}
          </span>
        </div>
      </div>
    </div>
    <img
      v-else
      class="w-72 h-72 object"
      src="../assets/open-pokedex.svg"
      alt="???"
    />
  </div>
</template>
