<template>
  <tr class="text-capitalize">
    <template v-if="moveData">
      <td>{{ move.move.name }}</td>
      <td>{{ moveData.type.name }}</td>
      <td>{{ moveData.power || "-" }}</td>
      <td>{{ moveData.priority }}</td>
      <td>{{ moveData.pp }}</td>
      <td>{{ moveData.damage_class.name }}</td>
    </template>
  </tr>
</template>

<script setup lang="ts">
import type { Move, MoveResponse } from "@/types";

import { onMounted, ref } from "vue";
import { getMoveByName } from "@/services";

const props = defineProps<{ move: Move }>();
const moveData = ref<MoveResponse>();

onMounted(() => {
  getMoveByName(props.move.move.name).then((response) => {
    moveData.value = response;
  });
});
</script>

<style scoped></style>
