<template>
  <div class="stat">
    <p class="stat__name">{{ props.stat.name }}</p>

    <div class="stat__progress">
      <span class="stat__line" />
      <span class="stat__value">{{ props.base_stat }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const statProgress = computed(() => {
  return `${props.base_stat}%`;
});

const props = defineProps<{ base_stat: number; stat: { name: string } }>();
</script>

<style scoped>
.stat {
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-column-gap: 4rem;
  font-size: 0.9rem;
}

p {
  margin: 0.2rem 0;
}

.stat__name {
  text-transform: capitalize;
}

.stat__progress {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat__line {
  height: 8px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  width: 100%;
  position: relative;
}

.stat__line::after {
  content: "";
  position: absolute;
  height: 100%;
  width: v-bind("statProgress");
  left: 0;
  top: 0;
  background-color: rgba(0, 128, 0);
}

.stat__value {
  width: 50px;
  text-align: right;
}
</style>
