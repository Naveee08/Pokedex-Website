<template>
  <router-link :to="`/${props.name}`" class="pokemon-card fadeIn">
    <div class="pokemon-card__image-container">
      <img width="170px" height="170px" :src="pokemonImage" />
    </div>

    <div class="pokemon-card__types">
      <template v-if="pokemon?.types">
        <template v-for="pokemonType in pokemon.types" :key="pokemonType.slot">
          <Badget>{{ pokemonType.type.name }}</Badget>
        </template>
      </template>

      <template v-else>
        <Badget>...</Badget>
      </template>
    </div>

    <h2 class="pokemon-card__title">{{ name }}</h2>
    <span class="pokemon-card__weight">weight: {{ pokemon?.weight }}</span>
  </router-link>
</template>

<script setup lang="ts">
import type { Pokedex } from "@/types";

import { onMounted, ref, computed } from "vue";
import { Badget } from "@/components";
import { getPokemonByName } from "@/services";
import { getOficialArtwork } from "@/utils";
import { useTypeColor } from "@/composables";

const props = defineProps<{ name: string }>();
const pokemon = ref<Pokedex>();
const cardBgColor = useTypeColor(pokemon);

const pokemonImage = computed(() => {
  return pokemon.value ? getOficialArtwork(pokemon.value.id) : "";
});

onMounted(() => {
  getPokemonByName(props.name).then((response) => {
    pokemon.value = response;
  });
});
</script>

<style scoped>
.pokemon-card {
  background-color: v-bind("cardBgColor");
  border-radius: 10px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
  position: relative;
  overflow: hidden;
}

.pokemon-card::after {
  content: "";
  position: absolute;
  background-color: rgb(255, 255, 255, 0.35);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

.pokemon-card > * {
  position: relative;
  z-index: 2;
}

.pokemon-card img {
  width: 170px;
  height: 170px;
  position: relative;
  z-index: 1;
  transition: transform 0.2s;
}

.pokemon-card:hover img {
  transform: translateY(-4px);
  transform: scale(1.04);
}

.pokemon-card__image-container {
  position: relative;
}

.pokemon-card__image-container::after {
  content: "";
  display: block;
  position: absolute;
  top: 0px;
  left: 7%;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

.pokemon-card__title {
  text-transform: capitalize;
  font-weight: 500;
  margin-bottom: 0.1rem;
}

.pokemon-card__types {
  display: flex;
  gap: 0.5rem;
}

.pokemon-card__weight {
  font-size: 0.8rem;
  font-weight: 500;
}
</style>
