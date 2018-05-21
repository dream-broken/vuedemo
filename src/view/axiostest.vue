<template>
	<div>
		<div>
			<button @click="goto()">路由跳转re</button>
			<button @click="gotoc('1')">子路由1</button>
			<button @click="gotoc('2')">子路由2</button>
		</div>
		<div>
			<span>我是vuex内的值 : {{this.$store.state.count}}</span>
			<button @click="add()">加一</button>
		</div>
		<div v-for="(value, index) in list">
			<div>{{index}} : {{value}} </div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	/**
	 * 引入axios 也是是ajax 是第三方的组件(github官网:https://github.com/axios/axios)
	 * 
	 * 1.安装  cnpm  install  axios --save
	 * 
	 * 2.那个页面要使用就在那个页面引入
	 * import Axios from 'axios
	 * 
	 * 3.在使用页面
	 * Axios.get/post(路径).then(response => {}, err => {})
	 */
	import Axios from 'axios';
	
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			goto() {
				//路由跳转方法一
				//this.$router.push({ path: '/re/5/pwd' });
				//路由跳转方法二 要在router.js配置name属性
				this.$router.push({ name: 're', params: { id: 6, name: 'pwd' }});
			},
			gotoc(page) {
				page == 1 ? this.$router.push({ path: '/pr' }) : this.$router.push({ path: '/bi' });
			},
			add() {
				this.$store.commit('add', 1);
			}
		},
		mounted() {
			var api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
			Axios.get(api).then(response  => {
				this.list=response.data.result;
			}, err => {
				console.log(err)
			});
			//路由 get传参
			console.log(this.$route.query);
		}
	}
</script>

<style>
</style>