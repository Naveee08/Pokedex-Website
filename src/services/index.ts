import type {
  Pokedex,
  Pokemon,
  MoveResponse,
  SpeciesResponse,
  FlavorTextEntryResponse,
} from "@/types";
import type { QueryParams } from "@/types/services";

import { POKEAPI_URL } from "@/config/constants";

export const getPokemons = async ({ offset, limit }: QueryParams): Promise<Pokemon[]> => {
  const endpoint = `/pokemon?offset=${offset}limit=${limit}`;

  const resp = await fetch(`${POKEAPI_URL}${endpoint}`);
  if (resp.status !== 200 || !resp.ok) throw new Error("request error");

  const { results: pokemons }: { results: Pokemon[] } = await resp.json();
  return pokemons;
};

export const getPokemonByName = async (name: string): Promise<Pokedex> => {
  const resp = await fetch(`${POKEAPI_URL}/pokemon/${name}`);
  if (resp.status !== 200 || !resp.ok) throw new Error("request error");

  const pokemon: Pokedex = await resp.json();
  return pokemon;
};

export const getMoveByName = async (moveName: string): Promise<MoveResponse> => {
  const resp = await fetch(`${POKEAPI_URL}/move/${moveName}`);
  if (resp.status !== 200 || !resp.ok) throw new Error("request error");

  const move: MoveResponse = await resp.json();
  return move;
};

export const getPokemonDescription = async (name: string): Promise<FlavorTextEntryResponse[]> => {
  const resp = await fetch(`${POKEAPI_URL}/pokemon-species/${name}`);
  if (resp.status !== 200 || !resp.ok) throw new Error("request error");

  const { flavor_text_entries: flavorTextEntries }: SpeciesResponse = await resp.json();
  const textEntries = flavorTextEntries.filter((entry) => entry.language.name === "es");

  return textEntries;
};
