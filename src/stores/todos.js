import { defineStore } from 'pinia';

let id = 0;

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    input_content: '',
    hideCompleted: false,
  }),
  actions: {
    addTodo() {
      if (this.input_content.trim() === '') return;

      this.todos.push({
        id: id++,
        content: this.input_content,
        done: false,
        createdAt: new Date().getTime(),
      });

      this.input_content = '';
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    },
    loadTodos() {
      const savedTodos = JSON.parse(localStorage.getItem('todos'));
      if (savedTodos) {
        this.todos = savedTodos;
      }
    },
  },
  getters: {
    todosAsc: (state) => [...state.todos].sort((a, b) => a.createdAt - b.createdAt),
    filteredTodos: (state) => {
      return state.hideCompleted
        ? state.todosAsc.filter((t) => !t.done)
        : state.todosAsc;
    },
  },
});
