<template>
  <Navbar
    :darkMode="darkMode"
    :scrollPosition="scrollPosition"
    :dropdown="dropdown"
    :navbarBackground="navbarBackground"
    :handleDropdown="handleDropdown"
    @handleDropdown="handleDropdown"
    @toggleTheme="toggleTheme"
  />
  <slot />
  <Footer />
  <ButtonToTop :showToTop="showToTop" @scrollToTop="scrollToTop" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ButtonToTop from '../../components/ButtonToTop.vue';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';

const darkMode = ref<boolean>(false);
const dropdown = ref<boolean>(false);
const scrollPosition = ref<number>(0);
const showToTop = ref<boolean>(false);
const navbarBackground = ref<string>('navbar-transparent');

function handleScrollArticles() {
  navbarBackground.value = window.scrollY > 10 ? 'navbar-background' : 'navbar-transparent';
  showToTop.value = window.scrollY > 10;
  scrollPosition.value = window.scrollY;
  dropdown.value = false;
}

function handleScrollArticlesSaved() {
  showToTop.value = window.scrollY > 10;
  scrollPosition.value = window.scrollY;
  dropdown.value = false;
}

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const toggleTheme = (): void => {
  document.documentElement.classList.toggle('dark');
  darkMode.value = !darkMode.value;
};

const handleDropdown = (): void => {
  dropdown.value = !dropdown.value;
};

window.addEventListener('scroll', () => {
  if (window.location.pathname === '/articles') {
    handleScrollArticles();
  } else if (window.location.pathname === '/articles/saved') {
    handleScrollArticlesSaved();
  }
});

onMounted(() => {
  if (window.location.pathname === '/articles/saved') {
    navbarBackground.value = 'navbar-background';
  }
});
</script>

<!-- article saved in local -->