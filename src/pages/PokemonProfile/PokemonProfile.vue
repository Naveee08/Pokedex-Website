<template>
  <div class="container" v-if="pokemon">
    <div class="profile__container fadeIn">
      <div class="profile__info">
        <div class="profile__main">
          <div>
            <img :src="pokemonImage" width="350px" height="350px" />
          </div>

          <div class="profile__descriptions">
            <h1 class="profile__title">
              <span>#{{ pokemon.id }}</span>
              {{ pokemon.name }}
            </h1>

            <VersionDescriptions :name="pokemon.name" />

            <div class="profile__types">
              <template v-for="pokemonType in pokemon.types" :key="pokemonType.slot">
                <Badget :type="pokemonType.type.name">{{ pokemonType.type.name }}</Badget>
              </template>
            </div>
          </div>
        </div>

        <div class="profile__data">
          <div class="text-capitalize profile__details">
            <h2>Details</h2>

            <p class="profile__details-row">
              <span> Species: </span>
              <span>{{ pokemon.species.name }}</span>
            </p>

            <p class="profile__details-row">
              <span> Hieght: </span>
              <span>{{ pokemon.height }}m</span>
            </p>

            <p class="profile__details-row">
              <span> Weight: </span>
              <span>{{ pokemon.weight }}kg</span>
            </p>

            <p class="profile__details-row">
              <span> Abilities: </span>
              <span>
                <template v-for="ability in pokemon.abilities.slice(0, 2)" :key="ability.slot">
                  <span class="ability">{{ ability.ability.name }}</span>
                </template>
              </span>
            </p>
          </div>

          <div>
            <h2>Stats</h2>
            <template v-for="stat in pokemon.stats" :key="stat.stat.name">
              <Stat v-bind="stat" />
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="fadeIn">
      <h2>Moves</h2>
      <MoveTable :moves="pokemon.moves" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokedex, FlavorTextEntryResponse } from "@/types";

import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMeta } from "vue-meta";
import Swal from "sweetalert2";

import { Badget, Stat, MoveTable, VersionDescriptions } from "@/components";
import { getPokemonByName, getPokemonDescription } from "@/services";
import { getOficialArtwork, capitalize } from "@/utils";

const router = useRouter();
const { params } = useRoute();
const pokemon = ref<Pokedex>();
const descriptions = ref<FlavorTextEntryResponse[]>();

useMeta({ title: capitalize(params.name as string) });

const goBack = () => {
  router.push("/");
};

const pokemonImage = computed(() => {
  return pokemon.value ? getOficialArtwork(pokemon.value.id) : "";
});

const getPokemon = async () => {
  const pokemonName = params.name as string;

  try {
    const response = await getPokemonByName(pokemonName);
    const descResponse = await getPokemonDescription(pokemonName);

    pokemon.value = response;
    descriptions.value = descResponse;
  } catch (error) {
    console.error(error);

    await Swal.fire({
      title: "Mmmmm... something went wrong",
      text: "Try it again later",
      icon: "error",
    });

    goBack();
  }
};

onMounted(() => {
  getPokemon();
});
</script>

<style scoped>
.go-back-btn {
  margin-bottom: 1rem;
}
.profile__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile__container img {
  width: 350px;
  height: 350px;
}

.profile__info {
  width: 100%;
}

.profile__main {
  margin-bottom: 1rem;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.profile__descriptions {
  text-align: left;
  font-size: 1.2rem;
}

.profile__data {
  display: grid;
  max-width: 100%;
  grid-auto-rows: auto;
  grid-column-gap: 5rem;
  grid-row-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.profile__id {
  color: gray;
  font-size: 0.92rem;
}

.profile__title {
  text-transform: capitalize;
  margin-bottom: 1.5rem;
  margin-top: 0.2rem;
  font-weight: 500;
  font-size: 3rem;
  line-height: 3.5rem;
}

.profile__title span {
  color: gray;
  font-weight: 500;
}

.profile__types {
  display: flex;
  gap: 1rem;
}

.profile__details {
  font-size: 0.95rem;
}

.profile__details-row {
  display: flex;
  justify-content: space-between;
  margin: 0.95rem 0;
}

.ability {
  margin-left: 0.2rem;
}
.ability::after {
  content: ",";
}

.ability:last-child::after {
  content: "";
}
</style>
