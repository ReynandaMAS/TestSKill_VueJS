import axios from 'axios';
import { defineStore } from 'pinia';
import type { ArticleTypes } from '../types/articles.d';
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: <ArticleTypes[]>[],
    savedArticles: <ArticleTypes[]>[],
    loading: false,
  }),
  actions: {
    async getArticles(search: string): Promise<{ data: ArticleTypes[]; status: string }> {
      try {
        this.loading = true;
        const response = await axios.get(`${API_URL}/everything?q=${search}&apiKey=${API_KEY}`);
        const addNewProperty = response.data.articles.map((a: ArticleTypes) => {
          return { ...a, saved: false, bookMarkStatus: '' };
        });
        this.articles = addNewProperty;
        return {
          data: addNewProperty,
          status: 'success',
        };
      } catch (error) {
        return {
          data: [],
          status: 'error',
        };
      } finally {
        this.loading = false;
      }
    },

    handleSavedArticles(title: string, status?: string) {
      this.articles = this.articles.map((a) => {
        if (a.title === title) {
          if (status !== '' || status !== undefined) {
            const saved = !a.saved;
            const bookMarkStatus = status;
            return { ...a, saved, bookMarkStatus };
          }
        }
        return a;
      });
      this.savedArticles = this.articles.filter((a) => a.saved);
    },

    handleBookmarkStatus(title: string, status?: string) {
      this.articles = this.articles.map((a) => {
        if (a.title === title) {
          if (status !== '' || status !== undefined) {
            const bookMarkStatus = status;
            return { ...a, bookMarkStatus };
          }
        }
        return a;
      });
    },
  },
});
// ryncode