<template>
	<div>
		<div>子</div>
		<div>{{pname}}</div><br />
		<button @click="parentFun()">父方法</button><br />
		<button @click="getParent">获取整个父子组件</button>
		<button @click="getAll()">主动获取不需要传值</button>
	</div>
</template>

<script>
	/**
	 * 获取父组件的数据 方法 整个父组件
	 * 一 : 传值方式
	 * 	父组件设置要传的:
	 * 		<v-children :pname='pname' :parentFun='parentFun' :that='this'></v-children>
	 * 	子组件获取:
	 * 		props:['pname', 'parentFun', 'that']
	 * 
	 * 二 : 主动获取
	 * 	this.$parent.数据/方法
	 * 
	 * 
	 */
	
	export default {
		data() {
			return {
				chidren : 'chidren01'
			}
		},
		props:['pname', 'parentFun', 'that'],
		methods: {
			getParent() {
				console.log(this.that);
			},
			chidrenFun() {
				alert("chidren01");
			},
			getAll() {
				console.log(this.$parent.pname);
				this.$parent.parentFun();
			}
		}
	}
</script>

<style>
</style>