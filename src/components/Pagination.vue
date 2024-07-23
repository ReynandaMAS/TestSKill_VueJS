<template>
  <nav class="w-full pt-5 pb-10 flex justify-center items-center bg-white dark:bg-gray-600">
    <ul class="flex items-center -space-x-px text-base">
      <li>
        <button
          :disabled="currentPage === 1"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 disabled:bg-slate-200 mr-2"
          @click="goToPage(1)"
        >
          First
        </button>
      </li>
      <li>
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 disabled:bg-slate-200"
        >
          Previous
        </button>
      </li>
      <li v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }">
        <button
          :class="{ 'text-white bg-gray-700 dark:text-white dark:bg-gray-900': pageNumber === currentPage }"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="goToPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </li>
      <li>
        <button
          type="button"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 disabled:bg-slate-200"
        >
          Next
        </button>
      </li>
      <li>
        <button
          :disabled="currentPage === totalPages"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 disabled:bg-slate-200 ml-2"
          @click="goToPage(totalPages)"
        >
          Last
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['currentPage', 'totalPages']);
const emit = defineEmits(['page-change']);

const goToPage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= props.totalPages) {
    emit('page-change', pageNumber);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
}

.page-item {
  margin: 0 0.5rem;
}

.page-link {
  cursor: pointer;
  border: none;
  background-color: transparent;
}
</style>
<!-- code load -->