<template>
  <div id="posts" class="app">
    <h4>Postingan Pengguna</h4>
    <select v-model="selectedUser" @change="fetchPosts">
      <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
    </select>
    <div v-if="isLoading">
      <span class="loading-message">Loading posts...</span>
    </div>
    <div v-for="post in posts" :key="post.id" class="post">
      <h3><b>{{ post.title }}</b></h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch } from 'vue';
import { usePostStore } from '../stores/posts';
  
const postStore = usePostStore();
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
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 50px auto; 
  background-color: #f4f4f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px; 
}

h4 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

select {
  display: block;
  margin: 0 auto 20px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-message {
  display: block;
  text-align: center;
  color: #555;
  font-size: 14px; 
  margin: 20px 0;
}

.post {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 16px; 
}

.post p {
  color: #555;
  line-height: 1.6;
  font-size: 14px; 
}
</style>