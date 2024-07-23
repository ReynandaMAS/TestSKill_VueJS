import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  { path: '/', redirect: '/articles' },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../pages/Articles.vue'),
  },
  {
    path: '/articles/saved',
    name: 'Saved',
    component: () => import('../pages/SavedArticles.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
// ryn code