export interface MoveResponse {
  accuracy: number;
  contest_combos: ContestCombos;
  contest_effect: ContestEffect;
  contest_type: ContestType;
  damage_class: ContestType;
  effect_chance: null;
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: ContestType;
  id: number;
  learned_by_pokemon: ContestType[];
  machines: Machine[];
  meta: Meta;
  name: string;
  names: Name[];
  past_values: any[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: any[];
  super_contest_effect: ContestEffect;
  target: ContestType;
  type: ContestType;
}

interface ContestCombos {
  normal: Normal;
  super: Normal;
}

interface Normal {
  use_after: ContestType[] | null;
  use_before: null;
}

interface ContestType {
  name: string;
  url: string;
}

interface ContestEffect {
  url: string;
}

interface EffectEntry {
  effect: string;
  language: ContestType;
  short_effect: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: ContestType;
  version_group: ContestType;
}

interface Machine {
  machine: ContestEffect;
  version_group: ContestType;
}

interface Meta {
  ailment: ContestType;
  ailment_chance: number;
  category: ContestType;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: null;
  max_turns: null;
  min_hits: null;
  min_turns: null;
  stat_chance: number;
}

interface Name {
  language: ContestType;
  name: string;
}
