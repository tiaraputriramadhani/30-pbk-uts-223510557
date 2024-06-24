import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state: () => ({
    users: [],
    posts: [],
    selectedUser: null,
    isLoading: false,
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error Fetching Users:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPosts() {
      if (!this.selectedUser) return;
      this.isLoading = true;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error('Error Fetching Posts:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    filteredPosts: (state) => state.posts,
  },
});
