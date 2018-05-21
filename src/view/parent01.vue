<template>
	<div>
		<div>父01</div>
		<button @click="getAll()">主动获取不需要传值</button>
		<button @click="send()">发消息到01</button>
		<hr />
		<v-children ref='ch' :pname='pname' :parentFun='parentFun' :that='this'></v-children>
	</div>
</template>

<script>
	
	/**
	 * 父组件主动获取子组件的数据/方法
	 * 1.子组件上加
	 * 	ref='xx'
	 * 2.获取
	 * 	this.$refs.xx.数据/方法
	 */
	
	
	import children from './children01.vue';
	
	import VueEvent from '../modules/VueEvent.js';
	
	export default {
		data() {
			return {
				pname: 'parent01',
				msg : 'this 01'
			}
			
		},
		methods: {
			parentFun() {
				alert('parent01');
			},
			getAll() {
				console.log(this.$refs.ch.chidren);
				this.$refs.ch.chidrenFun();
			},
			send() {
				VueEvent.$emit('to-02',this.msg);
			}
		},
		components: {
			'v-children' : children
		},
		mounted() {
			VueEvent.$on('to-01',function(data){
                console.log(data);
           });
		}
		
	}
</script>

<style>
</style>