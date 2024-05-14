<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const showingTodos = ref(true);
const selectedUser = ref(null);
const isLoading = ref(false); 
const users = ref([]);
const posts = ref([]);

let id = 0
const todos = ref([])
const name = ref('')

const input_content = ref('')
const input_category = ref(null)

const todos_asc = computed(() => [...todos.value].sort((a, b) => a.createdAt - b.createdAt))

const hideCompleted = ref(false)

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos_asc.value.filter((t) => !t.done)
    : todos_asc.value
})
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


watch(selectedUser, () => {
  posts.value = []; 
  fetchPosts();
}, { immediate: true }); 
watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  {
    deep: true,
  }
)

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return
  }

  todos.value.push({
    id: id++,
    content: input_content.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  })

  input_content.value = ''
  input_category.value = null
}

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t.id !== todo.id)
}

onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  const savedTodos = JSON.parse(localStorage.getItem('todos'))
  if (savedTodos) {
    todos.value = savedTodos
  }
})

const showTodos = () => {
  showingTodos.value = true;
};

const showPosts = () => {
  showingTodos.value = false;
  fetchUser();
};
</script>

<template>
  <header class="header">
        <nav class="navbar">
            <span @click="showTodos">Todos</span>
            <span @click="showPosts">Posts</span>
        </nav>
      </header>
  <div class="cont">
    <main v-if="showingTodos" id="todos" class="app">
      <section class="greeting">
        <br>
        <h2 class="title">Ramadhan Kareem</h2>
      </section>

      <section class="create-todo">
        <form id="new-todo-form" @submit.prevent="addTodo">
          <h4>kumpulkan pahala sebanyak-banyaknya</h4>
          <input
            type="text"
            name="content"
            id="content"
            placeholder="tadarus qur'an..."
            v-model="input_content"
          />

          <h4>pilih jadwal</h4>
          <div class="options">
            <label>
              <input
                type="radio"
                name="category"
                value="malam"
                v-model="input_category"
              />
              <span class="bubble malam"></span>
              malam
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="siang"
                v-model="input_category"
              />
              <span class="bubble siang"></span>
              siang
            </label>
          </div>

          <input type="submit" value="tambah kegiatan" />
        </form>
      </section>

      <section class="todo-list">
        <h4>daftar kegiatan</h4>
        <div class="list" id="todo-list">
          <div
            v-for="todo in filteredTodos"
            :key="todo.id"
            :class="['todo-item', { done: todo.done }]"
          >
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
          </div>
        </div>
      </section>

      <div class="actions">
        <button class="showhide" @click="hideCompleted = !hideCompleted">
          {{ hideCompleted ? 'show all' : 'hide completed' }}
        </button>
      </div>
      <br>
    </main>
    <main v-else id="posts" class="app">
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
    </main>
  </div>
</template>

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

/* Header styles */
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
h1{
  text-align: center;
}

</style>