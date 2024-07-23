<template>
  <Layout>
    <main class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <section id="hero" class="bg-hero">
        <div class="relative flex flex-col items-center justify-center gap-10 pt-40 pb-24 sm:py-32 text-white h-full px-10">
          <h1 class="text-4xl sm:text-6xl text-center font-bold">Discover Articles That Captivate You</h1>
          <p class="text-xl font-semibold text-center max-w-3xl typing">
            Complete the form to start your search. search for and save articles that interest you
          </p>
          <form @submit.prevent="handleSubmit" class="w-full sm:max-w-2xl">
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Icon icon="ion:search" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-12 text-md text-gray-700 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search articles here..."
                required
                v-model="search"
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 disabled:bg-blue-400 disabled:hover:bg-blue-400 disabled:cursor-not-allowed disabled:pointer-events-none"
                :disabled="loading"
              >
                {{ loading ? 'Searching...' : 'Search' }}
              </button>
            </div>
          </form>
          <div
            v-if="(resultArticlesNull && !loading) || articlesChunks.length > 0"
            class="text-lg font-semibold text-center sm:text-start flex items-center gap-2"
          >
            <Icon icon="ion:arrow-down" class="w-6 h-6 animate-bounce" />
            <p>Please Scroll Down To See The Results</p>
            <Icon icon="ion:arrow-down" class="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </section>
      <div
        v-if="articlesChunks.length > 0 && !loading"
        id="listArticles"
        class="flex flex-col xl:py-10 py-5 px-5 gap-4 bg-gray-100 dark:bg-gray-900"
      >
        <template v-for="(articlesChunk, index) in articlesChunks" :key="index">
          <section
            class="flex flex-wrap lg:flex-nowrap justify-center gap-4"
            :class="{ 'flex-row-reverse': index % 2 !== 0 }"
          >
            <Card
              :bigCard="true"
              :title="articlesChunk[0].title"
              :description="articlesChunk[0].description"
              :url="articlesChunk[0].url"
              :urlToImage="articlesChunk[0].urlToImage"
              :key="articlesChunk[0].title + index"
              :index="index"
              :publishedAt="articlesChunk[0].publishedAt"
              :name="articlesChunk[0].source.name"
              :author="articlesChunk[0].author"
              :saved="articlesChunk[0].saved"
              :bookMarkStatus="articlesChunk[0].bookMarkStatus"
              maxHeightImage="h-[300px] max-h-[300px] lg:h-[70%] lg:max-h-[70%]"
            />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card
                v-for="article in articlesChunk.slice(1)"
                :bigCard="false"
                :title="article.title"
                :description="article.description"
                :url="article.url"
                :urlToImage="article.urlToImage"
                :key="article.title + index"
                :index="index"
                :publishedAt="article.publishedAt"
                :name="article.source.name"
                :author="article.author"
                :saved="article.saved"
                :bookMarkStatus="article.bookMarkStatus"
                maxHeightImage="h-[200px] max-h-[200px]"
              />
            </div>
          </section>
        </template>
      </div>
      <div v-else-if="loading" class="flex flex-col xl:py-10 py-5 px-5 gap-4 bg-gray-100 dark:bg-gray-900">
        <template v-for="(articlesChunk, index) in articlesChunksSkeleton" :key="index">
          <section
            class="flex flex-wrap lg:flex-nowrap justify-center gap-4"
            :class="{ 'flex-row-reverse': index % 2 !== 0 }"
          >
            <CardSkeletonVue
              :bigCard="true"
              :key="articlesChunk[0].title + index"
              :index="index"
              maxHeightImage="h-[300px] max-h-[300px] lg:h-[70%] lg:max-h-[70%]"
            />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CardSkeletonVue
                v-for="article in articlesChunk.slice(1)"
                :bigCard="false"
                :key="article.title + index"
                maxHeightImage="h-[200px] max-h-[200px]"
              />
            </div>
          </section>
        </template>
      </div>
      <div v-else-if="resultArticlesNull && !loading">
        <div
          id="notFoundArticles"
          class="flex flex-col justify-center items-center xl:py-10 py-5 px-5 gap-4 bg-gray-100 dark:bg-gray-900"
        >
          <Icon icon="oui:cross-in-circle-empty" class="w-32 h-32 sm:w-40 sm:h-40 text-red-700 dark:text-red-500" />
          <p class="text-gray-800 dark:text-white text-xl md:text-2xl lg:first:text-4xl font-bold text-center">
            No articles found, please try again
          </p>
        </div>
      </div>
    </main>
    <Pagination
      v-if="articlesChunks.length > 0 && !loading"
      :totalPages="totalPages"
      v-model:currentPage="currentPage"
      @page-change="handlePageChange"
    />
  </Layout>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import Layout from '../components/Layout/index.vue';
import { useArticlesStore } from '../stores/articles';
import { storeToRefs } from 'pinia';
import Card from '../components/Card.vue';
import CardSkeletonVue from '../components/CardSkeleton.vue';
import Pagination from '../components/Pagination.vue';

const store = useArticlesStore();
const { articles, loading } = storeToRefs(store);
const search = ref<string>('');
const resultArticlesNull = ref<boolean>(false);
const currentPage = ref(1);
const articlesPerPage = 10;

const articlesChunks = computed(() => {
  const chunkSize = 5;
  const chunks = [];
  for (let i = 0; i < paginatedArticles.value.length; i += chunkSize) {
    chunks.push(paginatedArticles.value.slice(i, i + chunkSize));
  }
  return chunks;
});
const articlesChunksSkeleton = computed(() => {
  const chunkSize = 5;
  const chunks = [];
  for (let i = 0; i < articles.value.slice(0, 10).length; i += chunkSize) {
    chunks.push(articles.value.slice(i, i + chunkSize));
  }
  return chunks;
});

const handleSubmit = async () => {
  const result = await store.getArticles(search.value);
  search.value = '';
  if (result.data.length === 0) {
    resultArticlesNull.value = true;
    return;
  }
  const listArticles = document.getElementById('listArticles') as HTMLDivElement;
  listArticles.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const paginatedArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  return articles.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(articles.value.length / articlesPerPage));

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};
</script>

<style scoped>
/* image bg article */
.bg-hero {
  background-image: url('../assets/hero.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}


@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: white; }
}

.typing {
  overflow: hidden; /* Ensures the text doesn't overflow the container */
  border-right: .15em solid white; /* The typewriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  animation: typing 4.5s steps(103, end), blink-caret .80s step-end infinite;
}
</style>
