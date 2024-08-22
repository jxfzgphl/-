import {
	//创建路由的api
	createRouter,
	//创建路由的历史模式
	createWebHashHistory,
} from 'vue-router'

const routes = [
	{
		path:'/',
		redirect:'menu'
	},
	{
		name:'login',
		path:'/login',
		component:()=>import('@/views/login/index.vue')
	},
	{
		name:'menu',
		path:'/menu',
		component:()=>import('@/views/menu/index.vue'),
		children:[
			{
				name:'home',
				path:'/home',
				component:()=>import('@/views/home/index.vue')
			},
		]
	},
]

const router = createRouter({
	history:createWebHashHistory(),
	routes
})

export default router