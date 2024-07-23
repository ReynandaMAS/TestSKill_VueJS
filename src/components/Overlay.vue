<template>
  <div v-show="props.condition" class="overlay" @click="$emit('handleConditionFalse')"></div>
</template>

<script setup lang="ts">
const props = defineProps(['condition']);
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  z-index: 65;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
<!-- create overley for codition -->
