import 'ant-design-vue/dist/antd.css'
import '@ant-design-vue/pro-layout/dist/style.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'


const app = createApp(App)

app.use(Antd).use(ProLayout).use(PageContainer).use(store).use(router).mount('#app')
