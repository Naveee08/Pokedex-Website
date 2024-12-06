<template>
  <metainfo>
    <template v-slot:title="{ content }">
      {{ content ? `${content} | Pokedex App` : `Pokedex App` }}
    </template>
  </metainfo>

  <Navbar />
  <router-view></router-view>
</template>

<script setup lang="ts">
import { Navbar } from "@/components";
</script>
