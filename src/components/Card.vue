<template>
  <div :class="cardClasses">
    <div v-if="!bigCard || (index % 2 === 0 && bigCard)" class="rounded-t-lg relative" :class="maxHeightImage">
      <a :href="url" target="_blank">
        <img
          class="rounded-t-lg w-full h-full object-cover object-center"
          :src="urlToImage ? urlToImage : imagePlaceholder"
          :alt="title"
        />
      </a>
      <div
        class="absolute top-2 right-2 z-50 bg-white dark:bg-gray-800 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Icon
          v-if="saved"
          icon="material-symbols:bookmark"
          class="w-8 h-8 text-black dark:text-white"
          @click="handleToggleSavedArticles(title, 'remove')"
        />
        <Icon
          v-else
          icon="material-symbols:bookmark-outline"
          class="w-8 h-8 text-black dark:text-white"
          @click="handleToggleSavedArticles(title, 'saved')"
        />
        <div
          v-if="bookMarkStatus && bookMarkStatus !== ''"
          role="tooltip"
          class="absolute top-[5px] z-20 inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg tooltip dark:text-white dark:bg-gray-900 shadow-lg after:absolute after:left-[101%] after:top-1/2 after:-translate-y-1/2 after:-ml-1 after:border-8 after:border-white after:border-t-transparent after:border-r-transparent after:border-b-transparent after:border-l-white after:dark:border-l-gray-900 after:dark:border-gray-900 after:dark:border-t-transparent after:dark:border-r-transparent after:dark:border-b-transparent"
          :class="bookMarkStatus === 'saved' ? '-left-[212px]' : '-left-[232px]'"
        >
          {{ bookMarkStatus === 'saved' ? 'Your article has been saved' : 'Your article has been removed' }}
        </div>
      </div>
    </div>
    <div
      v-if="bigCard && index % 2 !== 0"
      class="rounded-b-lg inline sm:hidden w-full relative"
      :class="maxHeightImage"
    >
      <a :href="url" target="_blank">
        <img
          class="rounded-b-lg w-full h-full object-cover object-center"
          :src="urlToImage ? urlToImage : imagePlaceholder"
          :alt="title"
        />
      </a>
      <div
        class="absolute top-2 right-2 z-50 bg-white dark:bg-gray-800 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Icon
          v-if="saved"
          icon="material-symbols:bookmark"
          class="w-8 h-8 text-black dark:text-white"
          @click="handleToggleSavedArticles(title, 'remove')"
        />
        <Icon
          v-else
          icon="material-symbols:bookmark-outline"
          class="w-8 h-8 text-black dark:text-white"
          @click="handleToggleSavedArticles(title, 'saved')"
        />
        <div
          v-if="bookMarkStatus && bookMarkStatus !== ''"
          role="tooltip"
          class="absolute top-[5px] z-20 inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg tooltip dark:text-white dark:bg-gray-900 shadow-lg after:absolute after:left-[101%] after:top-1/2 after:-translate-y-1/2 after:-ml-1 after:border-8 after:border-white after:border-t-transparent after:border-r-transparent after:border-b-transparent after:border-l-white after:dark:border-l-gray-900 after:dark:border-gray-900 after:dark:border-t-transparent after:dark:border-r-transparent after:dark:border-b-transparent"
          :class="bookMarkStatus === 'saved' ? '-left-[212px]' : '-left-[232px]'"
        >
          {{ bookMarkStatus === 'saved' ? 'Your article has been saved' : 'Your article has been removed' }}
        </div>
      </div>
    </div>
    <a
      :href="url"
      target="_blank"
      class="px-6 py-8 flex flex-col justify-between h-max lg:h-[30%]"
      :class="{ 'gap-4': !bigCard, 'gap-4 lg:gap-0': bigCard }"
    >
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-700 dark:text-gray-400">{{ formatDate(publishedAt) }}</p>
        <p
          class="text-sm bg-gray-200 text-gray-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 shadow-md"
        >
          {{ author }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <h5 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{{ title }}</h5>
        <p class="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
          {{ description }}
        </p>
      </div>
      <p class="text-md text-gray-400 dark:text-gray-400 font-bold">{{ name }}</p>
    </a>
    <div v-if="bigCard && index % 2 !== 0" class="rounded-b-lg hidden sm:inline relative" :class="maxHeightImage">
      <a :href="url" target="_blank">
        <img
          class="rounded-b-lg w-full h-full object-cover object-center"
          :src="urlToImage ? urlToImage : imagePlaceholder"
          alt=""
        />
      </a>
      <div
        class="absolute top-2 right-2 z-50 bg-white dark:bg-gray-800 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Icon
          v-if="saved"
          icon="material-symbols:bookmark"
          class="w-8 h-8 text-black dark:text-white"
          @click="handleToggleSavedArticles(title, 'remove')"
        />
        <Icon
          v-else
          icon="material-symbols:bookmark-outline"
          class="w-8 h-8 text-black dark:text-white"
          @click="handleToggleSavedArticles(title, 'saved')"
        />
        <div
          v-if="bookMarkStatus && bookMarkStatus !== ''"
          role="tooltip"
          class="absolute top-[5px] z-20 inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg tooltip dark:text-white dark:bg-gray-900 shadow-lg after:absolute after:left-[101%] after:top-1/2 after:-translate-y-1/2 after:-ml-1 after:border-8 after:border-white after:border-t-transparent after:border-r-transparent after:border-b-transparent after:border-l-white after:dark:border-l-gray-900 after:dark:border-gray-900 after:dark:border-t-transparent after:dark:border-r-transparent after:dark:border-b-transparent"
          :class="bookMarkStatus === 'saved' ? '-left-[212px]' : '-left-[232px]'"
        >
          {{ bookMarkStatus === 'saved' ? 'Your article has been saved' : 'Your article has been removed' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imagePlaceholder from '../assets/placeholder.png';
import { computed } from 'vue';
import formatDate from '../utils/formatDate';
import { useArticlesStore } from '../stores/articles';

const store = useArticlesStore();
const handleToggleSavedArticles = (title: string, status: string) => {
  console.log('save');
  store.handleSavedArticles(title, status);

  setTimeout(() => {
    store.handleBookmarkStatus(title, '');
  }, 5000);
};

const props = defineProps([
  'bigCard',
  'urlToImage',
  'url',
  'title',
  'description',
  'maxHeightImage',
  'index',
  'publishedAt',
  'name',
  'author',
  'saved',
  'bookMarkStatus',
]);
const cardClasses = computed(() => {
  return {
    'relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-lg transition duration-300 ease-in hover:scale-[1.01] z-40':
      true,
    'w-full lg:flex-none lg:max-w-md': props.bigCard,
    'w-full lg:max-w-sm': !props.bigCard,
  };
});
</script>
<!-- create view code in rest API -->