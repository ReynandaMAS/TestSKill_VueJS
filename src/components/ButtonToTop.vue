<template>
  <button
    v-if="props.showToTop"
    @click="$emit('scrollToTop')"
    class="fixed z-[70] bottom-5 right-2 bg-gray-500 dark:bg-gray-800 hover:dark:bg-gray-900 hover:bg-gray-600 text-white p-2 rounded-full"
  >
    <Icon icon="material-symbols:arrow-upward-rounded" class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps(['showToTop']);
</script>
<!-- button click next -->