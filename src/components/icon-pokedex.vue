<script setup lang="ts">
import Pokedex from "../assets/pokedex.svg";
import { ref } from "vue";

const icon = ref(Pokedex);
</script>

<template>
  <img class="h-12 object m-4" :src="icon" alt="" />
</template>
