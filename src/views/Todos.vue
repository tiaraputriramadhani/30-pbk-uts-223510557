<template>
  <div id="todos" class="app">
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
        /><br>
        <br>
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
            <span class="bubble"></span>
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
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useTodoStore } from '../stores/todos';

let id = 0
const todos = ref([])
const todoStore = useTodoStore();
const input_content = ref('')
const hideCompleted = ref(false)

const todos_asc = computed(() => [...todos.value].sort((a, b) => a.createdAt - b.createdAt))

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos_asc.value.filter((t) => !t.done)
    : todos_asc.value
})

const addTodo = () => {
  if (input_content.value.trim() === '') {
    return
  }

  todos.value.push({
    id: id++,
    content: input_content.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  })

  input_content.value = ''
}

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t.id !== todo.id)
}

onMounted(() => {
  const savedTodos = JSON.parse(localStorage.getItem('todos'))
  if (savedTodos) {
    todos.value = savedTodos
  }
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
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 550px;
  margin: 0 auto;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px;
}

.greeting .title {
  color: #16a085;
  text-align: center;
  font-size: 20px;
}

.create-todo {
  margin-bottom: 20px;
}

.create-todo h4, .todo-list h4 {
  color: #2980b9;
  text-align: center;
  font-size: 16px;
}

#create-todo-form input[type="text"] {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  width: 100%;
}

input[type="submit"] {
  background-color: #496f98;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

input[type="submit"]:hover {
  background-color: #1e3f56;
}

.todo-list .list {
  border-top: 1px solid #bdc3c7;
  padding-top: 10px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ecf0f1;
}

.todo-item.done {
  text-decoration: line-through;
  color: #7f8c8d;
}

.todo-content input[type="text"] {
  border: none;
  background: none;
  width: 100%;
}

.actions .delete {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.actions .delete:hover {
  background-color: #c0392b;
}

.actions .showhide {
  background-color: #485481;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.actions .showhide:hover {
  background-color: #769984;
}
</style>