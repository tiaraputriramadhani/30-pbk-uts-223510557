<!-- App.vue -->

<template>
  <header class="header">
    <nav class="navbar">
      <span @click="showTodos">Todos</span>
      <span @click="showPosts">Posts</span>
    </nav>
  </header>
  <div class="cont">
    <Todos v-if="showingTodos" :initialTodos="todos" @update:todos="todos = $event">
      <template #todo-item="{ todo }">
        <label>
          <input type="checkbox" v-model="todo.done" />
          <span :class="['bubble', todo.category === 'malam' ? 'malam' : 'siang']"></span>
        </label>
        <div class="todo-content">
          <input type="text" v-model="todo.content" />
        </div>
        <div class="actions">
          <button class="delete" @click="removeTodo(todo)">delete</button>
        </div>
      </template>
    </Todos>
    <Posts v-else :initialUsers="users" :initialPosts="posts" @update:posts="posts = $event">
      <template #post-item="{ post }">
        <h3><b>{{ post.title }}</b></h3>
        <p>{{ post.body }}</p>
      </template>
    </Posts>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

const showingTodos = ref(true);
const users = ref([]);
const posts = ref([]);
const todos = ref([]);

const showTodos = () => {
  showingTodos.value = true;
};

const showPosts = () => {
  showingTodos.value = false;
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.navbar span {
  font-size: 1.5rem;
  color: white;
  margin: 0 3rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 0%;
  z-index: 1000;
  background: linear-gradient(90deg, hsla(197, 30%, 54%, 1) 7%, hsla(275, 19%, 88%, 1) 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  text-align: center;
}

</style>
