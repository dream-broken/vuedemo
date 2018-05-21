<template>
	<div>
		<div>
			<button @click="goto()">路由跳转ax</button>
		</div>
		<div>
			<span>我是vuex内的值 : {{this.$store.state.count}}</span>
			<button @click="add()">加二</button>
			<span>我是localstorage内的值 : {{count}}</span>
		</div>
		<div v-for="(value, index) in list">
			<div>{{index}} : {{value}} </div>
		</div>
	</div>
</template>

<script>
	/**
	 * 引入vue-resource 也是是ajax 是官方的组件(github官网:https://github.com/pagekit/vue-resource)
	 * 
	 * 1.需要安装vue-resource模块，  注意加上  --save 
	 * npm install vue-resource --save /  cnpm install vue-resource --save
	 * 
	 * 2.在main.js内引入并使用
	 * import VueResource from 'vue-resource';
	 * main.js  Vue.use(VueResource);
	 * 
	 * 3.在使用页面
	 * this.$http.get/post(路径).then(response => {}, err => {})
	 */
	
	import storage from '../modules/storage.js';
	
	export default {
		data() {
			return {
				list:[],
				count:0
			}
		},
		methods: {
			goto() {
				//路由跳转方法一
				this.$router.push({ path: '/ax?id=3' });
				//路由跳转方法二 要在router.js配置name属性
				//this.$router.push({ name: 'ax', params: { id: 4 }})
			},
			add() {
				this.$store.commit('add', 2);
				storage.set('count', this.$store.state.count);
				this.count = storage.get('count');
			}
		},
		mounted() {
			var api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
			this.$http.get(api).then(response  => {
				this.list=response.body.result;
			}, err => {
				console.log(err)
			});
			//路由 路径传参
			console.log(this.$route.params);
			this.count = storage.get('count');
		}
	}
</script>

<style>
</style>