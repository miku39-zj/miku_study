import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mIcon from '@miku-ui/components/icon'
import FormItem from '@miku-ui/components/form'
import type { Plugin } from "vue";

const plugins = [
  mIcon,
  FormItem
]
const app = createApp(App)
plugins.forEach(plugin => app.use(plugin as Plugin))

app.mount('#app')
