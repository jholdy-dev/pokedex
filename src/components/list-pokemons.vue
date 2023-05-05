<script setup lang="ts">
import { defineProps } from "vue";
const pokemon = defineProps(["imageUrl", "name", "types"]);
</script>

<template>
  <div class="h-40 grid bg-white justify-items-center border">
    <img class="w-28 h-28 object p-2" :src="imageUrl" :alt="pokemon.name" />
    <div class="text-center">
      <h1 class="font-bold text-lg mb-1">{{ pokemon.name }}</h1>
      <span
        v-for="tp in types"
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
</template>
