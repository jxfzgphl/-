import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
const pathResolve=dir=> resolve(__dirname,dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
	  port:8080,//默认启动时的端口号
	  open:true,//自动打开默认浏览器
	  cors:true,//允许跨域
  },
  resolve:{
	  alias:{
		  '@':pathResolve('./src')//设置@指向./src
	  }
  }
})
