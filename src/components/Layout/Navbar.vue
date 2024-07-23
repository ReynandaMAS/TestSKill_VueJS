<template>
  <nav class="navbar" :class="navbarBackground">
    <div class="mx-auto py-6 px-6 sm:px-14">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <router-link
            to="/articles"
            class="text-2xl font-bold text-gray-500 dark:text-white hover:scale-110 transition-all duration-300 ease-in-out"
            :class="{
              'text-gray-500 dark:text-white': props.scrollPosition > 10,
              'text-white': props.scrollPosition <= 10 && $route.path !== '/articles/saved',
            }"
            >RynArticle✅</router-link
          >
        </div>
        <div class="flex items-center space-x-6">
          <div class="hidden sm:flex items-center space-x-6">
            <router-link
              to="/articles"
              class="text-lg font-bold dark:text-white relative before:absolute before:inset-x-0 before:-bottom-[2px] before:h-0.5 before:bg-gray-500 before:dark:bg-white before:w-0 hover:before:w-full before:rounded-lg before:transition-all before:duration-300 before:ease-in-out"
              :class="{
                'text-gray-500 dark:text-white': props.scrollPosition > 10 || $route.path === '/articles/saved',
                'text-white': props.scrollPosition <= 10 && $route.path !== '/articles/saved',
                'border-b-2 border-gray-500 dark:border-white':
                  $route.path === '/articles' && props.scrollPosition > 10,
              }"
              >Beranda</router-link
            >
            <router-link
              v-if="savedArticles.length > 0"
              to="/articles/saved"
              class="text-lg font-bold text-gray-500 dark:text-white relative before:absolute before:inset-x-0 before:-bottom-[2px] before:h-0.5 before:bg-gray-500 before:dark:bg-white before:w-0 hover:before:w-full before:rounded-lg before:transition-all before:duration-300 before:ease-in-out"
              :class="{
                'text-gray-500 dark:text-white': props.scrollPosition > 10,
                'text-white': props.scrollPosition <= 10 && $route.path !== '/articles/saved',
                'border-b-2 border-gray-500 dark:border-white': $route.path === '/articles/saved',
              }"
              >Saved</router-link
            >
          </div>
          <button
            id="theme-toggle"
            @click="$emit('toggleTheme')"
            class="text-gray-500 hover:text-gray-600 dark:text-white hover:dark:text-gray-500 transition-all duration-300 ease-in-out focus:outline-none rounded-lg text-sm p-2.5"
            :class="{
              'text-gray-500 dark:text-white': props.scrollPosition > 10,
              'text-white': props.scrollPosition <= 10 && $route.path !== '/articles/saved',
            }"
          >
            <Icon v-show="!props.darkMode" class="w-5 h-5" icon="line-md:moon-filled" />
            <Icon v-show="props.darkMode" class="w-5 h-5" icon="fa6-solid:sun" />
          </button>
          <div class="relative">
            <!-- image profile left -->
            <img
              @click="$emit('handleDropdown')"
              class="w-10 h-10 rounded-full cursor-pointer sm:cursor-default sm:pointer-events-none"
              src="https://avatars.githubusercontent.com/u/132639163?v=4"
              alt="Rounded avatar"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
  <Dropdown :dropdown="props.dropdown" />
  <Overlay :condition="props.dropdown" @handleConditionFalse="props.handleDropdown" />
</template>

<script setup lang="ts">
  import Dropdown from '../../components/Dropdown.vue';
  import Overlay from '../../components/Overlay.vue';
  import { useArticlesStore } from '../../stores/articles';
  import { storeToRefs } from 'pinia';

  const store = useArticlesStore();
  const { savedArticles } = storeToRefs(store);

  const props = defineProps(['darkMode', 'scrollPosition', 'dropdown', 'navbarBackground', 'handleDropdown']);
  defineEmits(['toggleTheme', 'handleDropdown']);
</script>

<style scoped>
.navbar {
    @apply fixed w-full z-[60] top-0 left-0;
  }

  .navbar.navbar-transparent {
    @apply bg-transparent border-b border-white/10;
  }

  .navbar.navbar-background {
    @apply bg-white dark:bg-slate-800 border-b shadow-lg border-gray-500/50 dark:border-white/10;
  }
</style>

<!-- navbar simple sorry -->