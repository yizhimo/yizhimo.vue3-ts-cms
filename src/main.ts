import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'

import router from './router'
import store from './store'

// element-plus 全局注册
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
// app.use(ElementPlus)

const app = createApp(App)
app.use(globalRegister)
app.use(router)
app.use(store)

app.mount('#app')
