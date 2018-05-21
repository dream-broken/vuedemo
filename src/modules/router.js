//安装路由插件
//npm install vue-router / cnpm install vue-router 

//引入vue
import Vue from 'vue';

//引入vue-router
import VueRouter from 'vue-router';

//使用VueRouter
Vue.use(VueRouter);

//创建组件
import re from '../view/vue_resource.vue';
import ax from '../view/axiostest.vue';
import pr from '../view/parent02.vue';
import bi from '../view/binding.vue';

//配置路由
const routes = 
	[{
		path: '/re/:id/:name',
		component : re,
		name: 're'
	}, {
		path: '/ax',
		component : ax,
		children:
			[{
				path: '/pr',
				component : pr
			},
			{
				path: '/bi',
				component : bi
			}]
	}, {
		//默认跳转路由
		path: '*',
		redirect : '/re/0/name'
	}];
	
//实例化
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});

//向外暴露
export default router;

//在main.js引入
//import router from './modules/router.js';

//在vue实例化时挂载 router,
/*
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
 */

//在App.vue内
//<router-view></router-view>

//路由跳转
//<router-link to="/re">re</router-link>
