import { createApp } from 'vue'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App'
import router from './router/router'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'

const app = createApp(App)
app.use(router)
app.mount('#app')
