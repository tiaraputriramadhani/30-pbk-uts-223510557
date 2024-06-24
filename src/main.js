import { createApp } from 'vue'
// import './style.css'
import { createPinia } from 'pinia';
import App from './App.vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import 'quasar/dist/quasar.css'
import router from "./router";


const MyApp = createApp(App)
const pinia = createPinia();
MyApp.use(pinia);
MyApp.use(router);
MyApp.use(Quasar, {
    plugins: {}, 
  })
MyApp.mount('#app')
