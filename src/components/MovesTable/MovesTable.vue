<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Power</th>
          <th>Priority</th>
          <th>PP</th>
          <th>Demage</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="move in moves" :key="move.move.name">
          <MoveRow :move="move" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Move } from "@/types";
import MoveRow from "./MoveRow";

defineProps<{ moves: Move[] }>();
</script>

<style scoped>
.table-container {
  max-width: 100%;
  overflow-x: auto;
}
</style>
