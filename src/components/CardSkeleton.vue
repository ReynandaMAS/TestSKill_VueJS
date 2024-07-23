<template>
  <div :class="cardClasses">
    <div
      v-if="!bigCard || (index % 2 === 0 && bigCard)"
      class="flex items-center justify-center w-full bg-gray-300 rounded dark:bg-gray-700"
      :class="maxHeightImage"
    >
      <Icon icon="bi:image-fill" class="w-10 h-10 text-gray-200 dark:text-gray-600" />
    </div>
    <div
      v-if="bigCard && index % 2 !== 0"
      class="flex sm:hidden items-center justify-center w-full bg-gray-300 rounded dark:bg-gray-700"
      :class="maxHeightImage"
    >
      <Icon icon="bi:image-fill" class="w-10 h-10 text-gray-200 dark:text-gray-600" />
    </div>

    <div
      class="px-6 py-8 flex flex-col justify-between"
      :class="{ 'gap-4 h-max': !bigCard, 'gap-4 lg:gap-0 h-max lg:h-[30%]': bigCard }"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="bg-gray-200 dark:bg-gray-700 w-48 h-2.5 rounded-lg"></p>
        <p class="bg-gray-200 dark:bg-gray-700 w-48 h-2.5 rounded-lg"></p>
      </div>
      <div class="flex flex-col gap-2">
        <h5 class="bg-gray-200 dark:bg-gray-700 w-full h-2.5 rounded-lg"></h5>
        <p class="bg-gray-200 dark:bg-gray-700 w-full h-2.5 rounded-lg"></p>
      </div>
      <p class="bg-gray-200 dark:bg-gray-700 w-48 h-2.5 rounded-lg"></p>
    </div>
    <div
      v-if="bigCard && index % 2 !== 0"
      class="hidden sm:flex items-center justify-center w-full bg-gray-300 rounded dark:bg-gray-700"
      :class="maxHeightImage"
    >
      <Icon icon="bi:image-fill" class="w-10 h-10 text-gray-200 dark:text-gray-600" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['bigCard', 'maxHeightImage', 'index']);
const cardClasses = computed(() => {
  return {
    'bg-slate-100  rounded-lg shadow dark:bg-gray-800  overflow-hidden  animate-pulse shadow-lg ': true,
    'w-full lg:flex-none lg:max-w-md': props.bigCard,
    'w-full lg:max-w-sm': !props.bigCard,
  };
});
</script>

<!-- card grid article -->