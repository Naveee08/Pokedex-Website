import type { Pokedex } from "@/types";
import type { ComputedRef, Ref } from "vue";

import { computed } from "vue";
import { TYPE_COLOR } from "@/config/constants";

export default function useTypeColor(
  pokemon: Ref<Pokedex | undefined> | string
): ComputedRef<string> {
  const typeColor = computed<string>(() => {
    if (typeof pokemon === "string") return TYPE_COLOR[pokemon as keyof typeof TYPE_COLOR];

    const mainType = (pokemon.value?.types[0].type.name as keyof typeof TYPE_COLOR) || "dark";
    return mainType ? TYPE_COLOR[mainType] : TYPE_COLOR.dark;
  });

  return typeColor;
}
