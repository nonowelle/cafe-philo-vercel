import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3SmoothScroll from 'vue3-smooth-scroll'
import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faAngleDown)

const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(Vue3SmoothScroll);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
