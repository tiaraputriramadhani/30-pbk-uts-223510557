<template>
    <div id="posts" class="app">
      <h1>Postingan Pengguna</h1>
      <select v-model="selectedUser" @change="fetchPosts">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <div v-if="isLoading">
        <span class="loading-message">Loading posts...</span>
      </div>
      <div v-for="post in posts" :key="post.id">
        <h3><b>{{ post.title }}</b></h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  
  const selectedUser = ref(null);
  const isLoading = ref(false);
  const users = ref([]);
  const posts = ref([]);
  
  const fetchUser = async () => {
    try {
      isLoading.value = true;
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      console.log('User yang di fetch:', data);
      users.value = data;
    } catch (error) {
      console.error('Error Fetch User:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const fetchPosts = async () => {
    if (!selectedUser.value) return;
    isLoading.value = true;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
      const data = await response.json();
      console.log('Post yang di fetch:', data);
      posts.value = data;
    } catch (error) {
      console.error('Error Fetch Post:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    fetchUser();
  });
  
  watch(selectedUser, () => {
    posts.value = [];
    fetchPosts();
  }, { immediate: true });
  </script>
  
  <style scoped>
  /* Styles for Posts.vue */
  </style>
  