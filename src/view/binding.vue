<template>
	<div>
		<h3>绑定单一数据</h3>
		<div>{{msg}}</div>
		<div v-text="msg"></div>

		<h3>绑定对象数据</h3>
		<div>
			name : {{obj.name}}<br /> age : {{obj.age}}
		</div>

		<h3>绑定属性(:熟悉是v-bind:属性的简写)</h3>
		<img :src="logo" v-bind:title="msg" />

		<h3>绑定html</h3>
		<div v-html="htmll"></div>

		<h3>绑定class</h3>
		<div :class="{'red':false, 'greenyellow':true}">绑定class</div>

		<h3>绑定style</h3>
		<div :style="{'border': dashed}">边框</div>

		<h3>双向数据绑定(MVVM)</h3>
		<div>{{bothway}}</div>
		<input type="text" v-model="bothway" /><br />
		<h4>事件(@事件是v-on:事件的简写)</h4>
		<button @click="setBothway">改变</button>
		<button v-on:click="getBothway">获取</button>

		<h3>获取dom</h3>
		<div ref=dom>一个dom</div><br />
		<button @click="getDom">获取dom</button>

		<h3>获取事件对象</h3>
		<button custom="自定义属性" @click="getEvent($event)">获取事件对象</button>

		<h3>循环数组数据</h3>
		<div v-for="(value, index) in list">
			<div>{{index}} : {{value}}</div>
		</div>

		<h3>动态添加数据</h3>
		<button @click="addListData()">添加数据</button>
		<div v-for="(value, index) in list1">
			<div>{{index}} : {{value}}</div>
		</div>

	</div>

	</div>

</template>

<script>
	export default {
		//业务逻辑里面定义的数据
		data() {
			return {
				msg: '数据',
				list: ['1', '2', '3'],
				obj: {
					name: 'name',
					age: 23
				},
				logo: '//fanyi.bdstatic.com/static/translation/img/header/logo_cbfea26.png',
				htmll: '<a href="#">点击<a/>',
				dashed: 'dashed',
				bothway: '双向数据',
				list1: []
			}
		},
		//放方法的地方
		methods: {
			setBothway() {
				this.bothway = '改变';
			},
			getBothway() {
				alert(this.bothway);
			},
			getDom() {
				console.log(this.$refs.dom);
			},
			getEvent(e) {
				console.log(e.srcElement.attributes.custom.value);
				e.srcElement.attributes.custom.value = "定义"
				console.log(e.srcElement.attributes.custom.value)
			},
			addListData() {
				for(var i = 0; i < 10; i++) {
					this.list1.push(i);
				}
			}
		},
		//生命周期函数/生命周期钩子  
		beforeCreate() {
			console.log('实例刚刚被创建1');
		},
		created() {
			console.log('实例已经创建完成2');
		},
		beforeMount() {
			console.log('模板编译之前3');
		},
		mounted() { /*请求数据，操作dom , 放在这个里面  mounted*/
			console.log('模板编译完成4');
		},
		beforeUpdate() {
			console.log('数据更新之前');
		},
		updated() {
			console.log('数据更新完毕');
		},
		beforeDestroy() { /*页面销毁的时候要保存一些数据，就可以监听这个销毁的生命周期函数*/
			console.log('实例销毁之前');
		},
		destroyed() {
			console.log('实例销毁完成');
		}
		//生命周期函数/生命周期钩子  end 

	}
</script>

<style lang="scss">
	.red {
		color: red;
	}
	
	.greenyellow {
		color: greenyellow;
	}
</style>