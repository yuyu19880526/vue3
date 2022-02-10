import 'ant-design-vue/dist/antd.css'
import '@ant-design-vue/pro-layout/dist/style.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './icons';

import Antd from 'ant-design-vue'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'


const app = createApp(App)

app.use(Antd)
app.use(ProLayout)
app.use(PageContainer)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')
