import 'vuetify/styles'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import { vuetifyProTipTap } from './tiptap'

const vuetify = createVuetify()

const app = createApp(App)
app.use(vuetify)
app.use(vuetifyProTipTap)

app.mount('#app')
