import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../views/Home.vue";
import Todos from "../views/Todos.vue";
import Post from "../views/Posts.vue";
import Album from '../views/Album.vue';
import AlbumDetail from '../views/AlbumDetail.vue';

const routes = [
  {
    path: "/",
    name: "mainLayout",
    component: MainLayout,
    children: [
      {
        path: "/",
        component: Home,
        meta: { title: 'Home' } // Optional meta information
      },
      {
        path: "/todolist",
        component: Todos,
        meta: { title: 'Todo List' } // Optional meta information
      },
      {
        path: "/post",
        component: Post,
        meta: { title: 'Posts' } // Optional meta information
      },
      {
        path: '/album',
        component: Album,
        meta: { title: 'Album' } // Optional meta information
      },
      {
        path: '/photo/:photoId',
        component: AlbumDetail,
        meta: { title: 'Album Detail' } // Optional meta information
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
