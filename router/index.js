import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)

const router = new Router({
	h5: {
		vueRouterDev: true, //完全使用vue-router开发 默认 false  
	},
	routes: [{
			path: '/',
			redirect:'/home'
		}, {
			path: '/home',
			name: 'home',
			component: () => import('@/pages/home'),
			meta: {
				title: '首页',
			},
			children: [{
					path: 'record',
					name: 'record',
					component: () => import('@/pages/home/record')
				},
				{
					path: 'assignProjectManager',
					name: 'assignProjectManager',
					component: () => import('@/pages/home/assignProjectManager')
				},
				{
					path: 'examine',
					name: 'examine',
					component: () => import('@/pages/home/examine')
				},
				{
					path: '/',
					name: 'settlement',
					component: () => import('@/pages/home/settlement')
				},
			]
		},
		{
			path: '/login',
			component: () => import('@/pages/login'),
			name: 'login',
			meta: {
				title: '登录',
			},
		},
		{
			path: '/register',
			component: () => import('@/pages/register'),
			name: 'register',
			meta: {
				title: '注册',
			},
		},
	]
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (uni.getStorageSync('uniIdToken') || to.name === 'login' || to.name === 'register') {
		// console.log(uni.getStorageSync('uid'))
		next()
	} else {
		next('/login')
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;
