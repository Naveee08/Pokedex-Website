<template>
  <span class="badge">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTypeColor } from "@/composables";

const props = defineProps<{ type?: string }>();
const typeColor = useTypeColor(props.type || "");

const badgeBg = computed(() => {
  return typeColor.value ? typeColor.value : "rgba(0, 0, 0, 0.4)";
});
</script>

<style scoped>
.badge {
  background-color: v-bind("badgeBg");
  color: white;
  padding: 0.1rem 0.9rem;
  border-radius: 100px;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
}
</style>
