import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import { RouterMount } from 'uni-simple-router'
import mpWeb from './request/index.js'


Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(Element)
Vue.prototype.$mpWeb = mpWeb

const app = new Vue({
	router,
	...App
})
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
