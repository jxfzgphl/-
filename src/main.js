import { createApp } from 'vue'
import App from './App.vue'
//导入路由
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app=createApp(App)

app.use(router)
.use(ElementPlus, {
  locale: zhCn,
})
.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}