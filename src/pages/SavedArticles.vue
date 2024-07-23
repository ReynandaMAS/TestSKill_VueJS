<template>
  <Layout>
    <main class="min-h-screen bg-white dark:bg-gray-600 pt-32 pb-5 px-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-5 h-full">
        <div
          class="w-full sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          v-for="article in paginatedArticles"
        >
          <div class="rounded-t-lg relative w-full h-[200px]">
            <img
              class="rounded-t-lg w-full h-full object-cover object-center"
              :src="article.urlToImage"
              :alt="article.title"
            />
            <div
              class="absolute top-2 right-2 z-50 bg-white dark:bg-gray-800 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Icon
                icon="bi:trash-fill"
                class="w-8 h-8 text-black dark:text-white"
                @click="handleToggleModal(article.title)"
              />
            </div>
          </div>
          <div class="p-5">
            <h5 class="mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
              {{ article.title }}
            </h5>
            <a
              :href="article.url"
              target="_blank"
              class="inline-flex items-center px-3 py-2 gap-1 text-sm font-medium text-center text-white dark:text-gray-800 bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-200 dark:hover:bg-gray-300 dark:focus:ring-gray-800"
            >
              <span>Read more</span>
              <Icon icon="material-symbols:arrow-right-alt-rounded" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <Pagination
        v-if="savedArticles.length > 0"
        :totalPages="totalPages"
        v-model:currentPage="currentPage"
        @page-change="handlePageChange"
      />
    </main>
    <Transition name="popup">
      <div
        v-if="showModal"
        class="z-[70] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="handleToggleModal('')"
            >
              <Icon icon="mingcute:close-fill" class="w-6 h-6" />
            </button>
            <div class="p-4 md:p-5 text-center">
              <Icon icon="fe:warning" class="mx-auto mb-4 text-gray-400 w-20 h-20 dark:text-gray-200" />
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this article ?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                @click="handleToggleSavedArticles('remove')"
              >
                Yes, I'm sure 
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-400 rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                @click="handleToggleModal('')"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Overlay :condition="showModal" @handleConditionFalse="handleToggleModal('')" />
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import Layout from '../components/Layout/index.vue';
import { useArticlesStore } from '../stores/articles';
import { storeToRefs } from 'pinia';
import Overlay from '../components/Overlay.vue';
import Pagination from '../components/Pagination.vue';

const store = useArticlesStore();
const { savedArticles } = storeToRefs(store);
const showModal = ref<boolean>(false);
const titleToDelete = ref<string>('');
const currentPage = ref(1);
const articlesPerPage = 8;

const handleToggleModal = (title: string) => {
  showModal.value = !showModal.value;
  titleToDelete.value = title;
};

const handleToggleSavedArticles = (status: string) => {
  store.handleSavedArticles(titleToDelete.value, status);
  setTimeout(() => {
    store.handleBookmarkStatus(titleToDelete.value, '');
    titleToDelete.value = '';
  }, 5000);
  if (savedArticles.value.length === 0) {
    window.location.href = '/articles';
  }
  handleToggleModal('');
};

const paginatedArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  return savedArticles.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(savedArticles.value.length / articlesPerPage));

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

onMounted(() => {
  if (savedArticles.value.length === 0) {
    window.location.href = '/articles';
  }
});
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
}
</style>
<!-- ryn code -->