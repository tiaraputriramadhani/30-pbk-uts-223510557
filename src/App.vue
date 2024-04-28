<script setup>
import { ref, onMounted, computed, watch } from 'vue'

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
</script>

<template>
  <div class="cont">
    <main class="app">
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
  </div>
</template>