<template>
  <div class="version">
    <h3>Version Description</h3>

    <div class="version__options">
      <template v-for="(description, index) in descriptions" :key="index">
        <button
          @click="() => handleSelectVersion(description.version.name)"
          :class="{ active: description.version.name === descriptionActive }"
        >
          {{ clearVersionName(description.version.name) }}
        </button>
      </template>
    </div>

    <div>
      <p class="fadeIn">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FlavorTextEntryResponse } from "@/types";

import { onMounted, ref, computed } from "vue";
import { getPokemonDescription } from "@/services";

const props = defineProps<{ name: string }>();
const descriptions = ref<FlavorTextEntryResponse[]>();
const descriptionActive = ref<string>();

const description = computed(() => {
  const currentVersion = descriptions.value?.find((description) => {
    return description.version.name === descriptionActive.value;
  });

  return currentVersion?.flavor_text;
});

const handleSelectVersion = (version: string) => {
  descriptionActive.value = version;
};

const clearVersionName = (version: string) => {
  return version.replaceAll("-", " ");
};

onMounted(() => {
  getPokemonDescription(props.name).then((response) => {
    descriptions.value = response;
    descriptionActive.value = response[0].version.name;
  });
});
</script>

<style scoped>
.version {
  margin-bottom: 1rem;
}

.version__options {
  margin-bottom: 0.5rem;
}

h3 {
  margin-bottom: 0.5rem;
}

button {
  font-weight: normal;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  background-color: transparent;
  transition: background-color 0.15s, color 0.15s;
}

button:hover {
  background-color: #fff;
  color: rgb(34, 34, 34);
  border-color: White;
}

.active {
  background-color: #fff;
  color: rgb(34, 34, 34);
  border-color: White;
}

p {
  margin: 0;
}
</style>
