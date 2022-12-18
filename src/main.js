import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import vSelect from 'vue-select'

import './assets/main.css'
import './css/styles.scss'
import 'vue-select/dist/vue-select.css';

import { useAuthStore } from './store/auth'
// import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import router from './router'
const pinia = createPinia()

router.beforeEach((to) => {
    const store = useAuthStore();

    if(!store.getUserName && to.name !== 'Login') {
        return {
            name: "Login"
        }

    }
})

const app = createApp(App)
app.use(bootstrap)
app.use(pinia)
app.use(router)
app.component("v-select", vSelect)

app.mount('#app')
