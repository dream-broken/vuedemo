<template>
	<div>
		<hr />
		<div>父02</div>
		<button @click="send()">发消息到01</button>
		
	</div>
</template>

<script>
	/**
	 * 同级相互传
	 * 
	 * 新实例化一个Vue
	 * 	看:VueEvent.js
	 * 
	 * 发送消息
	 * 	VueEvent.$emit('接收名',数据);
	 * 
	 * 获取消息
	 * 	VueEvent.$on('发送名',数据 => {})
	 */
	
	
	import VueEvent from '../modules/VueEvent.js';
	
	export default {
		data() {
			return {
				msg : 'this 02'
			}
		},
		methods: {
			send() {
				VueEvent.$emit('to-01',this.msg);
			}
		},
		mounted() {
			VueEvent.$on('to-02',data => {
                console.log(data);
           });
		}
	}
</script>

<style>
</style>