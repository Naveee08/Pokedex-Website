<template>
  <div class="navbar" :class="{ 'navbar--scroll': hasScrolled }">
    <div class="container">
      <router-link to="/" class="brand" :class="{ 'brand--scroll': hasScrolled }">
        <img src="/pokedex.svg" width="30px" height="30px" />
        <p>Pokedex App</p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

const props = withDefaults(defineProps<{ scrollLimit: number }>(), { scrollLimit: 100 });
const hasScrolled = ref<boolean>(false);

const handleScroll = () => {
  if (!hasScrolled.value && window?.scrollY > props.scrollLimit) {
    hasScrolled.value = true;
  } else if (hasScrolled.value && window?.scrollY <= props.scrollLimit) {
    hasScrolled.value = false;
  }
};

onMounted(() => document.addEventListener("scroll", handleScroll));
onBeforeUnmount(() => document.removeEventListener("scroll", handleScroll));
</script>

<style scoped>
h1 {
  margin: 0;
}

img {
  width: 30px;
  height: 30px;
}

p {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}

a {
  text-decoration: none;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background-color 0.2s;
}

.navbar--scroll {
  background-color: rgba(0, 0, 0, 0.5);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;
}

.brand--scroll {
  transform: scale(0.95);
}

.container {
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
}
</style>
