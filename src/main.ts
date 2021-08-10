import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

// element-plus 全局注册
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
// app.use(ElementPlus)

const app = createApp(App)
app.use(globalRegister)
app.use(store)
// 这里要先存路由 再使用
setupStore()
app.use(router)

app.mount('#app')
